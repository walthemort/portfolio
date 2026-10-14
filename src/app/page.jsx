const projects = [
  { title: 'Your first project', category: 'Web development', description: 'Describe what you built, the problem it solves, and your contribution.' },
  { title: 'Your next idea', category: 'Design & development', description: 'Add another project here to show your approach and the skills you bring.' },
];

export default function Page() {
  return <>
    <header><a className="logo" href="#home">Portfolio<span>.</span></a><nav aria-label="Main navigation"><a href="#projects">Projects</a><a href="#about">About</a><a href="#contact">Contact</a></nav></header>
    <main>
      <section id="home" className="hero"><p className="eyebrow">Your name · Developer & creator</p><h1>Turning ideas into<br/><span>thoughtful experiences.</span></h1><p className="intro">Welcome to my portfolio. I build useful things for the web, with care for the details that make them feel great.</p><a className="button" href="#projects">Explore my work ↗</a></section>
      <section id="projects"><div className="section-heading"><h2>Selected work</h2><span>01 — Projects</span></div><div className="projects">{projects.map((project, i) => <article key={project.title}><div className="project-art" aria-hidden="true"><span>0{i + 1}</span></div><p className="eyebrow">{project.category}</p><h3>{project.title}</h3><p>{project.description}</p></article>)}</div></section>
      <section id="about" className="about"><p className="eyebrow">02 — About</p><h2>Curious by nature.<br/>Intentional by design.</h2><p>Use this space to tell your story: what you enjoy building, what you are learning, and what you would like to work on next.</p><ul className="skills"><li>React</li><li>JavaScript</li><li>CSS</li><li>Creative thinking</li></ul></section>
      <section id="contact" className="contact"><p className="eyebrow">03 — Contact</p><h2>Let’s build something.</h2><p>Add your contact details and social links here when you are ready to share your work.</p></section>
    </main><footer>© {new Date().getFullYear()} Your name</footer>
  </>;
}
