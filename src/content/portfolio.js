// Replace these empty fields with your real details before sending applications.
export const profile = {
  name: "Jonathan Walther",
  role: "",
  location: "",
  email: "",
  cvUrl: "", // Place your PDF in public/cv.pdf and set this to '/cv.pdf'.
  experience: [], // { role, company, period, description }
  education: [], // { qualification, institution, period }
  skills: [],
};

export const projects = [
  {
    title: "Portfolio / 01",
    category: "Web development",
    year: "2026",
    description:
      "A focused archive of projects, interactive experiments, and a CV. Built with Next.js and React.",
    stack: ["Next.js", "React", "CSS"],
    source: "https://github.com/walthemort/portfolio",
    brief:
      "Make work easy to evaluate: give projects, experiments, and a CV their own space, with clear navigation and no filler.",
    approach:
      "Static pages for projects and CV, with small interactive components for the creative lab, project artwork, and appearance controls. Responsive layouts, keyboard navigation, and reduced-motion support.",
    result:
      "A working portfolio with three dedicated routes, three playable experiments, expressive project artwork, and a CV layout ready for personal details.",
  },
];
