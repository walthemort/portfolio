import { getSiteUrl, isPreview } from "../lib/site";
export default function robots() {
  const base = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      ...(base && !isPreview() ? { allow: "/" } : { disallow: "/" }),
    },
    ...(base && !isPreview()
      ? { sitemap: new URL("/sitemap.xml", base).toString() }
      : {}),
  };
}
