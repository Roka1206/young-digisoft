// Regenerates public/logo.png, the app icon and favicon.ico from the master
// source logo. Re-run after the source file changes:
//   node scripts/generate-brand-assets.mjs
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SOURCE = path.join(root, "assets", "brand", "young-digisoft-logo-source.png");

// Bounding boxes measured against the source file (368x239px).
const LOGO_CROP = { left: 49, top: 74, width: 270, height: 84 };
const MARK_CROP = { left: 243, top: 86, width: 65, height: 60 };

async function main() {
  const publicDir = path.join(root, "public");
  const appDir = path.join(root, "src", "app");

  await sharp(SOURCE)
    .extract(LOGO_CROP)
    .png()
    .toFile(path.join(publicDir, "logo.png"));

  const markBuffer = await sharp(SOURCE).extract(MARK_CROP).png().toBuffer();

  await sharp(markBuffer)
    .resize(512, 512, { kernel: "lanczos3" })
    .toFile(path.join(appDir, "icon.png"));

  await sharp(markBuffer)
    .resize(180, 180, { kernel: "lanczos3" })
    .flatten({ background: "#0197af" })
    .toFile(path.join(appDir, "apple-icon.png"));

  const icoSizes = await Promise.all(
    [16, 32, 48].map((size) =>
      sharp(markBuffer).resize(size, size, { kernel: "lanczos3" }).png().toBuffer()
    )
  );
  const ico = await pngToIco(icoSizes);
  await writeFile(path.join(appDir, "favicon.ico"), ico);

  console.log("Brand assets generated: public/logo.png, src/app/icon.png, src/app/apple-icon.png, src/app/favicon.ico");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
