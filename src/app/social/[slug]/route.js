import { ImageResponse } from "next/og";
import { projects, profile } from "../../../content/portfolio";
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: "site" }, ...projects.map((p) => ({ slug: p.slug }))];
}
export async function GET(request, { params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (slug !== "site" && !project)
    return new Response("Not found", { status: 404 });
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#191b18",
        color: "#f0f0e5",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "70px",
      }}
    >
      <div style={{ display: "flex", fontSize: 26 }}>{profile.name}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            color: "#d6f28c",
            fontSize: 20,
            letterSpacing: 3,
          }}
        >
          {project
            ? project.category.toUpperCase()
            : "PROJECTS / EXPERIMENTS / CV"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: project ? 84 : 94,
            letterSpacing: -4,
            lineHeight: 1.08,
          }}
        >
          {project ? project.title : "A little work. A lot of curiosity."}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #414638",
          paddingTop: 26,
          fontSize: 19,
          color: "#c9cdbf",
        }}
      >
        <span>
          {project ? project.stack.join(" / ") : "Personal portfolio"}
        </span>
        <span>{project ? project.year : "Jonathan Walther"}</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
