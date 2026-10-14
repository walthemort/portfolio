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
    slug: "portfolio",
    featured: true,
    featuredOrder: 1,
    title: "Portfolio / 01",
    focus: "Interface design & development",
    cover: {
      src: "/projects/portfolio-desktop.png",
      alt: "Desktop view of Jonathan Walther’s portfolio with its project layout and new ribbon logo.",
      width: 1440,
      height: 1050,
    },
    screenshots: [
      {
        src: "/projects/portfolio-desktop.png",
        alt: "The portfolio homepage on desktop.",
        caption: "01 / Selected work — desktop layout",
        width: 1440,
        height: 1050,
      },
      {
        src: "/projects/portfolio-lab.png",
        alt: "The creative lab with the magnetic particle field selected.",
        caption: "02 / Experiments — a playable creative lab",
        width: 1440,
        height: 1400,
      },
      {
        src: "/projects/portfolio-mobile.png",
        alt: "The portfolio homepage on a narrow mobile screen.",
        caption: "03 / Selected work — mobile layout",
        width: 390,
        height: 844,
      },
    ],
    decisions: [
      {
        title: "Lead with the work",
        text: "Keep the site to Projects, Experiments, and CV. Limit the homepage to five selected projects, with the complete archive one click away.",
      },
      {
        title: "Make experimentation tangible",
        text: "Turn creative ideas into things visitors can actually use: a magnetic field, a typography composer, and a generative grid.",
      },
      {
        title: "Keep motion considerate",
        text: "Use short page entrances and direct feedback. Provide pause controls for continuous motion and honor system reduced-motion preferences.",
      },
      {
        title: "Treat appearance as a system",
        text: "Use shared Paper and Ink appearances across navigation, project pages, and the CV. Store the selected appearance locally.",
      },
    ],
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
      "A working portfolio with a selected-project homepage, a complete archive, individual case studies, three playable experiments, and a CV layout ready for personal details.",
  },
];
