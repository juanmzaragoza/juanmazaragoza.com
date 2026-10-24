#!/usr/bin/env node
// Generate responsive image variants (50%, 75%, 100%)
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imageSizes = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/images.json'), 'utf8'));

// Only process images larger than 800px in any dimension
const largeImages = Object.entries(imageSizes)
  .filter(([_, [w, h]]) => w > 800 || h > 800)
  .map(([src]) => src);

console.log(`Generating responsive variants for ${largeImages.length} large images...`);

let count = 0;
for (const src of largeImages) {
  const fullPath = path.join(ROOT, src);
  const webpPath = src.replace(/\.(png|jpe?g)$/i, '.webp');
  const fullWebpPath = path.join(ROOT, webpPath);
  
  if (!fs.existsSync(fullWebpPath)) continue;

  const [w, h] = imageSizes[webpPath];
  const basename = path.basename(webpPath);
  const dirname = path.dirname(webpPath);

  // Generate 50% and 75% variants
  for (const scale of [0.5, 0.75]) {
    const newW = Math.round(w * scale);
    const newH = Math.round(h * scale);
    const scaled = basename.replace(/\.webp$/, `-${Math.round(scale * 100)}.webp`);
    const scaledPath = path.join(dirname, scaled);
    const scaledFullPath = path.join(ROOT, scaledPath);

    // Skip if already exists
    if (fs.existsSync(scaledFullPath)) continue;

    try {
      execSync(`convert "${fullWebpPath}" -resize ${newW}x${newH} "${scaledFullPath}"`, { stdio: 'pipe' });
      console.log(`✓ ${scaled}`);
      count++;
      // Add to imageSizes
      imageSizes[scaledPath] = [newW, newH];
    } catch (e) {
      console.error(`✗ Failed to generate ${scaled}`);
    }
  }
}

// Save updated imageSizes
fs.writeFileSync(
  path.join(ROOT, 'data/images.json'),
  JSON.stringify(imageSizes, null, 2)
);

console.log(`\n✓ Generated ${count} responsive variants`);
