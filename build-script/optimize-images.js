import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '..', 'static/assets');
const outputDir = path.join(__dirname, '..', 'static/assets/optimized');
const projectsInputDir = path.join(__dirname, '..', 'static/projects');
const projectsOutputDir = path.join(__dirname, '..', 'static/projects/optimized');

// Ensure output directories exist
[outputDir, projectsOutputDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
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
    console.log(`✅ Optimized: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

// Process all images
async function processImages() {
  console.log('📸 Optimizing images...\n');
  
  // Process assets folder
  console.log('🖼️  Processing /assets...');
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
  
  // Process project images with responsive sizes
  console.log('\n🎨 Processing /projects with responsive sizes...');
  if (fs.existsSync(projectsInputDir)) {
    const projectFiles = fs.readdirSync(projectsInputDir);
    
    for (const file of projectFiles) {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        const inputPath = path.join(projectsInputDir, file);
        
        // Responsive sizes: mobile (400px), tablet (800px), desktop (1200px)
        const sizes = [
          { width: 400, suffix: '-sm', quality: 85 },
          { width: 800, suffix: '-md', quality: 85 },
          { width: 1200, suffix: '-lg', quality: 80 }
        ];
        
        for (const { width, suffix, quality } of sizes) {
          // WebP format (best for web)
          await optimizeImage(
            inputPath,
            path.join(projectsOutputDir, `${baseName}${suffix}.webp`),
            'webp',
            quality,
            width
          );
          
          // AVIF format (even better compression, newer browsers)
          await optimizeImage(
            inputPath,
            path.join(projectsOutputDir, `${baseName}${suffix}.avif`),
            'avif',
            quality - 10,
            width
          );
        }
      }
    }
  }

  console.log('\n🎉 Image optimization complete!');
}

processImages();