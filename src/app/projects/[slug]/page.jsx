import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../../content/portfolio";

function ExternalArrow() {
  return (
    <svg className="arrow-icon" aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M5 19L19 5M5 5h14v14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects
    .filter((project) => project.slug)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return { title: project.title, description: project.description };
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const gallery = (project.screenshots || []).filter(
    (image) => image.src !== project.cover?.src,
  );
  return (
    <main id="main" className="page-shell project-detail">
      <Link className="detail-back" href="/projects">
        ← All projects
      </Link>
      <div className="detail-heading">
        <p className="kicker">
          <span className="square" />
          01 / Project case study
        </p>
        <h1>
          {project.title}
          <span className="title-dot">.</span>
        </h1>
        <p className="detail-intro">{project.description}</p>
      </div>
      <div className="detail-overview">
        <dl>
          <div>
            <dt>Category</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          {project.focus && (
            <div>
              <dt>Focus</dt>
              <dd>{project.focus}</dd>
            </div>
          )}
          <div>
            <dt>Built with</dt>
            <dd>{project.stack.join(" / ")}</dd>
          </div>
        </dl>
        <div className="detail-actions">
          {project.source && (
            <a
              className="archive-button"
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              View source <ExternalArrow />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          {project.demo && (
            <a
              className="archive-button"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo <ExternalArrow />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
      {project.cover && (
        <figure className="case-hero">
          <div className="screenshot-chrome" aria-hidden="true">
            <span />
            <span />
            <span />
            <p>{project.title} / Desktop</p>
          </div>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 650px) 100vw, 90vw"
            priority
          />
          <figcaption>Selected interface / Desktop capture</figcaption>
        </figure>
      )}
      <div className="case-narrative">
        {[
          ["01", "The problem", project.brief],
          ["02", "The approach", project.approach],
        ].map(([number, title, text]) => (
          <section className="case-section" key={title}>
            <div>
              <span className="case-number">{number}</span>
              <h2>{title}</h2>
            </div>
            <p>{text}</p>
          </section>
        ))}
        {!!project.decisions?.length && (
          <section className="case-section">
            <div>
              <span className="case-number">03</span>
              <h2>Key decisions</h2>
            </div>
            <div className="decision-list">
              {project.decisions.map((decision) => (
                <article key={decision.title}>
                  <h3>{decision.title}</h3>
                  <p>{decision.text}</p>
                </article>
              ))}
            </div>
          </section>
        )}
        {gallery.length > 0 && (
          <section
            className="case-gallery-section"
            aria-labelledby="gallery-heading"
          >
            <div className="section-rule">
              <span>Interface gallery</span>
              <span>Desktop & mobile</span>
            </div>
            <h2 id="gallery-heading" className="sr-only">
              Project screenshots
            </h2>
            <div className="case-gallery">
              {gallery.map((image) => (
                <figure
                  className={
                    image.height > image.width
                      ? "mobile-capture"
                      : "desktop-capture"
                  }
                  key={image.src}
                >
                  <a
                    href={image.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${image.alt} Open full-size image in a new tab.`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 650px) 100vw, 65vw"
                    />
                  </a>
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
        <section className="case-section">
          <div>
            <span className="case-number">04</span>
            <h2>The result</h2>
          </div>
          <p>{project.result}</p>
        </section>
      </div>
      <div className="case-end">
        <p className="kicker">Back to the collection</p>
        <Link className="archive-button" href="/projects">
          View all projects{" "}
          <svg className="arrow-icon" aria-hidden="true" viewBox="0 0 24 24">
            <path
              d="M4 12h16M13 5l7 7-7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </Link>
      </div>
    </main>
  );
}
