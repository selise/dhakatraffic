#!/bin/sh
set -eu

TEMPLATE_PATH="/usr/share/nginx/html/env.template.js"
OUTPUT_PATH="/usr/share/nginx/html/env.js"
FALLBACK_ENV_FILE="/usr/share/nginx/html/.env.prod"

# Fallback to platform-style .env file when runtime env vars are absent.
if [ -f "$FALLBACK_ENV_FILE" ] && { [ -z "${VITE_X_BLOCKS_KEY:-}" ] || [ -z "${VITE_BLOCKS_API_URL:-}" ]; }; then
  set -a
  # shellcheck disable=SC1090
  . "$FALLBACK_ENV_FILE"
  set +a
  echo "Loaded VITE_* values from .env.prod fallback."
fi

: "${VITE_X_BLOCKS_KEY:=}"
: "${VITE_BLOCKS_API_URL:=}"
: "${VITE_API_BASE_URL:=}"

if [ -f "$TEMPLATE_PATH" ]; then
  envsubst '${VITE_X_BLOCKS_KEY} ${VITE_BLOCKS_API_URL} ${VITE_API_BASE_URL}' < "$TEMPLATE_PATH" > "$OUTPUT_PATH"
  echo "Generated env.js from environment variables."
else
  echo "env.template.js not found, skipping env.js generation."
fi
