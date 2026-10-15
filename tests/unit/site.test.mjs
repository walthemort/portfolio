import test from "node:test";
import assert from "node:assert/strict";
import { getSiteUrl, routeMetadata, safeJsonLd } from "../../src/lib/site.js";
test("production metadata is conditional on an explicitly configured origin", () => {
  const previous = process.env.SITE_URL;
  try {
    delete process.env.SITE_URL;
    assert.equal(getSiteUrl(), null);
    assert.equal(routeMetadata({ title: "Work" }).alternates, undefined);
    process.env.SITE_URL = "javascript:alert(1)";
    assert.equal(getSiteUrl(), null);
    process.env.SITE_URL = "https://portfolio.test/path";
    assert.equal(getSiteUrl().toString(), "https://portfolio.test/");
    assert.equal(
      routeMetadata({
        title: "Work",
        path: "/projects/portfolio",
        social: "portfolio",
      }).alternates.canonical.toString(),
      "https://portfolio.test/projects/portfolio",
    );
  } finally {
    if (previous === undefined) delete process.env.SITE_URL;
    else process.env.SITE_URL = previous;
  }
});
test("structured data cannot terminate its script element and still round trips", () => {
  const original = { name: "</script><script>alert(1)</script>&>" };
  const serialized = safeJsonLd(original);
  assert(!serialized.includes("<"));
  assert.deepEqual(JSON.parse(serialized), original);
});
