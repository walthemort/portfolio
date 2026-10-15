import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { STUDIO_IDEAS } from "../../src/lib/studio.js";
import { readFile } from "node:fs/promises";
async function open(page, id = 1) {
  await page.goto(`/experiments/studio?study=${id}`);
  await expect(page.locator(".creative-studio")).toHaveAttribute(
    "data-ready",
    "true",
  );
  await expect(page.locator(".studio-caption h3")).toHaveText(
    STUDIO_IDEAS[id - 1].title,
  );
}
test("all 100 studies render and respond without browser errors", async ({
  page,
}) => {
  test.setTimeout(120000);
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await open(page);
  await expect(page.locator(".studio-card")).toHaveCount(100);
  for (const idea of STUDIO_IDEAS) {
    await expect(page.locator(".studio-caption h3")).toHaveText(idea.title);
    await expect(page.locator(".studio-art")).toBeVisible();
    await page
      .getByRole("slider", { name: "Horizontal", exact: true })
      .fill("63");
    await expect(
      page.getByRole("slider", { name: "Horizontal", exact: true }),
    ).toHaveValue("63");
    if (idea.id < 100)
      await page
        .getByRole("button", { name: "Next study →", exact: true })
        .click();
  }
  expect(errors).toEqual([]);
});
test("composition history, direct manipulation, persistent favorites, and real exports", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await open(page, 23);
  const stage = page.getByRole("group", { name: "Interactive composition" });
  await stage.focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await expect(page.locator(".studio-art polyline")).toHaveCount(0);
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await expect(page.locator(".studio-art polyline")).toHaveCount(1);
  await page.getByRole("button", { name: "Undo", exact: true }).click();
  await expect(page.locator(".studio-art polyline")).toHaveCount(0);
  await page.getByRole("button", { name: "Redo", exact: true }).click();
  await expect(page.locator(".studio-art polyline")).toHaveCount(1);
  await page.getByRole("button", { name: "☆ Save study", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "★ Saved", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".studio-art polyline")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Copy composition link", exact: true })
    .click();
  const url = await page.evaluate(() => navigator.clipboard.readText());
  expect(url).toContain("composition=");
  await page.goto(url);
  await expect(page.locator(".studio-caption h3")).toHaveText(
    "Objects remember",
  );
  for (const kind of ["SVG", "PNG"]) {
    const promise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: `Export ${kind}`, exact: true })
      .click();
    const download = await promise;
    const data = await readFile(await download.path());
    if (kind === "PNG")
      expect(data.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    else expect(data.toString()).toContain("<svg");
  }
  await expect(
    page.getByRole("button", { name: "Play", exact: true }),
  ).toBeDisabled();
});
test("catalog search, local collaboration, shortlist, print, and opt-in audio", async ({
  page,
}) => {
  await open(page, 80);
  await page
    .getByRole("button", { name: "Save portfolio to shortlist", exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByRole("button", {
      name: "Remove portfolio from shortlist",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("searchbox", { name: "Search studies" }).fill("coral");
  await expect(page.locator(".studio-card")).toHaveCount(1);
  await page.locator(".studio-card-open").click();
  await expect(page.locator(".studio-caption h3")).toHaveText("Coral garden");
  await open(page, 81);
  await expect(page.locator(".studio-local-note")).toContainText(
    "no public feed",
  );
  await page
    .getByRole("button", { name: "Pass to the next person", exact: true })
    .click();
  await expect(page.locator(".studio-context")).toContainText("Local turn 2");
  await open(page, 94);
  await expect(
    page.getByRole("button", { name: "Enable sound", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "Enable sound", exact: true }).click();
  await page.getByRole("button", { name: "Play C", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Disable sound", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", { name: "Disable sound", exact: true })
    .click();
  await open(page, 75);
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".studio-print-sheet")).toBeVisible();
  await expect(page.locator(".studio-console")).toBeHidden();
});
for (const theme of ["paper", "ink"])
  test(`studio accessibility and responsive bounds in ${theme}`, async ({
    page,
  }) => {
    await open(page, 72);
    if (theme === "ink")
      await page.getByRole("button", { name: /Switch to ink/i }).click();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
    for (const width of [375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  });
