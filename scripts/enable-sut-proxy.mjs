#!/usr/bin/env node
/**
 * Make the Movies app SUT work through a *single* same-origin port (3000) so it
 * loads in a GitHub Codespaces browser preview (…-3000.app.github.dev) with no
 * extra setup — no public 4000 port, no CORS changes, no `gh` port-forwarding.
 *
 * How: the app fetches its data client-side from NEXT_PUBLIC_TMDB_API_BASE_URL.
 * We point that at the RELATIVE path "/tmdb" (so the browser calls the same origin
 * it loaded from), and add a Next.js dev rewrite that proxies "/tmdb/*" to the
 * local mock API on 127.0.0.1:4000 (resolved server-side, inside the container).
 *
 * IMPORTANT: the base URL is injected via the `env` block of next.config.ts, NOT
 * just the monorepo-root .env — Next inlines NEXT_PUBLIC_* at build time from the
 * app's own project dir (movies-app/), so a root .env alone does NOT reach the
 * browser bundle. (We still set the root .env for good measure.) Verified live in
 * a real Codespace: without the env injection the browser keeps calling
 * 127.0.0.1:4000 and shows "An error occurred on client".
 *
 * This also keeps working when you open http://localhost:3000 directly (local run
 * or VS Code Desktop attached to the Codespace), so one config covers every path.
 *
 * Idempotent. Safe to run repeatedly. Usage:
 *   node scripts/enable-sut-proxy.mjs [path-to-movies-app]   (default ../playwright-movies-app)
 */
import { readFileSync, writeFileSync, existsSync, copyFileSync } from "node:fs";
import { join, resolve } from "node:path";

const appDir = resolve(process.argv[2] || "../playwright-movies-app");
const PROXY_PREFIX = "/tmdb";
const MOCK_TARGET = "http://127.0.0.1:4000";

if (!existsSync(appDir)) {
  console.error(`[enable-sut-proxy] app dir not found: ${appDir} — skipping.`);
  process.exit(0);
}

// 1) .env — point the client at the relative /tmdb path -----------------------
const envPath = join(appDir, ".env");
const envExample = join(appDir, ".env.example");
if (!existsSync(envPath) && existsSync(envExample)) copyFileSync(envExample, envPath);
let env = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
const envLine = `NEXT_PUBLIC_TMDB_API_BASE_URL=${PROXY_PREFIX}`;
if (/^NEXT_PUBLIC_TMDB_API_BASE_URL=.*$/m.test(env)) {
  env = env.replace(/^NEXT_PUBLIC_TMDB_API_BASE_URL=.*$/m, envLine);
} else {
  env += (env.endsWith("\n") || env === "" ? "" : "\n") + envLine + "\n";
}
writeFileSync(envPath, env);
console.log(`[enable-sut-proxy] .env -> ${envLine}`);

// 2) next.config.ts — add a dev rewrite proxying /tmdb/* to the mock ----------
const cfgPath = join(appDir, "movies-app", "next.config.ts");
if (!existsSync(cfgPath)) {
  console.warn(`[enable-sut-proxy] ${cfgPath} not found — env set, but skipping rewrite.`);
  console.warn(`[enable-sut-proxy] If movies don't load in the browser preview, see docs/codespaces.md troubleshooting.`);
  process.exit(0);
}
let cfg = readFileSync(cfgPath, "utf8");
if (cfg.includes(`${PROXY_PREFIX}/:path*`)) {
  console.log("[enable-sut-proxy] next.config.ts already has the proxy rewrite — nothing to do.");
  process.exit(0);
}
const anchor = "const config: NextConfig = {";
const injectBlock =
  "\n  // Hackday: make the app work through a single same-origin port (great for the\n" +
  "  // Codespaces browser preview). `env` inlines the API base into the client bundle\n" +
  "  // (NEXT_PUBLIC_* is read at build time from here, not the monorepo-root .env);\n" +
  "  // `rewrites` proxies that relative path to the mock API inside the container.\n" +
  `  env: { NEXT_PUBLIC_TMDB_API_BASE_URL: '${PROXY_PREFIX}' },\n` +
  "  async rewrites() {\n" +
  `    return [{ source: '${PROXY_PREFIX}/:path*', destination: '${MOCK_TARGET}/:path*' }];\n` +
  "  },";
if (cfg.includes(anchor)) {
  cfg = cfg.replace(anchor, anchor + injectBlock);
  writeFileSync(cfgPath, cfg);
  console.log(`[enable-sut-proxy] injected env NEXT_PUBLIC_TMDB_API_BASE_URL=${PROXY_PREFIX} + rewrite ${PROXY_PREFIX}/:path* -> ${MOCK_TARGET} into next.config.ts`);
} else {
  console.warn("[enable-sut-proxy] could not find the config anchor in next.config.ts (upstream may have changed).");
  console.warn("[enable-sut-proxy] Movies may not load in the browser preview — see docs/codespaces.md troubleshooting.");
}
