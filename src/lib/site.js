export function getSiteUrl() {
  try {
    const raw = process.env.SITE_URL;
    if (!raw) return null;
    const url = new URL(raw);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      return null;
    return new URL("/", url);
  } catch {
    return null;
  }
}
export function isPreview() {
  return (
    process.env.VERCEL_ENV === "preview" ||
    process.env.CONTEXT === "deploy-preview"
  );
}
export function routeMetadata({
  title,
  description,
  path = "/",
  social = "site",
}) {
  const base = getSiteUrl();
  return {
    title,
    description,
    ...(base
      ? {
          metadataBase: base,
          alternates: { canonical: new URL(path, base) },
          openGraph: {
            title: title || "Jonathan Walther",
            description,
            url: new URL(path, base),
            siteName: "Jonathan Walther",
            type: "website",
            images: [
              {
                url: new URL(`/social/${social}`, base),
                width: 1200,
                height: 630,
                alt: title || "Jonathan Walther portfolio",
              },
            ],
          },
          twitter: {
            card: "summary_large_image",
            title: title || "Jonathan Walther",
            description,
            images: [new URL(`/social/${social}`, base)],
          },
        }
      : {}),
    ...(isPreview() ? { robots: { index: false, follow: false } } : {}),
  };
}
export function safeJsonLd(value) {
  return JSON.stringify(value).replace(
    /[<>&]/g,
    (char) =>
      String.fromCharCode(92) +
      "u" +
      char.charCodeAt(0).toString(16).padStart(4, "0"),
  );
}
