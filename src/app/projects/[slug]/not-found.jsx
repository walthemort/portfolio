import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main tabIndex={-1} id="main" className="page-shell">
      <p className="kicker">Project archive / 404</p>
      <h1>
        Not found<span className="title-dot">.</span>
      </h1>
      <p className="detail-intro">This project isn’t in the archive.</p>
      <Link className="archive-button" href="/projects">
        Back to all projects
      </Link>
    </main>
  );
}
