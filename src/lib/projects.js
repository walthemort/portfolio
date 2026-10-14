export const HOMEPAGE_PROJECT_LIMIT = 5;

// Array order determines which projects appear on the homepage.
export function getHomepageProjects(projects) {
  return projects.slice(0, HOMEPAGE_PROJECT_LIMIT);
}
