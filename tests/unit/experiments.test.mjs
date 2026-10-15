import test from "node:test";
import assert from "node:assert/strict";
import {
  EXPERIMENTS,
  defaultSettings,
  sanitizeSettings,
  parseExperimentState,
  experimentQuery,
  historyChange,
  historyUndo,
  historyRedo,
  contrastRatio,
  mixColors,
  experimentPresets,
  noise,
} from "../../src/lib/experiments.js";
test("seven distinct studies have repeatable, shareable presets", () => {
  assert.equal(new Set(EXPERIMENTS.map((s) => s.id)).size, 7);
  for (const study of EXPERIMENTS) {
    const state = defaultSettings(study.id);
    assert.deepEqual(
      parseExperimentState(
        study.id,
        new URLSearchParams(experimentQuery(state)),
      ),
      state,
    );
    assert.equal(experimentPresets(study.id).length, 3);
  }
  assert.equal(noise(7, 2), noise(7, 2));
});
test("untrusted URL state is bounded, validated, and resilient to malformed input", () => {
  const state = sanitizeSettings("drawing", {
    force: 999,
    x: -1,
    text: "<script>".repeat(100),
    palette: "__proto__",
    color: "red",
    strokes: [
      {
        color: "#000000",
        width: 999,
        points: [
          [9999, -5],
          [NaN, Infinity],
        ],
      },
    ],
  });
  assert.equal(state.force, 100);
  assert.equal(state.x, 0);
  assert.equal(state.text.length, 16);
  assert.equal(state.palette, "orange");
  assert.equal(state.color, "#31583d");
  assert.deepEqual(state.strokes[0].points, [[1100, 0]]);
  assert.equal(state.strokes[0].width, 30);
  assert.deepEqual(
    parseExperimentState("grid", new URLSearchParams("state=broken")),
    defaultSettings("grid"),
  );
  assert.deepEqual(
    parseExperimentState(
      "grid",
      new URLSearchParams({ state: "x".repeat(12001) }),
    ),
    defaultSettings("grid"),
  );
});
test("undo and redo restore complete compositions and a new action clears redo", () => {
  const original = defaultSettings("type");
  let h = { past: [], present: original, future: [] };
  h = historyChange(h, { ...original, text: "HELLO" });
  h = historyChange(h, { ...h.present, bend: 80 });
  h = historyUndo(h);
  assert.equal(h.present.bend, 22);
  assert.equal(h.present.text, "HELLO");
  h = historyRedo(h);
  assert.equal(h.present.bend, 80);
  h = historyChange(historyUndo(h), { ...original, text: "NEW" });
  assert.equal(h.future.length, 0);
  for (let i = 0; i < 100; i++) h = historyChange(h, { ...h.present, seed: i });
  assert.equal(h.past.length, 40);
});
test("WCAG contrast and blends match reference values", () => {
  assert.equal(contrastRatio("#000000", "#ffffff"), 21);
  assert.equal(contrastRatio("#ffffff", "#ffffff"), 1);
  assert.equal(mixColors("#000000", "#ffffff", 0.5), "#808080");
  assert(contrastRatio("#17251a", "#e4efc9") >= 7);
});
