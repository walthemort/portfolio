import Link from "next/link";
import CreativeStudio from "../../../components/creative-studio";
import { routeMetadata } from "../../../lib/site";
export const metadata = routeMetadata({
  title: "100 possibilities",
  description:
    "One hundred interactive interpretations of physics, typography, light, living systems, and portfolio ideas.",
  path: "/experiments/studio",
});
export default function Studio() {
  return (
    <main id="main" tabIndex={-1} className="page-shell studio-page">
      <div className="studio-page-heading">
        <Link className="text-link" href="/experiments">
          ← Back to experiments
        </Link>
        <p className="kicker">
          Jonathan Walther / Experimental studio / Vol. 01
        </p>
      </div>
      <CreativeStudio />
    </main>
  );
}
