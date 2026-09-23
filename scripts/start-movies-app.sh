#!/usr/bin/env bash
# Clones (if needed) and starts the Movies app SUT on http://localhost:3000
set -euo pipefail

APP_DIR="${MOVIES_APP_DIR:-../playwright-movies-app}"
REPO="https://github.com/debs-obrien/playwright-movies-app.git"

if ! command -v node >/dev/null 2>&1; then
  echo "ERROR: Node.js is not installed. Install Node 18+ from https://nodejs.org/"; exit 1
fi

if lsof -i :3000 >/dev/null 2>&1 || (command -v netstat >/dev/null 2>&1 && netstat -an | grep -q '[:.]3000 .*LISTEN'); then
  echo "WARNING: Port 3000 already in use. The movies app needs port 3000 exactly."
  echo "Stop whatever is using it, then re-run this script."
fi

if [ ! -d "$APP_DIR" ]; then
  echo "==> Cloning movies app into $APP_DIR"
  git clone "$REPO" "$APP_DIR"
fi

cd "$APP_DIR"
echo "==> Installing dependencies (first run can take a minute)…"
npm install
echo "==> Starting the app on http://localhost:3000  (Ctrl+C to stop)"
echo "    Test login: me@outlook.com / 12345"
npm run dev
