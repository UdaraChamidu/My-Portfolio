import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

test("all 13 wallpapers have valid local mobile and desktop JPEG assets", async () => {
  const component = await readFile(new URL("../src/components/DynamicBackground.jsx", import.meta.url), "utf8");
  const ids = [...component.matchAll(/https:\/\/images\.unsplash\.com\/(photo-[^?]+)\?/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, 13);
  const directory = new URL("../public/wallpapers/", import.meta.url);
  assert.equal((await readdir(directory)).filter((file) => file.endsWith(".jpg")).length, 26);
  for (const id of ids) {
    for (const width of [960, 1920]) {
      const bytes = await readFile(new URL(`${id}-${width}.jpg`, directory));
      assert.ok(bytes.length > 1000, `${id} ${width} is empty`);
      assert.equal(bytes.readUInt16BE(0), 0xffd8, `${id} ${width} must be a JPEG`);
      assert.equal(bytes.readUInt16BE(bytes.length - 2), 0xffd9);
    }
  }
});
