// Regenerates the app icon, Apple touch icon and favicon.ico from the vector
// logo mark. Re-run after the mark changes:
//   npm run generate:brand-assets
//
// Provenance: public/brand/logo-mark.svg was redrawn by hand from the original
// public/brand/logo_digisoft.png (256x232) because Recraft was unavailable.
// Rendered over the brand background it matches the original on 99.5% of pixels.
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(root, "src", "app");
const brandColor = "#00ADB5";
const mark = await readFile(path.join(root, "public", "brand", "logo-mark.svg"), "utf8");
// Favicon sizes get a thicker, larger mark so the strokes stay legible at 16px.
const faviconMark = mark.replace('stroke-width="10"', 'stroke-width="16"');

async function renderIcon(size) {
  const small = size <= 48;
  const markPng = await sharp(Buffer.from(small ? faviconMark : mark), { density: 1200 })
    .resize(Math.round(size * (small ? 0.8 : 0.7)))
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: brandColor } })
    .composite([{ input: markPng, gravity: "center" }])
    .png()
    .toBuffer();
}

await writeFile(path.join(appDir, "icon.png"), await renderIcon(512));
await writeFile(path.join(appDir, "apple-icon.png"), await renderIcon(180));
await writeFile(path.join(appDir, "favicon.ico"), await pngToIco(await Promise.all([16, 32, 48].map(renderIcon))));

console.log("Brand assets generated: src/app/icon.png, src/app/apple-icon.png, src/app/favicon.ico");
