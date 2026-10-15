import { routeMetadata, getSiteUrl, safeJsonLd } from "../../../lib/site";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../../content/portfolio";
import { readingMinutes, relatedProjects } from "../../../lib/projects";
import {
  SectionHeading,
  ScreenshotGallery,
  ImageComparison,
} from "../../../components/case-tools";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return routeMetadata({
    title: p.title,
    description: p.description,
    path: `/projects/${p.slug}`,
    social: p.slug,
  });
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const gallery = (project.screenshots || []).filter(
    (i) => i.src !== project.cover?.src,
  );
  const related = relatedProjects(projects, project);
  const index = projects.findIndex((p) => p.slug === slug);
  const previous = projects[index - 1];
  const next = projects[index + 1];
  const sections = [
    ["problem", "The problem"],
    ["approach", "The approach"],
    ...(project.contribution ? [["contribution", "Contribution"]] : []),
    ...(project.decisions?.length ? [["decisions", "Key decisions"]] : []),
    ...(project.tradeoffs?.length
      ? [["tradeoffs", "Tradeoffs & constraints"]]
      : []),
    ...(project.architecture?.length ? [["architecture", "Architecture"]] : []),
    ...(gallery.length ? [["screenshots", "Screenshots"]] : []),
    ...(project.comparison ? [["comparison", "Before & after"]] : []),
    ...(project.video ? [["demo", "Demo video"]] : []),
    ...(project.timeline?.length ? [["timeline", "Timeline"]] : []),
    ["result", "The result"],
    ...(project.lessons?.length ? [["lessons", "Lessons learned"]] : []),
    ...(project.updates?.length ? [["updates", "Project updates"]] : []),
  ];
  function Section({ id, title, children }) {
    return (
      <section className="case-section" aria-labelledby={id}>
        <SectionHeading id={id}>{title}</SectionHeading>
        <div className="case-section-body">{children}</div>
      </section>
    );
  }
  return (
    <main tabIndex={-1} id="main" className="page-shell project-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            creator: { "@type": "Person", name: "Jonathan Walther" },
            keywords: project.stack,
            ...(getSiteUrl()
              ? {
                  url: new URL(
                    `/projects/${project.slug}`,
                    getSiteUrl(),
                  ).toString(),
                }
              : {}),
            ...(project.source ? { codeRepository: project.source } : {}),
          }),
        }}
      />
      <Link className="detail-back" href="/projects">
        ← All projects
      </Link>
      <div className="detail-heading">
        <p className="kicker">
          <span className="square" />
          01 / Project case study · {readingMinutes(project)} min read
        </p>
        <h1>
          {project.title}
          <span className="title-dot">.</span>
        </h1>
        <p className="detail-intro">{project.description}</p>
      </div>
      <div className="detail-overview">
        <dl>
          {[
            ["Category", project.category],
            ["Year", project.year],
            ["Status", project.status],
            ["Focus", project.focus],
            ["Built with", project.stack.join(" / ")],
          ]
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
        </dl>
        <div className="detail-actions">
          {[
            [project.source, "View source"],
            [project.demo, "Live demo"],
          ]
            .filter(([url]) => url)
            .map(([url, label]) => (
              <a
                key={label}
                className="archive-button"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
        </div>
      </div>
      <nav className="case-contents" aria-label="Case study contents">
        {sections.map(([id, title]) => (
          <a key={id} href={`#${id}`}>
            {title}
          </a>
        ))}
      </nav>
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
            sizes="(max-width:650px) 100vw,90vw"
            priority
          />
          <figcaption>Selected interface / Desktop capture</figcaption>
        </figure>
      )}
      <div className="case-narrative">
        <Section id="problem" title="The problem">
          <p>{project.brief}</p>
        </Section>
        <Section id="approach" title="The approach">
          <p>{project.approach}</p>
        </Section>
        {project.contribution && (
          <Section id="contribution" title="Contribution">
            <p>{project.contribution}</p>
            {project.collaborators?.length > 0 && (
              <ul className="collaborators">
                {project.collaborators.map((c) => (
                  <li key={c.name}>
                    <strong>{c.name}</strong>
                    <p>{c.contribution}</p>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        )}
        {!!project.decisions?.length && (
          <Section id="decisions" title="Key decisions">
            <div className="decision-list">
              {project.decisions.map((d) => (
                <article key={d.title}>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </article>
              ))}
            </div>
          </Section>
        )}
        {!!project.tradeoffs?.length && (
          <Section id="tradeoffs" title="Tradeoffs & constraints">
            <ul className="case-bullets">
              {project.tradeoffs.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Section>
        )}
        {!!project.architecture?.length && (
          <Section id="architecture" title="Architecture">
            <ol
              className="architecture-diagram"
              aria-label="Project architecture"
            >
              {project.architecture.map((node) => (
                <li key={node.title}>
                  <strong>{node.title}</strong>
                  <p>{node.text}</p>
                </li>
              ))}
            </ol>
          </Section>
        )}
        {gallery.length > 0 && (
          <section
            className="case-gallery-section"
            aria-labelledby="screenshots"
          >
            <SectionHeading id="screenshots">Screenshots</SectionHeading>
            <ScreenshotGallery images={gallery} />
          </section>
        )}
        {project.comparison && (
          <Section id="comparison" title="Before & after">
            <p>
              Two real iterations of the creative lab. Drag the divider to
              compare.
            </p>
            <ImageComparison comparison={project.comparison} />
          </Section>
        )}
        {project.video && (
          <Section id="demo" title="Demo video">
            <video
              className="case-video"
              controls
              preload="metadata"
              poster={project.video.poster}
              aria-label={project.video.title}
            >
              <source src={project.video.src} type="video/webm" />
              <track
                kind="captions"
                src={project.video.captions}
                srcLang="en"
                label="English"
                default
              />
              Your browser does not support video playback.
            </video>
            <p>{project.video.title}</p>
          </Section>
        )}
        {!!project.timeline?.length && (
          <Section id="timeline" title="Timeline">
            <ol className="project-timeline">
              {project.timeline.map((t) => (
                <li key={`${t.date}-${t.title}`}>
                  <time dateTime={t.date}>{t.date}</time>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </li>
              ))}
            </ol>
          </Section>
        )}
        <Section id="result" title="The result">
          <p>{project.result}</p>
          {project.outcomes?.length > 0 && (
            <ul className="case-bullets">
              {project.outcomes.map((o) => (
                <li key={o.text}>
                  {o.text}
                  {o.href && (
                    <>
                      {" "}
                      <Link href={o.href}>{o.label || "See evidence"} →</Link>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Section>
        {!!project.lessons?.length && (
          <Section id="lessons" title="Lessons learned">
            <ul className="case-bullets">
              {project.lessons.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {!!project.nextSteps?.length && (
              <>
                <h3>What comes next</h3>
                <ul className="case-bullets">
                  {project.nextSteps.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </>
            )}
          </Section>
        )}
        {!!project.updates?.length && (
          <Section id="updates" title="Project updates">
            {project.updates.map((u) => (
              <article key={`${u.date}-${u.title}`}>
                <time dateTime={u.date}>{u.date}</time>
                <h3>{u.title}</h3>
                <p>{u.text}</p>
              </article>
            ))}
          </Section>
        )}
      </div>
      {related.length > 0 && (
        <section className="related-projects">
          <h2>Related projects</h2>
          {related.map((p) => (
            <Link
              className="archive-button"
              href={`/projects/${p.slug}`}
              key={p.slug}
            >
              {p.title}
            </Link>
          ))}
        </section>
      )}
      <nav className="project-pagination" aria-label="More case studies">
        {previous && (
          <Link href={`/projects/${previous.slug}`}>← {previous.title}</Link>
        )}
        {next && <Link href={`/projects/${next.slug}`}>{next.title} →</Link>}
      </nav>
      <div className="case-end">
        <p className="kicker">Back to the collection</p>
        <Link className="archive-button" href="/projects">
          View all projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
