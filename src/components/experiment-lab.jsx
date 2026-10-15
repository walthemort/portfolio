import Link from "next/link";
import { EXPERIMENTS } from "../lib/experiments";
import ExperimentWorkbench from "./experiment-workbench";
export default function ExperimentLab({ initialId = "field" }) {
  const study = EXPERIMENTS.find((e) => e.id === initialId) || EXPERIMENTS[0];
  return (
    <>
      <nav
        className="lab-index expanded-lab-index"
        aria-label="Choose an experiment"
      >
        {EXPERIMENTS.map((item, i) => (
          <Link
            key={item.id}
            href={`/experiments/${item.id}`}
            className="lab-selector"
            aria-current={study.id === item.id ? "page" : undefined}
          >
            <span className="lab-selector-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="lab-selector-title">
              {item.title}
              <small>{item.hint}</small>
            </span>
          </Link>
        ))}
      </nav>
      <article className="experiment lab-experiment" aria-label={study.title}>
        <ExperimentWorkbench key={study.id} study={study} />
        <div className="experiment-info">
          <div>
            <p className="project-meta">
              {String(EXPERIMENTS.indexOf(study) + 1).padStart(3, "0")} /
              Interactive study
            </p>
            <h2>
              {study.title}
              <span className="title-dot">.</span>
            </h2>
          </div>
          <div>
            <p>{study.description}</p>
            <ul className="tags" aria-label="Technologies">
              {study.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </>
  );
}
