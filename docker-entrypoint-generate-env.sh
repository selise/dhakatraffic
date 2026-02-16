#!/bin/sh
set -eu

TEMPLATE_PATH="/usr/share/nginx/html/env.template.js"
OUTPUT_PATH="/usr/share/nginx/html/env.js"

: "${VITE_X_BLOCKS_KEY:=}"
: "${VITE_BLOCKS_API_URL:=}"
: "${VITE_API_BASE_URL:=}"

if [ -f "$TEMPLATE_PATH" ]; then
  envsubst '${VITE_X_BLOCKS_KEY} ${VITE_BLOCKS_API_URL} ${VITE_API_BASE_URL}' < "$TEMPLATE_PATH" > "$OUTPUT_PATH"
  echo "Generated env.js from environment variables."
else
  echo "env.template.js not found, skipping env.js generation."
fi
