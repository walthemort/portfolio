import test from "node:test";
import assert from "node:assert/strict";
import {
  STUDIO_IDEAS,
  STUDIO_GROUPS,
  studioDefaults,
  sanitizeStudio,
  cellularWorld,
} from "../../src/lib/studio.js";
test("all 100 ideas have stable identities, unique scenes, and ten complete collections", () => {
  assert.equal(STUDIO_IDEAS.length, 100);
  assert.equal(new Set(STUDIO_IDEAS.map((i) => i.scene)).size, 100);
  for (const group of STUDIO_GROUPS)
    assert.equal(STUDIO_IDEAS.filter((i) => i.group === group).length, 10);
  for (const idea of STUDIO_IDEAS) {
    assert.deepEqual(
      sanitizeStudio(studioDefaults(idea.id)),
      studioDefaults(idea.id),
    );
    assert.ok(idea.description.length > 20);
  }
  assert.equal(STUDIO_IDEAS.filter((i) => i.local).length, 10);
});
test("shared state bounds untrusted controls, text, points, and history positions", () => {
  const s = sanitizeStudio({
    id: 999,
    amount: -20,
    x: Infinity,
    y: 200,
    palette: 9,
    word: "x".repeat(200),
    points: [[NaN, 4], [1, 2], ["3", 4], ...Array(90).fill([200, -30])],
    step: 2000,
  });
  assert.equal(s.id, 100);
  assert.equal(s.amount, 0);
  assert.equal(s.x, 50);
  assert.equal(s.y, 100);
  assert.equal(s.palette, 3);
  assert.equal(s.word.length, 36);
  assert.equal(s.points.length, 80);
  assert.deepEqual(s.points[0], [100, 0]);
  assert.equal(s.step, 500);
});
test("cellular world is deterministic, evolves, and bounds costly generation requests", () => {
  assert.deepEqual(cellularWorld(19, 6), cellularWorld(19, 6));
  assert.notDeepEqual(cellularWorld(19, 0), cellularWorld(19, 1));
  assert.deepEqual(cellularWorld(19, 1000), cellularWorld(19, 100));
  assert.equal(cellularWorld(19, 2).length, 484);
  assert.ok(cellularWorld(19, 2).every((v) => typeof v === "boolean"));
});
