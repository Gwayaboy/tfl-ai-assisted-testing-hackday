#!/usr/bin/env bash
# Clones (if needed) and starts the Movies app SUT.
# npm run dev starts the bundled mock API (:4000) and the Movies app (:3000) together.
set -euo pipefail

APP_DIR="${MOVIES_APP_DIR:-../playwright-movies-app}"
REPO="https://github.com/debs-obrien/playwright-movies-app.git"

if ! command -v node >/dev/null 2>&1; then
  echo "ERROR: Node.js is not installed. Install Node 18+ from https://nodejs.org/"; exit 1
fi

for PORT in 3000 4000; do
  if lsof -i ":$PORT" >/dev/null 2>&1 || (command -v netstat >/dev/null 2>&1 && netstat -an | grep -q "[:.]$PORT .*LISTEN"); then
    echo "WARNING: Port $PORT is already in use. The app needs 3000 (app) and 4000 (mock API) free."
    echo "Stop whatever is using it, then re-run this script."
  fi
done

if [ ! -d "$APP_DIR" ]; then
  echo "==> Cloning movies app into $APP_DIR"
  git clone "$REPO" "$APP_DIR"
fi

cd "$APP_DIR"
echo "==> Installing dependencies (also builds the local mock API; first run can take a minute)…"
npm install
if [ ! -f ".env" ] && [ -f ".env.example" ]; then
  echo "==> Creating .env from .env.example (sets the test login)"
  cp .env.example .env
fi
echo "==> Starting the mock API (:4000) and the app (:3000)  (Ctrl+C to stop)"
echo "    Open http://localhost:3000   ·   Test login: me@outlook.com / 12345"
npm run dev
