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
