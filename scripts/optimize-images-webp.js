import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { glob } from 'glob';

const ASSETS_DIR = 'public/assets/img';
const QUALITY = 80;

async function optimizeImages() {
    console.log('🚀 Starting image optimization...');

    // Find all images
    const images = await glob(`${ASSETS_DIR}/**/*.{jpg,jpeg,png}`);
    console.log(`Found ${images.length} images to optimize`);

    let savedBytes = 0;

    for (const file of images) {
        const ext = path.extname(file);
        const basename = path.basename(file, ext);
        const dirname = path.dirname(file);

        // Skip already optimized files
        if (basename.includes('-optimized')) continue;

        console.log(`Processing: ${file}`);

        try {
            const originalStats = fs.statSync(file);
            const sharpInstance = sharp(file);
            await sharpInstance.metadata();

            // 1. Generate WebP
            const webpPath = path.join(dirname, `${basename}.webp`);
            await sharpInstance
                .webp({ quality: QUALITY, effort: 6 })
                .toFile(webpPath);

            const webpStats = fs.statSync(webpPath);
            savedBytes += (originalStats.size - webpStats.size);

            console.log(`✅ Generated WebP: ${path.basename(webpPath)} (${formatBytes(webpStats.size)}) - Saved ${formatBytes(originalStats.size - webpStats.size)}`);

            // 2. Generate AVIF (even better compression)
            const avifPath = path.join(dirname, `${basename}.avif`);
            await sharpInstance
                .avif({ quality: QUALITY - 10, effort: 4 }) // AVIF is slower, so lower effort slightly
                .toFile(avifPath);

            console.log(`✅ Generated AVIF: ${path.basename(avifPath)}`);

        } catch (error) {
            console.error(`❌ Error processing ${file}:`, error);
        }
    }

    console.log(`\n🎉 Optimization complete! Total estimated savings: ${formatBytes(savedBytes)}`);
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

optimizeImages().catch(console.error);
