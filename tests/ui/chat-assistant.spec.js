import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";

for (const width of [390, 1440]) {
  test(`waving assistant opens and preserves chat at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    let requests = 0;
    await page.route("**/api/chat", (route) => {
      requests++;
      return route.fulfill({ json: { text: "I can help with AI automation projects." } });
    });
    await page.goto("/");
    const launcher = page.getByRole("button", { name: "Chat with Udara's assistant", exact: true });
    await expect(launcher).toBeVisible();
    await expect(page.locator(".chat-assistant-wave")).toHaveCSS("animation-name", "chat-assistant-wave");
    await expect(page.locator(".chat-assistant-wave")).toHaveCSS("animation-duration", "8s");
    await expect(page.locator(".chat-assistant-avatar")).toHaveCSS("transform", width < 768 ? "matrix(0.9, 0, 0, 0.9, 0, 0)" : "matrix(1.15, 0, 0, 1.15, 0, 0)");
    const bounds = await launcher.boundingBox();
    expect(bounds.width).toBe(width < 768 ? 56 : 72);
    expect(width - bounds.x - bounds.width).toBe(width < 768 ? 16 : 24);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
    await launcher.focus();
    await expect(page.locator(".chat-launcher-label")).toHaveCSS("opacity", "1");
    await mkdir(".browser-qa", { recursive: true });
    for (const theme of ["dark", "light"]) {
      if (theme === "light") await page.getByRole("button", { name: "Use light theme", exact: true }).first().click();
      await page.screenshot({ path: `.browser-qa/chat-agent-${width}-${theme}.png`, clip: { x: width - 290, y: 760, width: 290, height: 140 } });
    }
    expect(requests).toBe(0);
    await launcher.click();
    const dialog = page.getByRole("dialog", { name: "Udara's AI Assistant" });
    await expect(dialog).toBeVisible();
    await expect(page.locator(".chat-assistant-avatar")).toHaveCount(0);
    await dialog.getByRole("textbox", { name: "Your message" }).fill("Help me automate my business");
    await dialog.getByRole("button", { name: "Send message" }).click();
    await expect(dialog.getByRole("log")).toContainText("I can help with AI automation projects.");
    expect(requests).toBe(1);
    await page.mouse.click(10, 100);
    await expect(dialog).toHaveCount(0);
    await launcher.click();
    await expect(dialog.getByRole("log")).toContainText("I can help with AI automation projects.");
    await page.keyboard.press("Escape");
    await expect(launcher).toBeFocused();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator(".chat-assistant-wave")).toHaveCSS("animation-name", "none");
    await expect(page.locator(".chat-assistant-avatar")).toHaveCSS("animation-name", "none");
  });
}
