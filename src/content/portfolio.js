// Replace these empty fields with your real details before sending applications.
export const profile = {
  name: "Jonathan Walther",
  role: "",
  location: "",
  email: "",
  github: "https://github.com/walthemort",
  linkedin: "",
  cvUrl: "", // Place your PDF in public/cv.pdf and set this to '/cv.pdf'.
  experience: [], // { role, company, period, description }
  education: [], // { qualification, institution, period }
  skills: [],
};

export const projects = [
  {
    slug: "portfolio",
    status: "In progress",
    video: {
      title: "Generative grid: density, palette, variation, and export",
      src: "/projects/portfolio-demo.webm",
      captions: "/projects/portfolio-demo.vtt",
      poster: "/projects/portfolio-grid-demo.png",
    },
    comparison: {
      before: {
        src: "/projects/portfolio-lab-type.png",
        alt: "The original three-study creative lab.",
        width: 1440,
        height: 1400,
      },
      after: {
        src: "/projects/portfolio-lab-expanded.png",
        alt: "The expanded seven-study creative lab with sharing and export controls.",
        width: 1440,
        height: 1400,
      },
    },
    contribution:
      "Personal portfolio direction, iterative review, and content curation by Jonathan Walther; implementation developed with AI assistance.",
    collaborators: [
      {
        name: "Jonathan Walther",
        contribution: "Creative direction, feedback, and portfolio curation.",
      },
      {
        name: "AI-assisted development",
        contribution: "Implementation and verification under iterative review.",
      },
    ],
    outcomes: [
      {
        text: "A complete archive with individual project case studies.",
        href: "/projects",
        label: "Explore the archive",
      },
      {
        text: "A creative lab with playable interface experiments.",
        href: "/experiments",
        label: "Try the lab",
      },
    ],
    timeline: [
      {
        date: "2026-10-14",
        title: "Next.js foundation",
        text: "Established Projects, Experiments, and CV as the core sections.",
      },
      {
        date: "2026-10-15",
        title: "Typography and case studies",
        text: "Introduced text-only branding, real screenshots, and individual case studies.",
      },
    ],
    tradeoffs: [
      "Static content keeps the site portable and avoids a database, but publishing content changes currently requires a code update.",
      "A maximum of five featured projects keeps the homepage focused; the archive remains complete.",
    ],
    lessons: [
      "Direct manipulation communicates an experiment better than a decorative preview alone.",
      "Treating typography and appearance as shared systems keeps very different pages coherent.",
    ],
    nextSteps: [
      "Add verified career details and work from beyond this portfolio.",
      "Evaluate the site with hiring managers using real project content.",
    ],
    updates: [
      {
        date: "2026-10-15",
        title: "Portfolio expansion",
        text: "Added project discovery, case-study tools, and an expanded creative lab.",
      },
    ],
    architecture: [
      { title: "Shared content", text: "Verified profile and project data" },
      { title: "Next.js pages", text: "Projects, case studies, and CV" },
      {
        title: "Interactive components",
        text: "Creative lab and visitor preferences",
      },
    ],
    featured: true,
    featuredOrder: 1,
    title: "Portfolio / 01",
    focus: "Interface design & development",
    cover: {
      src: "/projects/portfolio-desktop-type.png",
      alt: "Desktop view of Jonathan Walther’s portfolio with typographic branding.",
      width: 1440,
      height: 1050,
    },
    screenshots: [
      {
        src: "/projects/portfolio-desktop-type.png",
        alt: "The portfolio homepage on desktop.",
        caption: "01 / Selected work — desktop layout",
        width: 1440,
        height: 1050,
      },
      {
        src: "/projects/portfolio-lab-type.png",
        alt: "The creative lab with the magnetic particle field selected.",
        caption: "02 / Experiments — a playable creative lab",
        width: 1440,
        height: 1400,
      },
      {
        src: "/projects/portfolio-mobile-type.png",
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
      "A working portfolio with a selected-project homepage, a complete archive, individual case studies, seven playable experiments, and a CV layout ready for personal details.",
  },
];
