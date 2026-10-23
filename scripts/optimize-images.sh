#!/usr/bin/env bash
# Converts every image referenced by the site to WebP (max 1600px wide)
# and writes their dimensions to data/images.json for the build script.
# Requires ImageMagick (`convert` / `identify`). Run from the repo root.
set -euo pipefail

refs=$( { grep -oh 'images/[^"]*\.\(png\|jpe\?g\)' data/projects.json; \
          echo images/img_3062-Yan6xja2xjijrwNj.jpg; \
          echo images/zyro-image-1-m2WBn69XLECKwk52.png; } | sort -u )

echo "{" > data/images.json
first=1
for src in $refs; do
  out="${src%.*}.webp"
  if [ ! -f "$out" ] || [ "$src" -nt "$out" ]; then
    convert "$src" -resize '1600x>' -quality 78 "$out"
  fi
  dims=$(identify -format '%w %h' "$out")
  [ $first -eq 1 ] || echo "," >> data/images.json
  first=0
  printf '  "%s": [%s, %s]' "$out" ${dims% *} ${dims#* } >> data/images.json
done
echo "" >> data/images.json
echo "}" >> data/images.json

# Small favicon from the logo
convert images/ezgif.com-webp-to-png2-gray-mnl55Ww26wH9OEEa.png -resize 64x64 -background none -gravity center -extent 64x64 images/favicon.png
echo "Optimized $(echo "$refs" | wc -l) images"
