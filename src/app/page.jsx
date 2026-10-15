import StudioInvitation from "../components/studio-invitation";
import Link from "next/link";
import ProjectList from "../components/project-list";
import { getHomepageProjects } from "../lib/projects";
import { projects } from "../content/portfolio";

export default function Page() {
  const featuredProjects = getHomepageProjects(projects);
  return (
    <main tabIndex={-1} id="main" className="page-shell">
      <div className="page-heading">
        <span className="chapter-number" aria-hidden="true">
          01
        </span>
        <div>
          <p className="kicker">
            <span className="square" />
            01 / Selected work
          </p>
          <h1>
            Projects<span className="title-dot">.</span>
          </h1>
        </div>
        <p className="heading-note">
          A closer look at the work.
          <br />
          The decisions, the details, the result.
        </p>
      </div>
      <div className="section-rule">
        <span>Selected projects</span>
        <span>
          {String(featuredProjects.length).padStart(2, "0")} project
          {featuredProjects.length === 1 ? "" : "s"}
        </span>
      </div>
      <ProjectList items={featuredProjects} />
      <div className="project-archive-link">
        <div>
          <p className="kicker">The complete collection</p>
          <p>
            {projects.length} project{projects.length === 1 ? "" : "s"} in the
            archive.
          </p>
        </div>
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
      <StudioInvitation />
    </main>
  );
}
