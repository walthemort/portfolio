import test from "node:test";
import assert from "node:assert/strict";
import {
  getHomepageProjects,
  ARCHIVE_DEFAULTS,
  filterProjects,
  archiveQuery,
  readArchiveFilters,
  relatedProjects,
  readingMinutes,
} from "../../src/lib/projects.js";
const fixture = Array.from({ length: 8 }, (_, i) => ({
  slug: `p-${i}`,
  title: `Project ${i}`,
  description: i % 2 ? "An interface" : "A landscape",
  stack: i % 2 ? ["React"] : ["SVG"],
  category: i % 2 ? "Web" : "Creative coding",
  year: String(2020 + i),
  featured: i !== 1,
  featuredOrder: i === 6 ? 1 : i === 7 ? 2 : undefined,
}));
test("featured selection respects exclusion, rank and five-item cap without mutating the archive", () => {
  const before = JSON.stringify(fixture);
  assert.deepEqual(
    getHomepageProjects(fixture).map((p) => p.slug),
    ["p-6", "p-7", "p-0", "p-2", "p-3"],
  );
  assert.equal(JSON.stringify(fixture), before);
  assert.deepEqual(getHomepageProjects([]), []);
});
test("search, discipline, technology and ordering combine and leave the archive intact", () => {
  const result = filterProjects(fixture, {
    ...ARCHIVE_DEFAULTS,
    q: "INTERFACE",
    technology: "React",
    category: "Web",
    sort: "oldest",
  });
  assert.deepEqual(
    result.map((p) => p.slug),
    ["p-1", "p-3", "p-5", "p-7"],
  );
  assert.equal(
    filterProjects(fixture, { ...ARCHIVE_DEFAULTS, q: "not present" }).length,
    0,
  );
  assert.equal(fixture.length, 8);
});
test("shareable archive state round trips and unsupported values fall back safely", () => {
  const state = {
    q: "a & b",
    technology: "React",
    category: "Web",
    sort: "title",
    view: "list",
  };
  assert.deepEqual(
    readArchiveFilters(new URLSearchParams(archiveQuery(state))),
    state,
  );
  assert.equal(
    readArchiveFilters(new URLSearchParams("sort=broken&view=bad")).sort,
    "newest",
  );
});
test("related work excludes the current project and prioritizes relevant work", () => {
  const related = relatedProjects(fixture, fixture[0]);
  assert.equal(related.length, 3);
  assert(
    related.every((p) => p.slug !== fixture[0].slug && p.stack.includes("SVG")),
  );
  assert.deepEqual(relatedProjects([fixture[0]], fixture[0]), []);
  assert(readingMinutes({ description: "word ".repeat(450) }) >= 3);
});
