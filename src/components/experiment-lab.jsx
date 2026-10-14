"use client";

import { useEffect, useRef, useState } from "react";
import GridStudy from "./grid-study";

const studies = [
  {
    id: "field",
    title: "Magnetic field",
    category: "Interaction / 001",
    description:
      "An invisible force, made visible. Drag through the field or use the arrow keys to pull its particles into new patterns.",
    tags: ["SVG", "Pointer interaction", "Mathematics"],
  },
  {
    id: "type",
    title: "Type, untamed",
    category: "Typography / 002",
    description:
      "Words don’t have to sit still. Write something, bend the baseline, and turn a sentence into a composition.",
    tags: ["Typography", "SVG", "React"],
  },
  {
    id: "grid",
    title: "Order & chaos",
    category: "Generative design / 003",
    description:
      "A small set of rules. A lot of possibilities. Explore density, color, and evolving variations in the original grid study.",
    tags: ["Generative design", "React", "CSS"],
  },
];

function MagneticField() {
  const [point, setPoint] = useState({ x: 550, y: 260 });
  const [strength, setStrength] = useState(70);
  const [repel, setRepel] = useState(false);
  const frame = useRef(null);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function move(event) {
    if (
      event.pointerType === "touch" &&
      !event.currentTarget.hasPointerCapture(event.pointerId)
    )
      return;
    const svg = event.currentTarget.querySelector("svg");
    const matrix = svg.getScreenCTM();
    if (!matrix) return;
    const cursor = svg.createSVGPoint();
    cursor.x = event.clientX;
    cursor.y = event.clientY;
    const local = cursor.matrixTransform(matrix.inverse());
    const next = {
      x: Math.max(0, Math.min(1100, local.x)),
      y: Math.max(0, Math.min(520, local.y)),
    };
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => setPoint(next));
  }

  function keyboard(event) {
    const offsets = {
      ArrowLeft: [-35, 0],
      ArrowRight: [35, 0],
      ArrowUp: [0, -35],
      ArrowDown: [0, 35],
    };
    if (!offsets[event.key]) return;
    event.preventDefault();
    const [x, y] = offsets[event.key];
    setPoint((p) => ({
      x: Math.max(0, Math.min(1100, p.x + x)),
      y: Math.max(0, Math.min(520, p.y + y)),
    }));
  }

  return (
    <div className="field-study">
      <div
        className="field-surface"
        tabIndex={0}
        role="group"
        aria-label="Interactive magnetic field. Drag or use arrow keys to move the force."
        onKeyDown={keyboard}
        onPointerMove={move}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          move(event);
        }}
      >
        <svg
          viewBox="0 0 1100 520"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label={`Magnetic field, ${repel ? "repelling" : "attracting"}, strength ${strength}, force position ${Math.round(point.x)}, ${Math.round(point.y)}`}
        >
          <defs>
            <radialGradient id="field-glow">
              <stop stopColor="#c8f77c" stopOpacity=".13" />
              <stop offset="1" stopColor="#c8f77c" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={point.x} cy={point.y} r="230" fill="url(#field-glow)" />
          {Array.from({ length: 220 }, (_, i) => {
            const x = 46 + (i % 22) * 48;
            const y = 44 + Math.floor(i / 22) * 48;
            const dx = point.x - x;
            const dy = point.y - y;
            const force =
              ((Math.exp(-(dx * dx + dy * dy) / 46000) * strength) / 100) *
              (repel ? -1.15 : 0.86);
            const px = x + dx * force;
            const py = y + dy * force;
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={y}
                  x2={px}
                  y2={py}
                  stroke="#c8f77c"
                  strokeOpacity=".18"
                />
                <circle
                  cx={px}
                  cy={py}
                  r={2 + Math.abs(force) * 2.8}
                  fill="#c8f77c"
                  opacity={0.35 + Math.abs(force) * 0.65}
                />
              </g>
            );
          })}
          <circle
            cx={point.x}
            cy={point.y}
            r="11"
            fill="none"
            stroke="#e0ffad"
            strokeOpacity=".6"
          />
          <path
            d={`M${point.x - 4} ${point.y}h8M${point.x} ${point.y - 4}v8`}
            stroke="#e0ffad"
          />
        </svg>
        <div className="field-caption" aria-hidden="true">
          <span>FIELD NOTES / 001</span>
          <span>DRAG TO DISTURB ↗</span>
        </div>
      </div>
      <div className="lab-controls">
        <label htmlFor="field-strength">
          Force <output>{strength}%</output>
          <input
            id="field-strength"
            type="range"
            min="0"
            max="100"
            value={strength}
            onChange={(e) => setStrength(Number(e.target.value))}
          />
        </label>
        <button
          type="button"
          className="lab-button"
          aria-pressed={repel}
          onClick={() => setRepel((r) => !r)}
        >
          {repel ? "Repel" : "Attract"}
          <span aria-hidden="true">⇄</span>
        </button>
        <button
          type="button"
          className="lab-button"
          onClick={() => {
            cancelAnimationFrame(frame.current);
            setPoint({ x: 550, y: 260 });
            setStrength(70);
            setRepel(false);
          }}
        >
          Reset field <span aria-hidden="true">↺</span>
        </button>
      </div>
    </div>
  );
}

function TypeStudy() {
  const [text, setText] = useState("WHAT IF?");
  const [amplitude, setAmplitude] = useState(22);
  const [phase, setPhase] = useState(0);
  const [outline, setOutline] = useState(false);
  const letters = Array.from(text || " ");
  return (
    <div className="type-study">
      <div className="type-surface">
        <span className="type-caption">TYPE SPECIMEN / 002</span>
        <svg
          viewBox="0 0 1100 520"
          role="img"
          aria-label={`Typography composition: ${text || "empty"}, bend ${amplitude}, variation ${phase}, ${outline ? "outline" : "solid"}`}
        >
          <path d="M45 260H1055" stroke="#ad526950" strokeDasharray="3 8" />
          {letters.map((letter, i) => {
            const spacing = Math.min(105, 870 / letters.length);
            const wave = Math.sin(i * 0.7 + phase * 0.8);
            return (
              <text
                key={i}
                x={550 + (i - (letters.length - 1) / 2) * spacing}
                y={280 + wave * amplitude}
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${wave * amplitude * 0.3} ${550 + (i - (letters.length - 1) / 2) * spacing} ${280 + wave * amplitude})`}
                fill={outline ? "none" : "#5d2035"}
                stroke="#5d2035"
                strokeWidth={outline ? 1.5 : 0}
                fontFamily="Arial, sans-serif"
                fontWeight="800"
                fontSize={Math.min(125, 1050 / letters.length)}
              >
                {letter}
              </text>
            );
          })}
        </svg>
        <span className="type-bottom">NO STRAIGHT LINES REQUIRED.</span>
      </div>
      <div className="lab-controls type-controls">
        <label className="type-input-label" htmlFor="type-text">
          Your words
          <input
            id="type-text"
            type="text"
            maxLength={16}
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
        </label>
        <label htmlFor="type-bend">
          Bend <output>{amplitude}</output>
          <input
            id="type-bend"
            type="range"
            min="0"
            max="90"
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
          />
        </label>
        <button
          type="button"
          className="lab-button"
          aria-pressed={outline}
          onClick={() => setOutline((o) => !o)}
        >
          Outline <span aria-hidden="true">◯</span>
        </button>
        <button
          type="button"
          className="lab-button"
          onClick={() => setPhase((p) => p + 1)}
        >
          Remix <span aria-hidden="true">↺</span>
        </button>
      </div>
    </div>
  );
}

export default function ExperimentLab() {
  const [active, setActive] = useState("field");
  const study = studies.find((s) => s.id === active);
  return (
    <>
      <div className="lab-index" role="group" aria-label="Choose an experiment">
        {studies.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={`lab-selector lab-selector-${item.id}`}
            aria-pressed={active === item.id}
            aria-controls="lab-stage"
            onClick={() => setActive(item.id)}
          >
            <span className="lab-selector-number">0{i + 1}</span>
            <span className="lab-selector-title">
              {item.title}
              <small>
                {
                  [
                    "Move the invisible.",
                    "Break the baseline.",
                    "Make your own rules.",
                  ][i]
                }
              </small>
            </span>
            <svg
              className="lab-selector-arrow"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 19L19 5M5 5h14v14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        ))}
      </div>
      <article
        className="experiment lab-experiment"
        id="lab-stage"
        aria-label={study.title}
      >
        <div key={active} className="lab-stage">
          {active === "field" ? (
            <MagneticField />
          ) : active === "type" ? (
            <TypeStudy />
          ) : (
            <GridStudy />
          )}
        </div>
        <div className="experiment-info">
          <div>
            <p className="project-meta">{study.category}</p>
            <h2>
              {study.title}
              <span className="title-dot">.</span>
            </h2>
          </div>
          <div>
            <p>{study.description}</p>
            <ul className="tags" aria-label="Technologies">
              {study.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </>
  );
}
