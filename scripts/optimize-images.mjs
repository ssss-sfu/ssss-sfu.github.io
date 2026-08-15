// script to optimize images in the public/images directory
// shrinks oversized images in place
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

async function optimize(path) {
  const before = (await stat(path)).size;
  if (before < MIN_BYTES) {
    return null;
  }
  // Exec headshots render in a 288px wide card, everything else is 1600px wide max
  const isHeadshot = path.includes("execs-");
  const maxWidth = isHeadshot ? 1000 : 1600;
  const quality = isHeadshot ? 88 : 80;
  const ext = extname(path).toLowerCase();
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
    return null; // never make it biger than the original
  }
  await writeFile(path, buffer);
  return { path, before, after: buffer.length };
}

// helper function to convert bytes to megabytes
const mb = (n) => (n / 1024 / 1024).toFixed(2);
let saved = 0;

for await (const path of walk("public")) {
  if (!RASTER.has(extname(path).toLowerCase())) {
    continue;
  }
  const result = await optimize(path);
  if (!result) {
    continue;
  }
  saved += result.before - result.after;
  console.log(
    `${result.path}: ${mb(result.before)}MB -> ${mb(result.after)}MB`
  );
}
console.log(`\nSaved ${mb(saved)}MB`);
