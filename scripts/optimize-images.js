#!/usr/bin/env node

/**
 * Image Optimization Script
 * Compresses images in public/assets/img directory
 * Uses sharp library for image optimization
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMG_DIR = path.join(__dirname, '../public/assets/img');
const QUALITY = 80;

async function optimizeImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const relativePath = path.relative(IMG_DIR, filePath);

    try {
        if (ext === '.png') {
            await sharp(filePath)
                .png({ quality: QUALITY, compressionLevel: 9 })
                .toFile(filePath + '.tmp');
            fs.renameSync(filePath + '.tmp', filePath);
            console.log(`✓ Optimized PNG: ${relativePath}`);
        } else if (ext === '.jpg' || ext === '.jpeg') {
            await sharp(filePath)
                .jpeg({ quality: QUALITY, progressive: true })
                .toFile(filePath + '.tmp');
            fs.renameSync(filePath + '.tmp', filePath);
            console.log(`✓ Optimized JPEG: ${relativePath}`);
        }
    } catch (error) {
        console.error(`✗ Failed to optimize ${relativePath}:`, error.message);
    }
}

async function walkDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            await walkDirectory(filePath);
        } else if (stat.isFile()) {
            const ext = path.extname(file).toLowerCase();
            if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                await optimizeImage(filePath);
            }
        }
    }
}

console.log('🖼️  Starting image optimization...\n');

walkDirectory(IMG_DIR)
    .then(() => {
        console.log('\n✅ Image optimization complete!');
    })
    .catch((error) => {
        console.error('\n❌ Image optimization failed:', error);
        process.exit(1);
    });
