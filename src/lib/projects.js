export const HOMEPAGE_PROJECT_LIMIT = 5;

// Explicit featuredOrder wins; array order is the fallback. false hides only from home.
export function getHomepageProjects(projects) {
  return projects
    .filter((project) => project.featured !== false)
    .sort(
      (a, b) => (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity),
    )
    .slice(0, HOMEPAGE_PROJECT_LIMIT);
}

export const ARCHIVE_DEFAULTS = {
  q: "",
  technology: "",
  category: "",
  sort: "newest",
  view: "grid",
};
export function readArchiveFilters(params) {
  return {
    q: (params.get("q") || "").slice(0, 120),
    technology: (params.get("technology") || "").slice(0, 80),
    category: (params.get("category") || "").slice(0, 80),
    sort: ["newest", "oldest", "title"].includes(params.get("sort"))
      ? params.get("sort")
      : "newest",
    view: params.get("view") === "list" ? "list" : "grid",
  };
}
export function archiveQuery(filters) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters))
    if (value && value !== ARCHIVE_DEFAULTS[key]) params.set(key, value);
  return params.toString();
}
export function filterProjects(projects, filters) {
  const query = filters.q.trim().toLocaleLowerCase();
  return projects
    .filter(
      (project) =>
        (!query ||
          `${project.title} ${project.description} ${project.stack.join(" ")}`
            .toLocaleLowerCase()
            .includes(query)) &&
        (!filters.technology || project.stack.includes(filters.technology)) &&
        (!filters.category || project.category === filters.category),
    )
    .sort((a, b) =>
      filters.sort === "title"
        ? a.title.localeCompare(b.title)
        : filters.sort === "oldest"
          ? Number(a.year) - Number(b.year)
          : Number(b.year) - Number(a.year),
    );
}
export function readingMinutes(project) {
  const text = [
    project.description,
    project.brief,
    project.approach,
    project.result,
    project.contribution,
    ...(project.decisions || []).flatMap((d) => [d.title, d.text]),
    ...(project.lessons || []),
    ...(project.tradeoffs || []),
    ...(project.nextSteps || []),
    ...(project.timeline || []).flatMap((item) => [item.title, item.text]),
    ...(project.updates || []).flatMap((item) => [item.title, item.text]),
    ...(project.collaborators || []).flatMap((item) => [
      item.name,
      item.contribution,
    ]),
  ].join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}
export function relatedProjects(projects, project) {
  return projects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({
      project: p,
      score:
        p.stack.filter((t) => project.stack.includes(t)).length +
        (p.category === project.category ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.project);
}
