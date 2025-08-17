#!/usr/bin/env zsh
set -euo pipefail

# Simple helper to create the Open Graph/Twitter preview image (1200x630)
# Usage: scripts/make-og.sh /absolute/path/to/source-image.(png|jpg|jpeg)

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC_DIR="$PROJECT_DIR/public"

SRC_PATH="${1:-}"
if [[ -z "$SRC_PATH" ]]; then
  echo "Usage: scripts/make-og.sh /absolute/path/to/source-image.(png|jpg|jpeg)" >&2
  exit 1
fi

if [[ ! -f "$SRC_PATH" ]]; then
  echo "File not found: $SRC_PATH" >&2
  exit 1
fi

mkdir -p "$PUBLIC_DIR"

WORK_DIR="$(mktemp -d)"
trap 'rm -rf "$WORK_DIR"' EXIT

# 1) Normalize to JPEG
/usr/bin/sips -s format jpeg "$SRC_PATH" --out "$WORK_DIR/source.jpg" >/dev/null

# 2) Ensure height is at least 630 (preserving aspect ratio)
/usr/bin/sips --resampleHeight 630 "$WORK_DIR/source.jpg" --out "$WORK_DIR/h630.jpg" >/dev/null

# 3) If width < 1200 after step 2, upscale width to 1200
WIDTH_STR=$(/usr/bin/sips -g pixelWidth "$WORK_DIR/h630.jpg" | awk '/pixelWidth/ {print $2}')
WIDTH=${WIDTH_STR:-0}

INPUT_IMG="$WORK_DIR/h630.jpg"
if [[ "$WIDTH" -lt 1200 ]]; then
  /usr/bin/sips --resampleWidth 1200 "$WORK_DIR/h630.jpg" --out "$WORK_DIR/w1200.jpg" >/dev/null
  INPUT_IMG="$WORK_DIR/w1200.jpg"
fi

# 4) Center crop to exactly 630x1200
/usr/bin/sips -c 630 1200 "$INPUT_IMG" --out "$PUBLIC_DIR/preview-image.jpg" >/dev/null

echo "Preview written to: $PUBLIC_DIR/preview-image.jpg"

