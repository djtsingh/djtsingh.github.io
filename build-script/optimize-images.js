import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const FOLDERS_TO_PROCESS = [
  {
    input: path.join(__dirname, '..', 'static/assets'),
    output: path.join(__dirname, '..', 'static/assets/optimized'),
    recursive: false, // Only root level files
    responsiveSizes: false
  },
  {
    input: path.join(__dirname, '..', 'static/assets/blog'),
    output: path.join(__dirname, '..', 'static/assets/blog/optimized'),
    recursive: false,
    responsiveSizes: true // Blog images get responsive sizes
  },
  {
    input: path.join(__dirname, '..', 'static/projects'),
    output: path.join(__dirname, '..', 'static/projects/optimized'),
    recursive: false,
    responsiveSizes: true
  }
];

// Ensure output directories exist
FOLDERS_TO_PROCESS.forEach(({ output }) => {
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
  }
});

// Check if optimized version needs updating
function needsOptimization(inputPath, outputPath) {
  if (!fs.existsSync(outputPath)) {
    return true; // Output doesn't exist
  }
  
  const inputStats = fs.statSync(inputPath);
  const outputStats = fs.statSync(outputPath);
  
  return inputStats.mtime > outputStats.mtime; // Source is newer than optimized
}

// Image optimization function with optional resize
async function optimizeImage(inputPath, outputPath, format, quality = 80, width = null) {
  if (!needsOptimization(inputPath, outputPath)) {
    console.log(`⏭️  Skipped (already optimized): ${path.basename(outputPath)}`);
    return;
  }
  
  try {
    let pipeline = sharp(inputPath);

    // Resize if width is specified
    if (width) {
      pipeline = pipeline.resize(width, null, { 
        fit: 'inside',
        withoutEnlargement: true 
      });
    }

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
    console.log(`✅ Optimized: ${path.relative(process.cwd(), outputPath)}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

// Process images in a folder
async function processFolder(config) {
  const { input, output, responsiveSizes } = config;
  
  if (!fs.existsSync(input)) {
    console.log(`⚠️  Folder not found: ${input}`);
    return;
  }

  console.log(`\n📁 Processing: ${path.relative(process.cwd(), input)}`);
  const files = fs.readdirSync(input);
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    const inputPath = path.join(input, file);
    
    // Skip directories and non-image files
    if (fs.statSync(inputPath).isDirectory()) continue;
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

    if (responsiveSizes) {
      // Generate responsive sizes (for blog and project images)
      const sizes = [
        { width: 480, suffix: '-sm', quality: 85 },
        { width: 800, suffix: '-md', quality: 85 },
        { width: 1200, suffix: '-lg', quality: 80 }
      ];
      
      for (const { width, suffix, quality } of sizes) {
        await optimizeImage(
          inputPath,
          path.join(output, `${baseName}${suffix}.webp`),
          'webp',
          quality,
          width
        );
      }
    } else {
      // Single optimized version (for icons, small assets)
      await optimizeImage(inputPath, path.join(output, `${baseName}.webp`), 'webp', 85);
      
      if (ext === '.png') {
        await optimizeImage(inputPath, path.join(output, `${baseName}.png`), 'png', 80);
      } else {
        await optimizeImage(inputPath, path.join(output, `${baseName}.jpg`), 'jpg', 85);
      }
    }
  }
}

// Main process
async function processImages() {
  console.log('📸 Starting image optimization...\n');
  
  for (const config of FOLDERS_TO_PROCESS) {
    await processFolder(config);
  }

  console.log('\n🎉 Image optimization complete!\n');
}

processImages();