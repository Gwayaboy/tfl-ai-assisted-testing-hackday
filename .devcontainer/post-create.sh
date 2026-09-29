#!/usr/bin/env bash
# Runs once when the Codespace / devcontainer is created.
set -euo pipefail

echo "==> Installing Chrome for the Playwright MCP server…"
npx --yes playwright@latest install --with-deps chrome

echo "==> Pre-cloning the Movies app SUT next to the repo…"
if [ ! -d "../playwright-movies-app" ]; then
  git clone https://github.com/debs-obrien/playwright-movies-app.git ../playwright-movies-app || true
fi

if [ -d "../playwright-movies-app" ]; then
  cd ../playwright-movies-app
  echo "==> Installing SUT dependencies (also builds the bundled mock API)…"
  npm install || true
  if [ ! -f ".env" ] && [ -f ".env.example" ]; then
    echo "==> Creating .env from .env.example (sets the test login)…"
    cp .env.example .env || true
  fi
  echo "==> Installing Playwright browsers (Chromium)…"
  npx --yes playwright install --with-deps chromium || true
  cd - >/dev/null
  echo "==> Configuring the SUT to serve its API same-origin (works in the Codespaces browser preview)…"
  node scripts/enable-sut-proxy.mjs ../playwright-movies-app || true
fi

# --- Track 3 (optional): Apache JMeter for local load testing ---------------
# Java is provided by the devcontainer 'java' feature; Azure CLI + the `az load`
# extension + Bicep come from the 'azure-cli' feature. This adds the JMeter CLI.
JMETER_VERSION=5.6.3
if ! command -v jmeter >/dev/null 2>&1; then
  echo "==> Installing Apache JMeter ${JMETER_VERSION} (Track 3 — local load testing)…"
  if curl -fsSL "https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-${JMETER_VERSION}.tgz" -o /tmp/jmeter.tgz \
     && sudo tar -xzf /tmp/jmeter.tgz -C /opt \
     && sudo ln -sf "/opt/apache-jmeter-${JMETER_VERSION}/bin/jmeter" /usr/local/bin/jmeter; then
    rm -f /tmp/jmeter.tgz
    echo "    JMeter ready: $(jmeter --version 2>/dev/null | head -n1 || echo installed)"
  else
    rm -f /tmp/jmeter.tgz
    echo "    (JMeter install skipped — install later; see track-3-performance-optional/jmeter)"
  fi
fi

# --- Regression challenge: hydrate the shared Playwright Workspaces .env --------
# PLAYWRIGHT_SERVICE_URL / PLAYWRIGHT_SERVICE_ACCESS_TOKEN arrive as environment
# variables when set as Codespaces secrets. The regression suites already read
# them straight from the environment, but we also materialise the ONE shared
# .env so file-based workflows "just work" too. It's git-ignored, never
# overwrites an existing file, and is a no-op when the secrets aren't set.
MPT_ENV="track-1-functional/challenge-regression-optimisation/.env"
if [ -n "${PLAYWRIGHT_SERVICE_ACCESS_TOKEN:-}" ] || [ -n "${PLAYWRIGHT_SERVICE_URL:-}" ]; then
  if [ ! -f "$MPT_ENV" ]; then
    echo "==> Hydrating ${MPT_ENV} from Codespaces secrets…"
    {
      printf '%s\n' "# Auto-generated from Codespaces secrets by .devcontainer/post-create.sh — git-ignored, do NOT commit."
      printf '%s\n' "# To change these, edit the repo's Codespaces secrets, then rebuild the Codespace."
      [ -n "${PLAYWRIGHT_SERVICE_URL:-}" ] && printf 'PLAYWRIGHT_SERVICE_URL=%s\n' "$PLAYWRIGHT_SERVICE_URL" || true
      [ -n "${PLAYWRIGHT_SERVICE_ACCESS_TOKEN:-}" ] && printf 'PLAYWRIGHT_SERVICE_ACCESS_TOKEN=%s\n' "$PLAYWRIGHT_SERVICE_ACCESS_TOKEN" || true
    } > "$MPT_ENV"
    echo "    Wrote the Playwright Workspaces endpoint/token to ${MPT_ENV}."
  else
    echo "==> ${MPT_ENV} already present — leaving it untouched."
  fi
fi

echo ""
echo "=================================================================="
echo " Setup complete — no cloud account or API key needed for Tracks 1 & 2."
echo " Start the SUT (mock :4000 + app :3000):"
echo "     cd ../playwright-movies-app && npm run dev"
echo " Then open the forwarded port 3000  (login me@outlook.com / 12345)"
echo " Begin with track-1-functional/README.md"
echo " Track 3 (optional): jmeter, az CLI (+ az load) and Bicep are preinstalled."
echo " Regression challenge: if Playwright Workspaces secrets are set, the shared .env is auto-created."
echo "=================================================================="
