import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'static/assets');
const outputDir = path.join(__dirname, 'static/assets/optimized');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Check if optimized version needs updating
function needsOptimization(inputPath, outputPath) {
  if (!fs.existsSync(outputPath)) {
    return true; // Output doesn't exist
  }
  
  const inputStats = fs.statSync(inputPath);
  const outputStats = fs.statSync(outputPath);
  
  return inputStats.mtime > outputStats.mtime; // Source is newer than optimized
}

// Image optimization function
async function optimizeImage(inputPath, outputPath, format, quality = 80) {
  if (!needsOptimization(inputPath, outputPath)) {
    console.log(`⏭️  Skipped (already optimized): ${path.basename(outputPath)}`);
    return;
  }
  
  try {
    let pipeline = sharp(inputPath);

    if (format === 'webp') {
      pipeline = pipeline.webp({ quality, effort: 6 });
    } else if (format === 'avif') {
      pipeline = pipeline.avif({ quality, effort: 9 });
    } else if (format === 'jpg') {
      pipeline = pipeline.jpeg({ quality, progressive: true });
    } else if (format === 'png') {
      pipeline = pipeline.png({ quality, compressionLevel: 9 });
    }

    await pipeline.toFile(outputPath);
    console.log(`✅ Optimized: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

// Process all images
async function processImages() {
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);

    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const inputPath = path.join(inputDir, file);

      // Generate WebP
      await optimizeImage(inputPath, path.join(outputDir, `${baseName}.webp`), 'webp', 85);

      // Generate AVIF
      await optimizeImage(inputPath, path.join(outputDir, `${baseName}.avif`), 'avif', 75);

      // Generate optimized JPG fallback
      await optimizeImage(inputPath, path.join(outputDir, `${baseName}.jpg`), 'jpg', 85);

      // Generate optimized PNG for icons
      if (ext === '.png') {
        await optimizeImage(inputPath, path.join(outputDir, `${baseName}.png`), 'png', 80);
      }
    }
  }

  console.log('🎉 Image optimization complete!');
}

processImages();