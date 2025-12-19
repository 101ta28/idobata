#!/bin/sh
set -eu

KEY_PATH="${GITHUB_APP_PRIVATE_KEY_PATH:-/app/secrets/github-key.pem}"

mkdir -p "$(dirname "$KEY_PATH")"

if [ -n "${GITHUB_APP_PRIVATE_KEY_BASE64:-}" ]; then
  echo "$GITHUB_APP_PRIVATE_KEY_BASE64" | base64 -d > "$KEY_PATH"
elif [ -n "${GITHUB_APP_PRIVATE_KEY:-}" ]; then
  printf "%s" "$GITHUB_APP_PRIVATE_KEY" > "$KEY_PATH"
fi

if [ -f "$KEY_PATH" ]; then
  chmod 600 "$KEY_PATH" || true
fi

exec "$@"
