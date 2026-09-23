// Launch a fresh browser per scenario, tear it down afterwards.
import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { HEADED } from "./world.js";

setDefaultTimeout(30_000);

Before(async function () {
  this.browser = await chromium.launch({ headless: !HEADED });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});
