// script to optimize images in the public/images directory
// shrinks oversized images in place
//
// usage:
//   node scripts/optimize-images.mjs                 scan all of public/ (only files over 250KB)
//   node scripts/optimize-images.mjs <file> [...]    optimize specific files (any size)
//   node scripts/optimize-images.mjs --staged        optimize staged images and re-stage them (pre-commit hook)
import { execFileSync } from "node:child_process";
import { readdir, stat, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const MIN_BYTES = 250 * 1024; // 250KB
const RASTER = new Set([".png", ".jpg", ".jpeg", ".webp"]);

async function* walk(dir) {
  // recursively walk the directory tree
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(path); // recursively walk subdirectories
    } else {
      yield path; // yield the path of the image file
    }
  }
}

// images added or modified in the current commit
function stagedImages() {
  const out = execFileSync(
    "git",
    [
      "diff",
      "--cached",
      "--name-only",
      "-z",
      "--diff-filter=AM",
      "--",
      "public/",
    ],
    { encoding: "utf8" }
  );
  return out.split("\0").filter(Boolean);
}

async function optimize(path, { fullScan }) {
  const before = (await stat(path)).size;
  // Exec headshots render in a 288px wide card, everything else is 1600px wide max
  const isHeadshot = path.includes("execs-");
  const maxWidth = isHeadshot ? 1000 : 1600;
  if (before < MIN_BYTES) {
    if (fullScan) {
      return null;
    }
    // small files are only touched if they're too wide or carry EXIF/GPS metadata,
    // so an already-optimized image isn't compressed a second time
    const { width, exif } = await sharp(path).metadata();
    if (width <= maxWidth && !exif) {
      return null;
    }
  }
  const quality = isHeadshot ? 88 : 80;
  const ext = extname(path).toLowerCase();
  // sharp drops EXIF/GPS metadata on re-encode, rotate() bakes in the orientation first
  const pipeline = sharp(path)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true });

  if (ext === ".png") {
    // palette compression preserves transparency and reduces file size
    pipeline.png({ compressionLevel: 9, palette: true, quality });
  } else if (ext === ".webp") {
    pipeline.webp({ quality });
  } else {
    pipeline.jpeg({ quality: isHeadshot ? quality : 82, mozjpeg: true });
  }

  // buffer first to avoid writing partial files
  const buffer = await pipeline.toBuffer();
  if (buffer.length >= before) {
    return null; // never make it bigger than the original
  }
  await writeFile(path, buffer);
  return { path, before, after: buffer.length };
}

// helper function to convert bytes to megabytes
const mb = (n) => (n / 1024 / 1024).toFixed(2);

const args = process.argv.slice(2);
const staged = args.includes("--staged");
let paths;
// full scan only touches large files so already-optimized images aren't re-compressed
const fullScan = !staged && args.length === 0;
if (staged) {
  paths = stagedImages();
} else if (args.length > 0) {
  paths = args;
} else {
  paths = walk("public");
}

let saved = 0;
const changed = [];
for await (const path of paths) {
  if (!RASTER.has(extname(path).toLowerCase())) {
    continue;
  }
  const result = await optimize(path, { fullScan });
  if (!result) {
    continue;
  }
  saved += result.before - result.after;
  changed.push(path);
  console.log(
    `${result.path}: ${mb(result.before)}MB -> ${mb(result.after)}MB`
  );
  if (isJpegOrPng(path)) {
    console.log(
      `  tip: convert to WebP with: node scripts/convert-to-webp.mjs ${path}`
    );
  }
}

if (staged && changed.length > 0) {
  // put the optimized versions into the commit
  execFileSync("git", ["add", "--", ...changed]);
}
if (!staged || changed.length > 0) {
  console.log(`\nSaved ${mb(saved)}MB`);
}

function isJpegOrPng(path) {
  return [".png", ".jpg", ".jpeg"].includes(extname(path).toLowerCase());
}
