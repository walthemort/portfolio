import GridStudy from "../../components/grid-study";

export const metadata = { title: "Experiments" };

export default function Experiments() {
  return (
    <main id="main" className="page-shell">
      <div className="page-heading">
        <div>
          <p className="kicker">
            <span className="square" />
            02 / The playground
          </p>
          <h1>
            Experiments<span className="title-dot">.</span>
          </h1>
        </div>
        <p className="heading-note">
          Small ideas, made tangible.
          <br />A space to try things out.
        </p>
      </div>
      <div className="section-rule">
        <span>Interactive studies</span>
        <span>01 experiment</span>
      </div>
      <article className="experiment">
        <GridStudy />
        <div className="experiment-info">
          <div>
            <p className="project-meta">001 / Creative coding</p>
            <h2>Order, with a little chaos.</h2>
          </div>
          <div>
            <p>
              A generative composition built from a simple grid. Change the
              density, choose a palette, or create another variation.
            </p>
            <ul className="tags" aria-label="Technologies">
              <li>React</li>
              <li>Generative design</li>
              <li>CSS</li>
            </ul>
          </div>
        </div>
      </article>
    </main>
  );
}
