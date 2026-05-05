import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = "./public/gallery";
const outputDir = "./public/gallery";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const files = fs.readdirSync(inputDir);

files.forEach(async (file) => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file.split(".")[0] + ".webp");

  await sharp(inputPath)
    .webp({ quality: 75 })
    .toFile(outputPath);

  console.log("Converted:", file);
});