import { routeMetadata } from "../../lib/site";
import StudioInvitation from "../../components/studio-invitation";
import ExperimentLab from "../../components/experiment-lab";

export const metadata = routeMetadata({
  title: "Experiments",
  description:
    "Seven creative tools and a studio of 100 interactive interpretations.",
  path: "/experiments",
});

export default function Experiments() {
  return (
    <main tabIndex={-1} id="main" className="page-shell">
      <div className="page-heading">
        <span className="chapter-number" aria-hidden="true">
          02
        </span>
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
        <span>07 playable studies</span>
      </div>
      <StudioInvitation />
      <ExperimentLab />
    </main>
  );
}
