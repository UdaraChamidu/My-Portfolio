import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";

const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const portrait = await readFile(new URL("../public/profile.jpg", import.meta.url));
  const html = (await readFile(new URL("./social-preview.html", import.meta.url), "utf8")).replace("__PORTRAIT__", `data:image/jpeg;base64,${portrait.toString("base64")}`);
  await page.setContent(html);
  await page.locator("img").evaluate((image) => image.decode());
  await page.screenshot({ path: "public/social-preview.png" });
} finally { await browser.close(); }
