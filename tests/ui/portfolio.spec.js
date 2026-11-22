import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";

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
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Turn your ideas into intelligent solutions.");
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

test("normal motion remains active, carousel cycles, and only two wallpapers load initially", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const wallpaperRequests = new Set();
  page.on("request", (request) => { if (request.url().includes("images.unsplash.com")) wallpaperRequests.add(request.url()); });
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

    test("review arrows and keyboard work without screenshot links", async ({ page }) => {
      await page.goto("/#reviews");
      const carousel = page.getByRole("region", { name: "Client reviews", exact: true });
      await expect(carousel.locator("a, img")).toHaveCount(0);
      await carousel.getByRole("button", { name: "Next review", exact: true }).click();
      await expect(carousel.getByRole("group", { name: "2 of 3", exact: true })).toBeVisible();
      await page.keyboard.press("ArrowRight");
      await expect(carousel.getByRole("group", { name: "3 of 3", exact: true })).toBeVisible();
      await expect(carousel.getByText('"Honest, talented freelancer"')).toBeVisible();
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
