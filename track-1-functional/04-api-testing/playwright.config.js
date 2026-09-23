import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  timeout: 30_000,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
  },
});
