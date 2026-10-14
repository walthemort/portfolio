import ExperimentLab from "../../components/experiment-lab";

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
          Move things. Break patterns.
          <br />
          See what happens.
        </p>
      </div>
      <div className="section-rule">
        <span>Interactive studies</span>
        <span>03 playable studies</span>
      </div>
      <ExperimentLab />
    </main>
  );
}
