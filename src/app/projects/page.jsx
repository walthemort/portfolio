import Link from "next/link";
import ProjectList from "../../components/project-list";
import { projects } from "../../content/portfolio";

export const metadata = {
  title: "All projects",
  description: "The complete project archive of Jonathan Walther.",
};

export default function AllProjects() {
  return (
    <main id="main" className="page-shell projects-archive">
      <div className="page-heading">
        <span className="chapter-number" aria-hidden="true">
          01
        </span>
        <div>
          <p className="kicker">
            <span className="square" />
            01 / The complete collection
          </p>
          <h1>
            All projects<span className="title-dot">.</span>
          </h1>
        </div>
        <p className="heading-note">
          Every project, in one place.
          <br />
          Explore the complete archive.
        </p>
      </div>
      <div className="section-rule">
        <Link href="/" className="archive-back">
          ← Back to selected work
        </Link>
        <span>
          {String(projects.length).padStart(2, "0")} project
          {projects.length === 1 ? "" : "s"}
        </span>
      </div>
      <ProjectList items={projects} />
      {projects.length === 0 && (
        <p className="archive-empty">
          New work will appear here as projects are added.
        </p>
      )}
    </main>
  );
}
