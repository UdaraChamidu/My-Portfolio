import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { heroHeadlines } from "../../src/data/heroHeadlines.js";

test.beforeEach(async ({ page }) => {
  // Tests never send enquiries or spend AI credits.
  await page.route("**/api/chat", (route) => route.fulfill({ json: { text: "Udara builds AI agents and workflow automation. [Contact Udara](#contact)." } }));
  await page.route("https://api.emailjs.com/**", (route) => route.fulfill({ status: 200, body: "OK" }));
});

const viewports = [
  ["narrow", 320, 740], ["mobile", 390, 844], ["landscape", 844, 390],
  ["tablet", 768, 1024], ["desktop", 1440, 900], ["wide", 1920, 1080],
];

for (const [name, width, height] of viewports) {
  for (const theme of ["dark", "light"]) {
    test(`${name} ${theme}: layout, assets, content, and screenshot`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto("/");
      // Theme storage follows the existing app; select explicitly if required.
      const toggle = page.getByRole("button", { name: theme === "light" ? "Use light theme" : "Use dark theme", exact: true }).first();
      if (await toggle.count()) await toggle.click();
      await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Turn your ideas into intelligent solutions.");
      await expect(page.locator("html")).toHaveClass(theme === "dark" ? /dark/ : /^(?!.*dark).*$/);
      await expect(page.locator("#projects article")).toHaveCount(6);
      await mkdir(".browser-qa", { recursive: true });
      await page.screenshot({ path: `.browser-qa/${name}-${theme}-hero.png` });
      for (const id of ["about", "projects", "services", "reviews", "experience", "skills", "credentials", "contact"]) {
        const section = page.locator(`#${id}`);
        if (!await section.count()) continue;
        await section.scrollIntoViewIfNeeded();
        await expect(section).toBeVisible();
        const overflow = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
        expect(overflow.scroll).toBeLessThanOrEqual(overflow.width + 1);
        const clipped = await section.locator("button, input, select, textarea, h2, h3").evaluateAll((elements) => elements.filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width && rect.height && !element.closest('[aria-hidden="true"]') && (rect.x < -1 || rect.right > innerWidth + 1);
        }).map((element) => element.textContent?.trim().slice(0, 70) || element.id));
        expect(clipped).toEqual([]);
      }
      const broken = await page.locator("img").evaluateAll((images) => images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.getAttribute("src")));
      expect(broken).toEqual([]);
      await page.locator("#reviews").scrollIntoViewIfNeeded();
      await page.screenshot({ path: `.browser-qa/${name}-${theme}-reviews.png` });
      await page.locator("#contact").scrollIntoViewIfNeeded();
      await page.screenshot({ path: `.browser-qa/${name}-${theme}-contact.png` });
      expect(errors).toEqual([]);
    });
  }
}

for (const width of [390, 1440]) {
  test(`wallpapers load locally and all 13 can rotate at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const externalRequests = [];
    page.on("request", (request) => { if (request.url().includes("images.unsplash.com")) externalRequests.push(request.url()); });
    await page.route("https://images.unsplash.com/**", (route) => route.abort());
    await page.goto("/");
    const slide = page.locator("[data-wallpaper]");
    for (let index = 0; index < 13; index++) {
      await expect(slide).toHaveAttribute("data-wallpaper", String(index));
      const loaded = await slide.evaluate(async (element) => {
        const url = element.style.backgroundImage.slice(5, -2);
        const image = new Image();
        image.src = url;
        await image.decode();
        return { width: image.naturalWidth, height: image.naturalHeight, path: new URL(image.src).pathname };
      });
      expect(loaded.width).toBe(width < 640 ? 960 : 1920);
      expect(loaded.height).toBeGreaterThan(100);
      expect(loaded.path).toMatch(/^\/wallpapers\//);
      if (index < 12) await page.getByRole("button", { name: "Show next background wallpaper" }).click();
    }
    await page.getByRole("button", { name: "Show next background wallpaper" }).click();
    await expect(slide).toHaveAttribute("data-wallpaper", "0");
    expect(externalRequests).toEqual([]);
    await mkdir(".browser-qa", { recursive: true });
    await page.screenshot({ path: `.browser-qa/wallpaper-restored-${width}-dark.png` });
    await page.getByRole("button", { name: "Use light theme", exact: true }).first().click();
    await page.screenshot({ path: `.browser-qa/wallpaper-restored-${width}-light.png` });
  });
}

test("wallpaper automatically advances after eight seconds", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("[data-wallpaper]")).toHaveAttribute("data-wallpaper", "1", { timeout: 12000 });
});

test("wallpaper skips a failed image without freezing", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/wallpapers/photo-1518770660439-4636190af475-*", (route) => route.abort());
  await page.goto("/");
  await page.getByRole("button", { name: "Show next background wallpaper" }).click();
  await expect(page.locator("[data-wallpaper]")).toHaveAttribute("data-wallpaper", "2");
});

test("wallpaper recovers from a stalled preload", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/wallpapers/photo-1518770660439-4636190af475-*", () => {});
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Show next background wallpaper" }).click();
  await expect(page.locator("[data-wallpaper]")).toHaveAttribute("data-wallpaper", "2", { timeout: 10000 });
});

test.describe("touch-only mobile", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  test("controls work without hover and leave footer links clear", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    expect(await page.evaluate(() => matchMedia("(hover: none)").matches)).toBe(true);
    await page.getByRole("button", { name: "Show next background wallpaper" }).tap();
    await expect(page.locator("[data-wallpaper]")).toHaveAttribute("data-wallpaper", "1");
    await page.locator("footer").scrollIntoViewIfNeeded();
    const controls = [];
    for (const name of ["Show next background wallpaper", "Play background slideshow", "Chat with Udara's assistant"]) {
      const button = page.getByRole("button", { name, exact: true });
      await expect.poll(async () => (await button.boundingBox()).width).toBeGreaterThanOrEqual(44);
      const box = await button.boundingBox();
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
      controls.push(box);
    }
    for (const link of await page.locator("footer a").all()) {
      const box = await link.boundingBox();
      if (!box) continue;
      expect(controls.some((control) => box.x < control.x + control.width && box.x + box.width > control.x && box.y < control.y + control.height && box.y + box.height > control.y)).toBe(false);
    }
    await page.getByRole("button", { name: "Chat with Udara's assistant", exact: true }).tap();
    await expect(page.getByRole("dialog", { name: "Udara's AI Assistant", exact: true })).toBeVisible();
  });
});

test("normal motion remains active, carousel cycles, and only two wallpapers load initially", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const wallpaperRequests = new Set();
  page.on("request", (request) => { if (request.url().includes("/wallpapers/")) wallpaperRequests.add(request.url()); });
  await page.goto("/");
  await expect(page.locator(".star").first()).toHaveCSS("animation-name", "pulse-subtle");
  expect(wallpaperRequests.size).toBeLessThanOrEqual(2);
  await expect(page.locator("[data-wallpaper]")).toHaveCount(1);
  await page.locator("#skills").scrollIntoViewIfNeeded();
  await expect(page.locator(".skill-logo-float").first()).not.toHaveCSS("animation-name", "none");
  await page.locator("#reviews").scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const carousel = page.getByRole("region", { name: "Client reviews", exact: true });
  await expect(carousel.getByRole("button", { name: "Show review 2", exact: true })).toHaveAttribute("aria-current", "true", { timeout: 6500 });
  await carousel.hover();
  const before = await carousel.locator('[aria-current="true"]').getAttribute("aria-label");
  await page.waitForTimeout(2300);
  expect(await carousel.locator('[aria-current="true"]').getAttribute("aria-label")).toBe(before);
});

test("mobile credential and skill filters retain their content", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#credentials");
  await expect(page.locator("#credentials article")).toHaveCount(3);
  await page.getByRole("tab", { name: "Education", exact: true }).click();
  await expect(page.locator("#credentials")).toContainText("Physics");
  await page.getByRole("tab", { name: "Certifications", exact: true }).click();
  await page.locator("#credentials").getByRole("button", { name: "AI & Automation", exact: true }).click();
  await expect(page.locator("#credentials article").first()).toBeVisible();
  await page.locator("#skills").scrollIntoViewIfNeeded();
  await page.locator("#skills").getByRole("button", { name: /Voice/ }).click();
  await expect(page.locator("#skills")).toContainText("ElevenLabs");
});

test("review loops forward across both boundaries without passing backwards through slide two", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#reviews");
  const carousel = page.getByRole("region", { name: "Client reviews", exact: true });
  await carousel.hover();
  const track = carousel.locator("[data-review-position]");
  const next = carousel.getByRole("button", { name: "Next review", exact: true });
  for (let cycle = 0; cycle < 2; cycle++) {
    for (const position of [2, 3]) {
      await next.click();
      await expect(track).toHaveAttribute("data-review-position", String(position));
      await page.waitForTimeout(700);
    }
    await track.evaluate((element) => {
      window.reviewWrapTransition = null;
      element.addEventListener("transitionrun", () => {
        const animation = element.getAnimations().find((item) => item.transitionProperty === "transform");
        const frames = animation?.effect.getKeyframes();
        if (frames?.length) {
          window.reviewWrapTransition = {
            start: frames[0].transform,
            end: frames[frames.length - 1].transform,
          };
        }
      }, { once: true });
    });
    await next.click();
    await expect.poll(() => page.evaluate(() => window.reviewWrapTransition)).toEqual({
      start: "translateX(-300%)", end: "translateX(-400%)",
    });
    await expect(track).toHaveAttribute("data-review-position", "1");
    await expect(carousel.getByRole("button", { name: "Show review 1", exact: true })).toHaveAttribute("aria-current", "true");
    await page.waitForTimeout(100);
  }
  await carousel.getByRole("button", { name: "Previous review", exact: true }).click();
  await expect(track).toHaveAttribute("data-review-position", "0");
  await expect(track).toHaveAttribute("data-review-position", "3");
});

test("automatic purple highlights run without hover and yield to manual interaction", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#about");
  const card = page.locator(".about-highlight").first();
  await expect(card).toHaveCSS("animation-name", "automatic-surface-highlight");
  await expect(page.locator(".about-highlight").nth(1)).toHaveCSS("animation-delay", "2s");
  await card.hover();
  await expect(card).toHaveCSS("animation-name", "none");
  await page.mouse.move(0, 0);
  await expect(card).toHaveCSS("animation-name", "automatic-surface-highlight");
  await page.locator("#services").scrollIntoViewIfNeeded();
  await expect(page.locator(".service-row").first()).toHaveCSS("animation-name", "automatic-surface-highlight");
  await expect(page.locator(".service-row").nth(1)).toHaveCSS("animation-delay", "2s");
  await expect(page.locator(".process-node").first()).toHaveCSS("animation-duration", "8s");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(card).toHaveCSS("animation-name", "none");
});

for (const width of [390, 1440]) {
  test(`About cards and every service remain opaque with normal motion at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await page.mouse.move(0, 0);
    await expect(page.locator("#about .about-highlight")).toHaveCount(3);
    await expect(page.locator("#services .service-row")).toHaveCount(4);
    for (const selector of ["#about .about-highlight", "#services .service-row"]) {
      for (const element of await page.locator(selector).all()) {
        await element.scrollIntoViewIfNeeded();
        await expect(element).toHaveClass(/reveal-visible/);
        await expect(element).toHaveCSS("opacity", "1");
        await expect(element).toHaveCSS("translate", "0px");
        await expect(element).toHaveCSS("animation-name", "automatic-surface-highlight");
        await element.hover();
        await expect(element).toHaveCSS("opacity", "1");
        await page.mouse.move(0, 0);
        await expect(element).toHaveCSS("opacity", "1");
      }
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator("#about .about-highlight").first()).toHaveCSS("opacity", "1");
    await expect(page.locator("#services .service-row").first()).toHaveCSS("opacity", "1");
  });
}

for (const width of [390, 1440]) {
  test(`experience cycles all four roles without scrolling or focus changes at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/#experience");
    await page.mouse.move(0, 0);
    const section = page.locator("#experience");
    await section.scrollIntoViewIfNeeded();
    const cards = section.locator(".experience-entry");
    await expect(cards).toHaveCount(4);
    const ids = await cards.evaluateAll((elements) => elements.map((element) => element.id));
    const active = section.locator('.experience-entry[data-active="true"]');
    await expect(active).toHaveAttribute("id", ids[0]);
    const start = await page.evaluate(() => ({ scroll: scrollY, focus: document.activeElement.tagName }));
    for (const index of [1, 2, 3, 0]) {
      await expect(active).toHaveAttribute("id", ids[index], { timeout: 3500 });
      if (width >= 1024) {
        await expect(section.locator('[aria-current="step"]')).toHaveAttribute("aria-controls", ids[index]);
      }
    }
    const end = await page.evaluate(() => ({ scroll: scrollY, focus: document.activeElement.tagName }));
    expect(Math.abs(end.scroll - start.scroll)).toBeLessThanOrEqual(1);
    expect(end.focus).toBe(start.focus);
    await cards.first().hover();
    await expect(active).toHaveAttribute("id", ids[0]);
    await expect(cards.first()).toHaveCSS("opacity", "1");
    await page.waitForTimeout(2300);
    await expect(active).toHaveAttribute("id", ids[0]);
    await page.mouse.move(0, 0);
    await expect(active).toHaveAttribute("id", ids[1], { timeout: 3500 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(2300);
    await expect(active).toHaveAttribute("id", ids[1]);
    await cards.last().focus();
    await expect(active).toHaveAttribute("id", ids[3]);
    await page.waitForTimeout(2300);
    await expect(active).toHaveAttribute("id", ids[3]);
  });
}

for (const width of [390, 1440]) {
  test(`hero motion preserves content and layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await page.mouse.move(0, 0);
    const hero = page.locator("#hero");
    await expect(hero.getByRole("heading", { level: 1 })).toHaveAccessibleName("Turn your ideas into intelligent solutions.");
    for (const item of await hero.locator(".hero-reveal").all()) {
      await expect(item).toHaveCSS("opacity", "1");
    }
    const portrait = hero.locator(".hero-portrait");
    await expect(portrait).toHaveCSS("animation-name", "hero-portrait-halo");
    const photoBox = await portrait.boundingBox();
    expect(photoBox.width).toBe(width === 390 ? 144 : 360);
    const cta = hero.getByRole("link", { name: "Discuss Your Project", exact: true });
    expect(await cta.evaluate((element) => getComputedStyle(element, "::before").animationName)).toBe("hero-cta-attention");
    await expect(hero.getByRole("link", { name: "View Services", exact: true })).toHaveAttribute("href", "#services");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await mkdir(".browser-qa", { recursive: true });
    await page.screenshot({ path: `.browser-qa/hero-motion-${width}.png` });
    await cta.hover();
    expect(await cta.evaluate((element) => getComputedStyle(element, "::before").animationName)).toBe("none");
    await page.mouse.move(0, 0);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(portrait).toHaveCSS("animation-name", "none");
    for (const item of await hero.locator(".hero-reveal").all()) {
      await expect(item).toHaveCSS("animation-name", "none");
      await expect(item).toHaveCSS("opacity", "1");
    }
    expect(await cta.evaluate((element) => getComputedStyle(element, "::before").animationName)).toBe("none");
    expect((await portrait.boundingBox()).width).toBe(photoBox.width);
  });
}

for (const width of [320, 360, 390, 640, 768, 1024, 1280, 1440, 1920]) {
  test(`all hero headlines fit the same two-line font at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const heading = page.getByRole("heading", { level: 1 });
    const fit = await heading.evaluate((element, headlines) => {
      const style = getComputedStyle(element);
      const context = document.createElement("canvas").getContext("2d");
      context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const lines = element.querySelectorAll(".hero-headline-line");
      return {
        height: element.getBoundingClientRect().height,
        lineHeight: parseFloat(style.lineHeight),
        fits: headlines.flat().every((text) => context.measureText(text).width <= element.clientWidth),
        fonts: Array.from(lines, (line) => getComputedStyle(line).fontSize),
        font: style.fontSize,
      };
    }, heroHeadlines);
    expect(fit.fits).toBe(true);
    expect(Math.abs(fit.height - 2 * fit.lineHeight)).toBeLessThan(1);
    expect(fit.fonts).toEqual([fit.font, fit.font]);
    await expect(page.locator(".hero-typewriter")).toHaveAttribute("data-phase", "static");
    await expect(heading.locator(".hero-headline-line").first()).toHaveText(heroHeadlines[0][0]);
    await expect(heading.locator(".hero-headline-line").last()).toHaveText(heroHeadlines[0][1]);
  });
}

for (const width of [390, 1440]) {
  test(`hero types and rotates without moving the portrait or controls at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const visual = page.locator(".hero-typewriter");
    const anchors = [page.locator(".hero-portrait"), page.locator("#hero h1"), page.locator("#hero .hero-cta-glow")];
    const baseline = await Promise.all(anchors.map((element) => element.boundingBox()));
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect(visual).toHaveAttribute("data-playing", "true");
    for (let index = 0; index < heroHeadlines.length; index++) {
      await expect(visual).toHaveAttribute("data-headline-index", String(index));
      await expect(visual).toHaveAttribute("data-phase", "holding", { timeout: 6000 });
      for (let line = 0; line < 2; line++) {
        await expect(visual.locator(".hero-headline-line").nth(line)).toHaveText(heroHeadlines[index][line]);
      }
      for (let anchor = 0; anchor < anchors.length; anchor++) {
        const bounds = await anchors[anchor].boundingBox();
        for (const key of ["x", "y", "width", "height"]) expect(Math.abs(bounds[key] - baseline[anchor][key])).toBeLessThan(1);
      }
      await expect(visual).toHaveAttribute("data-headline-index", String((index + 1) % heroHeadlines.length), { timeout: 4500 });
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(visual).toHaveAttribute("data-phase", "static");
    await expect(visual.locator(".hero-headline-line").first()).toHaveText(heroHeadlines[0][0]);
    await mkdir(".browser-qa", { recursive: true });
    await page.screenshot({ path: `.browser-qa/hero-typewriter-${width}.png` });
  });
}

test("review touch gesture changes slides without opening an image", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#reviews");
  const carousel = page.getByRole("region", { name: "Client reviews", exact: true });
  await carousel.evaluate((element) => {
    const start = new Touch({ identifier: 1, target: element, clientX: 280, clientY: 350 });
    const end = new Touch({ identifier: 1, target: element, clientX: 80, clientY: 350 });
    element.dispatchEvent(new TouchEvent("touchstart", { touches: [start], bubbles: true }));
    element.dispatchEvent(new TouchEvent("touchend", { changedTouches: [end], bubbles: true }));
  });
  await expect(carousel.getByRole("button", { name: "Show review 2", exact: true })).toHaveAttribute("aria-current", "true");
  await expect(carousel.getByRole("button", { name: "Play review rotation", exact: true })).toBeVisible();
});

test("chat adapts to an emulated visual keyboard viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Chat with Udara's assistant", exact: true }).click();
  await page.evaluate(() => {
    Object.defineProperty(window.visualViewport, "height", { configurable: true, get: () => 450 });
    window.visualViewport.dispatchEvent(new Event("resize"));
  });
  const dialog = page.getByRole("dialog", { name: "Udara's AI Assistant", exact: true });
  const bounds = await dialog.boundingBox();
  expect(bounds.y).toBeGreaterThanOrEqual(0);
  expect(bounds.y + bounds.height).toBeLessThanOrEqual(450);
  await expect(dialog.getByRole("textbox", { name: "Your message" })).toBeVisible();
});

test("search and social metadata use the configured production domain", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://udarachamidu.site/");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://udarachamidu.site/social-preview.png");
  expect((await request.get("/social-preview.png")).status()).toBe(200);
  expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap: https://udarachamidu.site/sitemap.xml");
  expect(await (await request.get("/sitemap.xml")).text()).toContain("<loc>https://udarachamidu.site/</loc>");
});

for (const [name, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  test.describe(`${name} workflows`, () => {
    test.use({ viewport, reducedMotion: "reduce", isMobile: viewport.width < 1024, hasTouch: viewport.width < 1024 });

    test("navigation, menu focus, and resizing", async ({ page }) => {
      await page.goto("/");
      const open = page.getByRole("button", { name: "Open navigation menu" });
      if (viewport.width < 1024) {
        await open.click();
        await expect(page.locator("#mobile-navigation").getByRole("link", { name: "Projects", exact: true })).toBeVisible();
        await page.keyboard.press("Shift+Tab");
        await expect(page.getByRole("button", { name: "Close navigation menu" })).toBeFocused();
        await page.keyboard.press("Escape");
        await expect(open).toBeFocused();
        await open.click();
        await page.setViewportSize({ width: 1440, height: 900 });
        await expect(page.locator("#mobile-navigation")).toHaveCount(0);
        await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
      }
      await expect(page.getByRole("navigation").getByRole("link", { name: "Writing", exact: true })).toHaveCount(0);
    });

    test("all featured projects, filters, and accessible details", async ({ page }) => {
      await page.goto("/#projects");
      await page.getByRole("button", { name: "Show all 9 projects", exact: true }).click();
      await expect(page.locator("#projects article")).toHaveCount(9);
      const allTitles = await page.locator("#projects article h3").allTextContents();
      expect(new Set(allTitles).size).toBe(9);
      await page.locator("#projects").getByRole("button", { name: "View details", exact: true }).first().click();
      const dialog = page.getByRole("dialog", { name: /Promotr/ });
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole("heading", { name: "My contribution", exact: true })).toBeVisible();
      await page.keyboard.press("Shift+Tab");
      expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await page.locator("#projects").getByRole("button", { name: "AI Automation", exact: true }).click();
      await expect(page.locator("#projects article")).toHaveCount(9);
      await expect(page.locator("#projects article h3").filter({ hasText: "Insurance AI Consultant Platform" })).toHaveCount(0);
    });

    test("service prefill and enquiry metadata; acknowledgement failure preserves success", async ({ page }) => {
      let calls = 0;
      const bodies = [];
      await page.route("https://api.emailjs.com/**", async (route) => {
        bodies.push(route.request().postDataJSON());
        calls++;
        await route.fulfill({ status: calls === 2 ? 500 : 200, body: calls === 2 ? "Acknowledgement failed" : "OK" });
      });
      await page.goto("/#services");
      await page.getByRole("link", { name: "Discuss your project: AI Workflow Automation", exact: true }).click();
      await expect(page.locator("#enquiry-service")).toHaveValue("ai-automation");
      await page.getByLabel("Your Name", { exact: true }).fill("Test Visitor");
      await page.getByLabel("Your Email", { exact: true }).fill("visitor@example.test");
      await page.locator("#enquiry-timeline").selectOption("Within a month");
      await page.getByLabel("Your Message", { exact: true }).fill("Please build a workflow.");
      await page.getByRole("button", { name: "Send Message", exact: true }).click();
      await expect(page.getByText("Your message was sent, but the confirmation email could not be delivered. No need to resend.", { exact: true })).toBeVisible();
      expect(calls).toBe(2);
      expect(bodies[0].template_params.message).toContain("Service: AI Workflow Automation");
      expect(bodies[0].template_params.message).toContain("Timeline: Within a month");
      await expect(page.getByLabel("Your Message", { exact: true })).toHaveValue("");
    });

    test("primary email failure preserves the draft; honeypot makes no request", async ({ page }) => {
      let calls = 0;
      await page.route("https://api.emailjs.com/**", async (route) => { calls++; await route.fulfill({ status: 500, body: "Delivery failed" }); });
      await page.goto("/#contact");
      await page.getByLabel("Your Name", { exact: true }).fill("Test Visitor");
      await page.getByLabel("Your Email", { exact: true }).fill("visitor@example.test");
      await page.getByLabel("Your Message", { exact: true }).fill("Keep this draft.");
      await page.getByRole("button", { name: "Send Message", exact: true }).click();
      await expect(page.getByText("Something went wrong", { exact: true })).toBeVisible();
      await expect(page.getByLabel("Your Message", { exact: true })).toHaveValue("Keep this draft.");
      expect(calls).toBe(1);
      await page.locator("#company-website").evaluate((element) => { element.value = "bot.example"; });
      await page.getByRole("button", { name: "Send Message", exact: true }).click();
      await expect(page.getByText("Please wait a moment", { exact: true })).toBeVisible();
      expect(calls).toBe(1);
    });

    test("review arrows, keyboard, and inline proof work without screenshot links", async ({ page }) => {
      await page.goto("/#reviews");
      const carousel = page.getByRole("region", { name: "Client reviews", exact: true });
      await expect(carousel.locator("a")).toHaveCount(0);
      await expect(carousel.getByRole("img", { name: "Upwork feedback for AI Automations and Engineering", exact: true })).toBeVisible();
      await carousel.getByRole("button", { name: "Next review", exact: true }).click();
      await expect(carousel.getByRole("group", { name: "2 of 3", exact: true })).toBeVisible();
      await page.keyboard.press("ArrowRight");
      await expect(carousel.getByRole("group", { name: "3 of 3", exact: true })).toBeVisible();
      await expect(carousel.getByRole("group", { name: "3 of 3", exact: true }).getByText('"Honest, talented freelancer"')).toBeVisible();
      await carousel.getByRole("button", { name: "Next review", exact: true }).click();
      await expect(carousel.getByRole("group", { name: "1 of 3", exact: true })).toBeVisible();
    });

    test("chat preserves conversation on outside click and handles quotas", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Chat with Udara's assistant", exact: true }).click();
      const dialog = page.getByRole("dialog", { name: "Udara's AI Assistant", exact: true });
      await expect(dialog).toBeVisible();
      await dialog.getByRole("button", { name: "Automate my business", exact: true }).click();
      await expect(dialog.getByText(/Udara builds AI agents/)).toBeVisible();
      await page.getByRole("heading", { level: 1 }).click();
      await expect(dialog).toHaveCount(0);
      await page.getByRole("button", { name: "Chat with Udara's assistant", exact: true }).click();
      await expect(dialog.getByText(/Udara builds AI agents/)).toBeVisible();
      await page.route("**/api/chat", (route) => route.fulfill({ status: 429, json: { error: "You have reached today's chat allowance.", code: "CHAT_RATE_LIMITED" } }));
      await dialog.getByRole("textbox", { name: "Your message" }).fill("Another question");
      await dialog.getByRole("button", { name: "Send message", exact: true }).click();
      await expect(dialog.getByRole("alert")).toContainText("today's chat allowance");
      await expect(dialog.getByRole("textbox", { name: "Your message" })).toHaveValue("Another question");
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
    });
  });
}
