"use client";
import { useEffect, useState } from "react";
import ProjectList from "./project-list";
import {
  ARCHIVE_DEFAULTS,
  readArchiveFilters,
  archiveQuery,
  filterProjects,
} from "../lib/projects";

export default function ProjectExplorer({ projects }) {
  const [filters, setFilters] = useState(ARCHIVE_DEFAULTS);
  useEffect(() => {
    const read = () =>
      setFilters(
        readArchiveFilters(new URLSearchParams(window.location.search)),
      );
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);
  function change(patch) {
    const next = { ...filters, ...patch };
    setFilters(next);
    const query = archiveQuery(next);
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`,
    );
  }
  const results = filterProjects(projects, filters);
  return (
    <>
      <form
        className="archive-filters"
        role="search"
        aria-label="Search projects"
        onSubmit={(e) => e.preventDefault()}
      >
        <label>
          Search projects
          <input
            type="search"
            value={filters.q}
            onChange={(e) => change({ q: e.target.value })}
            placeholder="Name, idea, or technology"
          />
        </label>
        <label>
          Technology
          <select
            value={filters.technology}
            onChange={(e) => change({ technology: e.target.value })}
          >
            <option value="">All technologies</option>
            {[...new Set(projects.flatMap((p) => p.stack))].sort().map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          Discipline
          <select
            value={filters.category}
            onChange={(e) => change({ category: e.target.value })}
          >
            <option value="">All disciplines</option>
            {[...new Set(projects.map((p) => p.category))].sort().map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          Sort by
          <select
            value={filters.sort}
            onChange={(e) => change({ sort: e.target.value })}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title">Title A–Z</option>
          </select>
        </label>
      </form>
      <div className="results-toolbar">
        <p role="status">
          {results.length} of {projects.length} project
          {projects.length === 1 ? "" : "s"}
        </p>
        <div role="group" aria-label="Project view">
          <button
            type="button"
            aria-pressed={filters.view === "grid"}
            onClick={() => change({ view: "grid" })}
          >
            Grid
          </button>
          <button
            type="button"
            aria-pressed={filters.view === "list"}
            onClick={() => change({ view: "list" })}
          >
            List
          </button>
        </div>
      </div>
      {results.length ? (
        <div className="archive-results" data-view={filters.view}>
          <ProjectList items={results} />
        </div>
      ) : (
        <div className="no-results">
          <h2>No matching projects.</h2>
          <p>
            Try another word or clear the filters to see the complete archive.
          </p>
          <button
            className="archive-button"
            type="button"
            onClick={() => change(ARCHIVE_DEFAULTS)}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
