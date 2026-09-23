#!/usr/bin/env bash
# Runs once when the Codespace / devcontainer is created.
set -euo pipefail

echo "==> Installing Playwright browsers (used by Track 1)…"
npx --yes playwright install --with-deps chromium || true

echo "==> Pre-cloning the Movies app SUT next to the repo…"
if [ ! -d "../playwright-movies-app" ]; then
  git clone https://github.com/debs-obrien/playwright-movies-app.git ../playwright-movies-app || true
fi
if [ -d "../playwright-movies-app" ]; then
  ( cd ../playwright-movies-app && npm install ) || true
fi

echo ""
echo "=================================================================="
echo " Setup complete."
echo " Start the SUT:  cd ../playwright-movies-app && npm run dev"
echo " Then open http://localhost:3000  (login me@outlook.com / 12345)"
echo " Begin with track-1-functional/README.md"
echo "=================================================================="
