#!/usr/bin/env bash
# Generate per-case Open Graph images (1200x630) from project heroes
# Resize with cover crop, add 50% dark overlay
set -euo pipefail

mkdir -p images/og

if ! command -v convert &>/dev/null; then
  echo "❌ ImageMagick not found. Install: brew install imagemagick"
  exit 1
fi

echo "Generating OG images (1200×630)..."

# Get project data from JSON
projects=$(jq -r '.[] | "\(.slug)|\(.hero)"' data/projects.json)

count=0
failed=0

# Process each project
while IFS='|' read -r slug hero; do
  if [ -z "$slug" ] || [ -z "$hero" ]; then
    continue
  fi

  outfile="images/og/${slug}.jpg"

  if [ ! -f "$hero" ]; then
    echo "⚠ $slug"
    ((failed++))
    continue
  fi

  if convert "$hero" -resize 1200x630^ -gravity center -extent 1200x630 -fill black -colorize 50% "$outfile" 2>/dev/null; then
    echo "✓ $slug"
    ((count++))
  else
    echo "✗ $slug"
    ((failed++))
  fi
done <<< "$projects"

echo ""
echo "✓ Generated $count OG images in images/og/"
[ "$failed" -gt 0 ] && echo "⚠ Failed: $failed"
