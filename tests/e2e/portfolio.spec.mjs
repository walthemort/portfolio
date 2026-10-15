import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
import { EXPERIMENTS } from "../../src/lib/experiments.js";

async function ready(page, path) {
  await page.goto(path);
  if (path.includes("experiments"))
    await expect(page.locator(".workbench")).toHaveAttribute(
      "data-ready",
      "true",
    );
}
test("hiring journey, archive state, and full case study", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await ready(page, "/");
  await expect(page.locator(".identity")).toHaveText("Jonathan Walther");
  expect(
    await page.locator(".project-list .project").count(),
  ).toBeLessThanOrEqual(5);
  await page
    .getByRole("link", { name: "View all projects", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
  await page
    .getByRole("searchbox", { name: "Search projects" })
    .fill("not-present");
  await expect(
    page.getByRole("heading", { name: "No matching projects." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page
    .getByRole("combobox", { name: "Technology", exact: true })
    .selectOption("React");
  await page
    .getByRole("combobox", { name: "Discipline", exact: true })
    .selectOption("Web development");
  await page
    .getByRole("combobox", { name: "Sort by", exact: true })
    .selectOption("title");
  await page.getByRole("button", { name: "List", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "List", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("combobox", { name: "Technology", exact: true }),
  ).toHaveValue("React");
  await page
    .getByRole("link", { name: "Read case study", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects\/portfolio$/);
  for (const name of [
    "Contribution",
    "Tradeoffs & constraints",
    "Architecture",
    "Timeline",
    "Lessons learned",
  ])
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
  await page
    .getByRole("button", { name: "Copy link to The problem", exact: true })
    .click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toMatch(/#problem$/);
  const trigger = page
    .getByRole("button", { name: /Enlarge screenshot/ })
    .first();
  await trigger.click();
  await expect(
    page.getByRole("dialog", { name: "Project screenshot viewer" }),
  ).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lightbox-toolbar p")).toContainText("2 /");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.getByRole("slider", { name: "Compare versions" }).fill("70");
  const video = page.locator("video");
  await video.scrollIntoViewIfNeeded();
  await video.evaluate(async (node) => {
    node.muted = true;
    await node.play();
  });
  await expect
    .poll(() => video.evaluate((node) => node.currentTime))
    .toBeGreaterThan(0.2);
  await video.evaluate((node) => node.pause());
  await expect(video.locator('track[kind="captions"]')).toHaveAttribute(
    "src",
    "/projects/portfolio-demo.vtt",
  );
  await expect(page.locator(".comparison output")).toHaveText("70% after");
  await page
    .getByRole("link", { name: "View all projects", exact: true })
    .click();
  await ready(page, "/cv");
  await expect(
    page.getByRole("heading", { name: "Jonathan Walther", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Download CV" })).toHaveCount(0);
});
for (const study of EXPERIMENTS)
  test(`${study.id}: presets, history and shareable state`, async ({
    page,
  }) => {
    await ready(page, `/experiments/${study.id}`);
    await expect(page.locator('.lab-index a[aria-current="page"]')).toHaveText(
      new RegExp(study.title),
    );
    await page
      .getByRole("combobox", { name: "Preset", exact: true })
      .selectOption("1");
    await expect(
      page.getByRole("button", { name: "Undo", exact: true }),
    ).toBeEnabled();
    await page.getByRole("button", { name: "Undo", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "Redo", exact: true }),
    ).toBeEnabled();
    await page.getByRole("button", { name: "Redo", exact: true }).click();
    await expect
      .poll(() => new URL(page.url()).searchParams.has("state"))
      .toBe(true);
    const before = await page
      .locator(".interactive-canvas svg")
      .getAttribute("aria-label");
    await page.reload();
    await expect(page.locator(".workbench")).toHaveAttribute(
      "data-ready",
      "true",
    );
    await expect(page.locator(".interactive-canvas svg")).toHaveAttribute(
      "aria-label",
      before,
    );
  });
test("grid composition links and real SVG/PNG downloads", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await ready(page, "/experiments/grid");
  await page.getByRole("slider", { name: "Density", exact: true }).fill("35");
  await page
    .getByRole("combobox", { name: "Palette", exact: true })
    .selectOption("blue");
  await page.getByRole("button", { name: "New variation" }).click();
  await page.getByRole("button", { name: "Copy composition link" }).click();
  const shared = await page.evaluate(() => navigator.clipboard.readText());
  expect(new URL(shared).pathname).toBe("/experiments/grid");
  const state = JSON.parse(new URL(shared).searchParams.get("state"));
  expect(state.density).toBe(35);
  expect(state.palette).toBe("blue");
  for (const type of ["SVG", "PNG"]) {
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: `Export ${type}`, exact: true }).click(),
    ]);
    const bytes = await readFile(await download.path());
    expect(bytes.length).toBeGreaterThan(1000);
    if (type === "SVG") {
      expect(bytes.toString()).toContain("<svg");
      expect(bytes.toString()).toContain("http://www.w3.org/2000/svg");
    } else
      expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  }
  await page.goto(shared);
  await expect(
    page.getByRole("slider", { name: "Density", exact: true }),
  ).toHaveValue("35");
});
test("drawing accepts pointer strokes, keyboard marks and undo/redo", async ({
  page,
}) => {
  await ready(page, "/experiments/drawing");
  const svg = page.locator(".interactive-canvas svg");
  await svg.scrollIntoViewIfNeeded();
  const bounds = await svg.boundingBox();
  await page.mouse.move(
    bounds.x + bounds.width * 0.3,
    bounds.y + bounds.height * 0.4,
  );
  await page.mouse.down();
  await page.mouse.move(
    bounds.x + bounds.width * 0.6,
    bounds.y + bounds.height * 0.6,
    { steps: 8 },
  );
  await page.mouse.up();
  await expect(page.locator(".workbench-header")).toContainText("1 strokes");
  await page.getByRole("button", { name: "Undo", exact: true }).click();
  await expect(page.locator(".workbench-header")).toContainText("0 strokes");
  await page.getByRole("button", { name: "Redo", exact: true }).click();
  await expect(page.locator(".workbench-header")).toContainText("1 strokes");
  await page.getByRole("button", { name: "Add a mark", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".workbench-header")).toContainText("2 strokes");
});
test("field keyboard control and type composition editing", async ({
  page,
}) => {
  await ready(page, "/experiments/field");
  const group = page.getByRole("group", {
    name: "Magnetic field. Drag the force point or use arrow keys.",
  });
  await group.focus();
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(() => new URL(page.url()).searchParams.get("state"))
    .toContain("585");
  await page.getByRole("button", { name: "Attract", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Repel", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await ready(page, "/experiments/type");
  await page.getByRole("textbox", { name: "Your words" }).fill("HELLO");
  await page.getByRole("slider", { name: "Bend", exact: true }).fill("70");
  await page.getByRole("button", { name: "Outline", exact: true }).click();
  await expect(page.locator(".interactive-canvas svg")).toHaveAttribute(
    "aria-label",
    /text HELLO/,
  );
  await expect(
    page.getByRole("button", { name: "Outline", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});
test("contrast, landscape variation and persistent manual motion preference", async ({
  page,
}) => {
  await ready(page, "/experiments/color");
  await page
    .getByRole("combobox", { name: "Preset", exact: true })
    .selectOption("2");
  await expect(page.locator(".contrast-readout")).toContainText(
    "AAA for normal text",
  );
  await ready(page, "/experiments/landscape");
  const before = await page
    .locator(".interactive-canvas svg path")
    .first()
    .getAttribute("d");
  await page.getByRole("button", { name: "New variation" }).click();
  await expect(
    page.locator(".interactive-canvas svg path").first(),
  ).not.toHaveAttribute("d", before);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await ready(page, "/experiments/poster");
  await page.getByRole("button", { name: "Play motion", exact: true }).click();
  await expect
    .poll(() => new URL(page.url()).searchParams.get("state"))
    .toContain('"phase":1');
  await page
    .getByRole("combobox", { name: "Motion", exact: true })
    .selectOption("reduce");
  await expect(
    page.getByRole("button", { name: "Pause motion", exact: true }),
  ).toHaveCount(0);
  await page.reload();
  await expect(
    page.getByRole("combobox", { name: "Motion", exact: true }),
  ).toHaveValue("reduce");
  await expect(
    page.getByRole("button", { name: "Play motion", exact: true }),
  ).toHaveCount(0);
});
for (const theme of ["paper", "ink"])
  test(`accessibility and contrast audit: ${theme}`, async ({ page }) => {
    test.setTimeout(120000);
    await ready(page, "/");
    if (theme === "ink")
      await page.getByRole("button", { name: "Switch to ink theme" }).click();
    for (const path of [
      "/",
      "/projects",
      "/projects/portfolio",
      "/cv",
      "/experiments",
      ...EXPERIMENTS.map((s) => `/experiments/${s.id}`),
    ]) {
      await ready(page, path);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        result.violations,
        `${theme} ${path}: ${JSON.stringify(result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
      ).toEqual([]);
    }
  });
test("responsive layouts and unknown routes", async ({ page, request }) => {
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/projects",
      "/projects/portfolio",
      "/cv",
      ...EXPERIMENTS.map((s) => `/experiments/${s.id}`),
    ]) {
      await ready(page, path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${width} ${path}`,
      ).toBe(true);
    }
  }
  expect((await request.get("/projects/missing-project")).status()).toBe(404);
  expect((await request.get("/experiments/missing-study")).status()).toBe(404);
});
test("social images and draft indexing configuration", async ({ request }) => {
  for (const path of ["/social/site", "/social/portfolio"]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
    const bytes = await response.body();
    expect(bytes.readUInt32BE(16)).toBe(1200);
    expect(bytes.readUInt32BE(20)).toBe(630);
  }
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
});

test("keyboard skip navigation reaches content on every page", async ({
  page,
}) => {
  for (const path of [
    "/",
    "/projects",
    "/projects/portfolio",
    "/cv",
    "/experiments",
    ...EXPERIMENTS.map((s) => `/experiments/${s.id}`),
  ]) {
    await ready(page, path);
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Skip to content", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main#main")).toBeFocused();
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() =>
        document.querySelector("main").contains(document.activeElement),
      ),
      path,
    ).toBe(true);
  }
});
