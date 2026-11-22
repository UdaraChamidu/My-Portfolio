export const heroHeadlines = [
  ["Turn your ideas into", "intelligent solutions."],
  ["Automate work", "with intelligent AI."],
  ["Let AI voice agents", "handle your calls."],
  ["Bring your AI ideas", "to life."],
];

export const headlineTiming = { typing: 75, holding: 3000, fading: 250 };
export const initialHeadlineFrame = { index: 0, characters: 0, phase: "typing" };

export function advanceHeadline(frame) {
  if (frame.phase === "holding") return { ...frame, phase: "fading" };
  if (frame.phase === "fading") {
    return { index: (frame.index + 1) % heroHeadlines.length, characters: 0, phase: "typing" };
  }
  const characters = Math.min(frame.characters + 1, heroHeadlines[frame.index].join(" ").length);
  return { ...frame, characters, phase: characters === heroHeadlines[frame.index].join(" ").length ? "holding" : "typing" };
}
