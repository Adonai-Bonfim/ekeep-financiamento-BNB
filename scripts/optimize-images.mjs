import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const destination = new URL("../src/assets/responsive/", import.meta.url);
await mkdir(destination, { recursive: true });
for (const name of ["hero-warehouse", "office-assets", "stock-operator", "worried-executive"]) {
  const source = new URL(`../src/assets/${name}.jpg`, import.meta.url);
  const widths = name === "hero-warehouse" ? [480, 960, 1920] : [320, 640, 1024];
  for (const width of widths) {
    await sharp(fileURLToPath(source))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(fileURLToPath(new URL(`${name}-${width}.webp`, destination)));
  }
}
for (const width of [480, 941]) {
  await sharp(fileURLToPath(new URL("../src/assets/hero-mobile.jpg", import.meta.url)))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(fileURLToPath(new URL(`hero-mobile-${width}.webp`, destination)));
}
console.log("Generated 14 responsive WebP assets.");
