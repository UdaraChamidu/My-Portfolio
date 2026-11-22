import test from "node:test";
import assert from "node:assert/strict";
import { advanceHeadline, heroHeadlines, headlineTiming, initialHeadlineFrame } from "../src/data/heroHeadlines.js";

test("four concise two-line headlines retain the original primary message", () => {
  assert.equal(heroHeadlines.length, 4);
  assert.equal(heroHeadlines[0].join(" "), "Turn your ideas into intelligent solutions.");
  for (const lines of heroHeadlines) {
    assert.equal(lines.length, 2);
    assert.ok(lines.every((line) => line.trim() === line && line.length > 0));
  }
  assert.deepEqual(headlineTiming, { typing: 75, holding: 3000, fading: 250 });
});

test("typewriter reveals one character per step, holds complete text, fades, and loops", () => {
  let frame = initialHeadlineFrame;
  for (let index = 0; index < heroHeadlines.length; index++) {
    const text = heroHeadlines[index].join(" ");
    assert.equal(frame.index, index);
    assert.equal(frame.characters, 0);
    for (let characters = 1; characters <= text.length; characters++) {
      frame = advanceHeadline(frame);
      assert.equal(frame.characters, characters);
      assert.equal(frame.phase, characters === text.length ? "holding" : "typing");
    }
    frame = advanceHeadline(frame);
    assert.equal(frame.phase, "fading");
    assert.equal(frame.characters, text.length);
    frame = advanceHeadline(frame);
    assert.equal(frame.phase, "typing");
  }
  assert.deepEqual(frame, initialHeadlineFrame);
});
