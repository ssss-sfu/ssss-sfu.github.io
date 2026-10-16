// script to convert JPG/PNG images to WebP
// writes <name>.webp next to the original, deletes the original,
// and updates references to the old path in the source files
//
// usage: node scripts/convert-to-webp.mjs <file> [...]
import { readdir, readFile, unlink, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";
import sharp from "sharp";

const CONVERTIBLE = new Set([".png", ".jpg", ".jpeg"]);
// where image paths get referenced
const SOURCE_DIRS = [
  "pages",
  "components",
  "lib",
  "utils",
  "styles",
  "public/jsons",
];
const SOURCE_EXTS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".json",
  ".md",
  ".scss",
  ".css",
]);

async function* walk(dir) {
  // recursively walk the directory tree
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(path);
    } else {
      yield path;
    }
  }
}

async function convert(path) {
  const ext = extname(path);
  const out = path.slice(0, -ext.length) + ".webp";
  if (existsSync(out)) {
    throw new Error(`${out} already exists`);
  }
  // Exec headshots render in a 288px wide card, everything else is 1600px wide max
  const isHeadshot = path.includes("execs-");
  await sharp(path)
    .rotate()
    .resize({ width: isHeadshot ? 1000 : 1600, withoutEnlargement: true })
    .webp({ quality: isHeadshot ? 88 : 80 })
    .toFile(out);
  await unlink(path);
  return out;
}

// "public/images/a.jpg" -> "/images/a.jpg", the path the site uses
const publicUrl = (path) => "/" + relative("public", path).split(sep).join("/");

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("usage: node scripts/convert-to-webp.mjs <file> [...]");
  process.exit(1);
}

const renames = [];
for (const path of files) {
  if (!CONVERTIBLE.has(extname(path).toLowerCase())) {
    console.log(`skipping ${path}: not a JPG or PNG`);
    continue;
  }
  const out = await convert(path);
  renames.push([publicUrl(path), publicUrl(out)]);
  console.log(`${path} -> ${out}`);
}

// update references to the old paths
for (const dir of SOURCE_DIRS) {
  if (!existsSync(dir)) {
    continue;
  }
  for await (const file of walk(dir)) {
    if (!SOURCE_EXTS.has(extname(file))) {
      continue;
    }
    const text = await readFile(file, "utf8");
    let updated = text;
    for (const [from, to] of renames) {
      updated = updated.replaceAll(from, to);
    }
    if (updated !== text) {
      await writeFile(file, updated);
      console.log(`  updated references in ${file}`);
    }
  }
}
