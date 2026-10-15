import Link from "next/link";
import Image from "next/image";
import PortfolioArtwork from "./portfolio-artwork";

export default function ProjectList({ items }) {
  return (
    <div className="project-list">
      {items.map((project, index) => (
        <article className="project" key={project.slug || project.title}>
          {project.cover ? (
            <Link
              href={`/projects/${project.slug}`}
              className="project-cover"
              aria-label={`Read ${project.title} case study`}
            >
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                width={project.cover.width}
                height={project.cover.height}
                sizes="(max-width: 650px) 100vw, 60vw"
              />
              <span className="project-cover-label" aria-hidden="true">
                Explore the case study <span>↗</span>
              </span>
            </Link>
          ) : (
            <PortfolioArtwork />
          )}
          <div className="project-copy">
            <div className="project-meta">
              <span>
                {String(index + 1).padStart(2, "0")} / {project.category}
              </span>
              <span>
                {project.year}
                {project.status ? ` / ${project.status}` : ""}
              </span>
            </div>
            <h2>
              {project.slug ? (
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              ) : (
                project.title
              )}
            </h2>
            <p className="project-description">{project.description}</p>
            <ul className="tags" aria-label="Technologies">
              {project.stack.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="project-links">
              {project.slug && (
                <Link
                  className="case-study-link"
                  href={`/projects/${project.slug}`}
                >
                  Read case study{" "}
                  <svg
                    className="arrow-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 12h16M13 5l7 7-7 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </Link>
              )}
              {project.source && (
                <a
                  className="text-link"
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source{" "}
                  <svg
                    className="arrow-icon"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 19L19 5M5 5h14v14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
            <details className="case-study">
              <summary>
                Project notes{" "}
                <span className="details-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="case-study-content">
                {[
                  ["The brief", project.brief],
                  ["The approach", project.approach],
                  ["The result", project.result],
                ].map(([label, value]) => (
                  <div key={label}>
                    <h3>{label}</h3>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </article>
      ))}
    </div>
  );
}
