import PortfolioArtwork from "./portfolio-artwork";

export default function ProjectList({ items }) {
  return (
    <div className="project-list">
      {items.map((project, index) => (
        <article className="project" key={project.title}>
          <PortfolioArtwork />
          <div className="project-copy">
            <div className="project-meta">
              <span>
                {String(index + 1).padStart(2, "0")} / {project.category}
              </span>
              <span>{project.year}</span>
            </div>
            <h2>{project.title}</h2>
            <p className="project-description">{project.description}</p>
            <ul className="tags" aria-label="Technologies">
              {project.stack.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="project-links">
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
