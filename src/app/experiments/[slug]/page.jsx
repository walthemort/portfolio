import { routeMetadata } from "../../../lib/site";
import { notFound } from "next/navigation";
import ExperimentLab from "../../../components/experiment-lab";
import { EXPERIMENTS } from "../../../lib/experiments";
export const dynamicParams = false;
export function generateStaticParams() {
  return EXPERIMENTS.map((study) => ({ slug: study.id }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = EXPERIMENTS.find((e) => e.id === slug);
  if (!study) notFound();
  return routeMetadata({
    title: study.title,
    description: study.description,
    path: `/experiments/${slug}`,
  });
}
export default async function Study({ params }) {
  const { slug } = await params;
  const study = EXPERIMENTS.find((e) => e.id === slug);
  if (!study) notFound();
  return (
    <main tabIndex={-1} id="main" className="page-shell">
      <div className="page-heading">
        <span className="chapter-number" aria-hidden="true">
          02
        </span>
        <div>
          <p className="kicker">
            <span className="square" />
            02 / Creative lab
          </p>
          <h1 className="experiment-detail-title">
            {study.title}
            <span className="title-dot">.</span>
          </h1>
        </div>
      </div>
      <ExperimentLab initialId={slug} />
    </main>
  );
}
