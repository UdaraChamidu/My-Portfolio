import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";

for (const width of [390, 1024, 1440, 1920]) {
  test(`asymmetric floating technologies preserve layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const tracks = page.locator(".hero-floating-technology");
    await expect(tracks).toHaveCount(width < 768 ? 6 : 8);
    const portrait = page.locator(".hero-portrait");
    const stage = page.locator(".hero-portrait-stage");
    await expect(portrait).toBeVisible();
    await page.waitForTimeout(800);
    const photo = await portrait.boundingBox();
    const frame = await stage.boundingBox();
    expect(photo.width).toBe(width < 640 ? 144 : width < 1280 ? 320 : 360);
    for (const dimension of ["x", "y", "width", "height"]) {
      expect(Math.abs(photo[dimension] - frame[dimension])).toBeLessThan(1);
    }
    const before = await tracks.first().evaluate((element) => getComputedStyle(element).translate);
    await page.waitForTimeout(600);
    const after = await tracks.first().evaluate((element) => getComputedStyle(element).translate);
    expect(after).not.toBe(before);
    const geometry = await page.evaluate(() => {
      const icons = [...document.querySelectorAll(".hero-floating-technology")].map((element) => element.getBoundingClientRect());
      const image = document.querySelector(".hero-portrait").getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        clearOfPhoto: icons.every((icon) => Math.hypot(icon.x + icon.width / 2 - image.x - image.width / 2, icon.y + icon.height / 2 - image.y - image.height / 2) > image.width / 2 + icon.width / 2),
      };
    });
    expect(geometry).toEqual({ overflow: false, clearOfPhoto: true });
    await mkdir(".browser-qa", { recursive: true });
    await expect(tracks.first()).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(tracks.first()).toHaveCSS("border-top-width", "0px");
    await page.screenshot({ path: `.browser-qa/hero-floating-${width}.png` });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(tracks.first()).toHaveCSS("animation-name", "none");
    const paused = await tracks.first().evaluate((element) => getComputedStyle(element).transform);
    await page.waitForTimeout(200);
    expect(await tracks.first().evaluate((element) => getComputedStyle(element).transform)).toBe(paused);
  });
}

test("floating logos cycle through twenty tools one slot at a time", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.clock.install();
  await page.goto("/");
  const logos = page.locator(".hero-floating-technology");
  const names = () => logos.evaluateAll((elements) => elements.map((element) => element.dataset.technology));
  await expect(logos).toHaveCount(8);
  await page.clock.runFor(100);
  let previous = await names();
  const seen = new Set(previous);
  for (let index = 0; index < 14; index++) {
    await page.clock.fastForward(750);
    await page.clock.fastForward(250);
    const current = await names();
    expect(current.filter((name, slot) => name !== previous[slot])).toHaveLength(1);
    expect(new Set(current).size).toBe(8);
    current.forEach((name) => seen.add(name));
    previous = current;
  }
  expect(seen.size).toBe(20);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.clock.runFor(100);
  const paused = await names();
  await page.clock.fastForward(20000);
  expect(await names()).toEqual(paused);
});

test("mobile uses six logos with three-second swaps and restores desktop settings", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.clock.install();
  await page.goto("/");
  const logos = page.locator(".hero-floating-technology");
  const names = () => logos.evaluateAll((elements) => elements.map((element) => element.dataset.technology));
  await expect(logos).toHaveCount(6);
  await page.clock.runFor(100);
  let previous = await names();
  for (let cycle = 0; cycle < 6; cycle++) {
    await page.clock.fastForward(2000);
    expect(await names()).toEqual(previous);
    await page.clock.fastForward(750);
    await page.clock.fastForward(250);
    const current = await names();
    expect(current.filter((name, slot) => name !== previous[slot])).toHaveLength(1);
    expect(new Set(current).size).toBe(6);
    previous = current;
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.clock.runFor(100);
  await expect(logos).toHaveCount(8);
  const desktop = await names();
  await page.clock.fastForward(750);
  await page.clock.fastForward(250);
  expect((await names()).filter((name, slot) => name !== desktop[slot])).toHaveLength(1);
});
