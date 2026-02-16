#!/bin/sh
set -eu

TEMPLATE_PATH="/usr/share/nginx/html/env.template.js"
OUTPUT_PATH="/usr/share/nginx/html/env.js"

: "${REACT_APP_PUBLIC_X_BLOCKS_KEY:=}"
: "${REACT_APP_PUBLIC_BLOCKS_API_URL:=}"
: "${REACT_APP_PUBLIC_API_URL:=}"

if [ -f "$TEMPLATE_PATH" ]; then
  envsubst '${REACT_APP_PUBLIC_X_BLOCKS_KEY} ${REACT_APP_PUBLIC_BLOCKS_API_URL} ${REACT_APP_PUBLIC_API_URL}' < "$TEMPLATE_PATH" > "$OUTPUT_PATH"
  echo "Generated env.js from environment variables."
else
  echo "env.template.js not found, skipping env.js generation."
fi
