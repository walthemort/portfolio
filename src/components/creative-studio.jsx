"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import StudioScene from "./studio-scene";
import { useReducedMotion } from "./motion-preference";
import {
  STUDIO_IDEAS,
  STUDIO_GROUPS,
  STUDIO_PALETTES,
  studioDefaults,
  studioNoise,
  sanitizeStudio,
} from "../lib/studio";
import { projects } from "../content/portfolio";
const STORE = "jw-creative-studio-v1";
const marks = new Set([23, 33, 81]);
const editableWords = new Set([
  29, 32, 33, 34, 35, 36, 37, 38, 39, 40, 53, 56, 57, 83, 87,
]);
const parameterNames = {
  1: "Unfold",
  2: "Tension",
  3: "Zoom",
  4: "Separation",
  5: "Opening",
  6: "Depth",
  7: "Exposure",
  8: "Part the curtain",
  9: "Open the door",
  11: "Layer separation",
  12: "Explode layers",
  13: "Open drawers",
  14: "Tilt",
  15: "Growth",
  19: "Zoom",
  21: "Gravity",
  22: "Elasticity",
  24: "Fan the stack",
  25: "Tension",
  26: "Fluidity",
  28: "Balance",
  29: "Lens size",
  30: "Tear",
  31: "Resolve",
  32: "Height",
  35: "Swing",
  37: "Align",
  39: "Find the angle",
  40: "Elevation",
  41: "Building height",
  42: "Growth",
  43: "Diffusion pattern",
  45: "Cell rounding",
  47: "Growth",
  48: "Branching",
  49: "Erosion",
  53: "Aperture",
  56: "Exposure",
  57: "Separation",
  59: "Time of day",
  60: "Solidify",
  61: "Expression priority",
  63: "Time budget",
  64: "Repair layout",
  66: "Detail level",
  68: "Alternative emphasis",
  69: "Density",
  71: "Unfold",
  74: "Detail level",
  79: "Reveal contributions",
  95: "Turn the card",
  97: "Interference",
  98: "Shape",
  99: "Open curtains",
};
function readLink() {
  try {
    const value = new URLSearchParams(location.search).get("composition");
    return value && value.length < 18000
      ? sanitizeStudio(JSON.parse(value))
      : null;
  } catch {
    return null;
  }
}
function freshState(id) {
  const next = studioDefaults(id);
  if (id === 10) {
    const d = new Date();
    next.seed =
      (d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()) %
      1000000;
  }
  return next;
}
export default function CreativeStudio() {
  const [state, setState] = useState(studioDefaults(1)),
    [ready, setReady] = useState(false),
    [group, setGroup] = useState("All"),
    [query, setQuery] = useState(""),
    [favorites, setFavorites] = useState([]),
    [onlyFavorites, setOnlyFavorites] = useState(false),
    [message, setMessage] = useState(""),
    [playing, setPlaying] = useState(false),
    [sound, setSound] = useState(false),
    [shortlisted, setShortlisted] = useState(false),
    [interest, setInterest] = useState("Interface"),
    [history, setHistory] = useState([]),
    [future, setFuture] = useState([]);
  const saved = useRef({}),
    svgRef = useRef(null),
    stageRef = useRef(null),
    audioRef = useRef(null),
    dragRef = useRef(null),
    visible = useRef(true),
    stateRef = useRef(state),
    soundRef = useRef(false),
    reduced = useReducedMotion();
  const idea = STUDIO_IDEAS[state.id - 1],
    project = projects[0];
  stateRef.current = state;
  soundRef.current = sound;
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(STORE) || "{}");
      saved.current =
        data.scenes && typeof data.scenes === "object" ? data.scenes : {};
      setFavorites(
        Array.isArray(data.favorites)
          ? data.favorites.filter(
              (n) => Number.isInteger(n) && n >= 1 && n <= 100,
            )
          : [],
      );
      setShortlisted(data.shortlisted === true);
      const link = readLink();
      setState(link || sanitizeStudio(data.last || {}));
    } catch {}
    setReady(true);
    const pop = () => {
      const link = readLink();
      const id = Number(new URLSearchParams(location.search).get("study"));
      const next =
        link ||
        (Number.isInteger(id) && id >= 1 && id <= 100
          ? saved.current[id]
            ? sanitizeStudio(saved.current[id])
            : freshState(id)
          : null);
      if (next) {
        setState(next);
        setHistory([]);
        setFuture([]);
        setPlaying(false);
      }
    };
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);
  useEffect(() => {
    if (!ready) return;
    saved.current[state.id] = state;
    try {
      localStorage.setItem(
        STORE,
        JSON.stringify({
          scenes: saved.current,
          last: state,
          favorites,
          shortlisted,
        }),
      );
    } catch {
      setMessage(
        "Storage is unavailable. You can still export or copy this composition.",
      );
    }
  }, [state, favorites, shortlisted, ready]);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!playing || reduced) return;
    const timer = setInterval(() => {
      if (!document.hidden && visible.current)
        setState((s) => ({
          ...s,
          step: (s.step + 1) % 500,
          amount: 50 + Math.sin((s.step + 1) * 0.055) * 45,
        }));
    }, 120);
    return () => clearInterval(timer);
  }, [playing, reduced]);
  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);
  useEffect(
    () => () => {
      audioRef.current?.close().catch(() => {});
    },
    [],
  );
  function change(patch) {
    setPlaying(false);
    setHistory((h) => [...h.slice(-39), stateRef.current]);
    setFuture([]);
    setState((s) => sanitizeStudio({ ...s, ...patch }));
    setMessage("");
  }
  function select(id) {
    saved.current[state.id] = state;
    const next = freshState(id);
    setState(saved.current[id] ? sanitizeStudio(saved.current[id]) : next);
    setHistory([]);
    setFuture([]);
    setPlaying(false);
    setMessage("");
    const url = new URL(location.href);
    url.search = "";
    url.searchParams.set("study", String(id));
    window.history.replaceState(null, "", url);
    stageRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
  }
  // A direct study link is separate from a fully shared composition.
  useEffect(() => {
    if (!ready || readLink()) return;
    const id = Number(new URLSearchParams(location.search).get("study"));
    if (Number.isInteger(id) && id >= 1 && id <= 100)
      setState(
        saved.current[id] ? sanitizeStudio(saved.current[id]) : freshState(id),
      );
  }, [ready]);
  function undo() {
    if (!history.length) return;
    setPlaying(false);
    setFuture((f) => [state, ...f].slice(0, 40));
    setState(history.at(-1));
    setHistory((h) => h.slice(0, -1));
  }
  function redo() {
    if (!future.length) return;
    setPlaying(false);
    setHistory((h) => [...h, state].slice(-40));
    setState(future[0]);
    setFuture((f) => f.slice(1));
  }
  function point(e) {
    const r = e.currentTarget.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)),
      y: Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100)),
    };
  }
  function down(e) {
    if (e.button !== 0) return;
    setPlaying(false);
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = stateRef.current;
    const p = point(e);
    setState((s) => ({
      ...s,
      ...p,
      points: marks.has(s.id) ? [...s.points.slice(-79), [p.x, p.y]] : s.points,
    }));
  }
  function move(e) {
    if (!dragRef.current) return;
    setState((s) => ({ ...s, ...point(e) }));
  }
  function up() {
    if (!dragRef.current) return;
    setHistory((h) => [...h.slice(-39), dragRef.current]);
    setFuture([]);
    dragRef.current = null;
  }
  function key(e) {
    const deltas = {
      ArrowLeft: [-3, 0],
      ArrowRight: [3, 0],
      ArrowUp: [0, -3],
      ArrowDown: [0, 3],
    };
    if (deltas[e.key]) {
      e.preventDefault();
      const [dx, dy] = deltas[e.key];
      change({ x: state.x + dx, y: state.y + dy });
    }
    if ((e.key === " " || e.key === "Enter") && marks.has(state.id)) {
      e.preventDefault();
      change({ points: [...state.points, [state.x, state.y]].slice(-80) });
    }
    if (state.id === 88 && ["a", "d", "j", "l"].includes(e.key.toLowerCase())) {
      e.preventDefault();
      const k = e.key.toLowerCase();
      change(
        k === "a" || k === "d"
          ? { x: state.x + (k === "a" ? -4 : 4) }
          : { y: state.y + (k === "j" ? -4 : 4) },
      );
    }
    if (
      state.id === 94 &&
      "asdfghjk".includes(e.key.toLowerCase()) &&
      e.key.length === 1
    ) {
      e.preventDefault();
      tone("asdfghjk".indexOf(e.key.toLowerCase()));
    }
  }
  async function enableSound() {
    if (sound) {
      setSound(false);
      return;
    }
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) throw Error();
      audioRef.current ||= new Audio();
      await audioRef.current.resume();
      setSound(true);
      setMessage(
        "Sound enabled. Play a note, or focus the stage and use A S D F G H J K.",
      );
    } catch {
      setMessage(
        "Sound is unavailable in this browser. The visual instrument still works.",
      );
    }
  }
  function tone(index = state.step % 8) {
    change({ step: (state.step + 1) % 500, amount: 25 + index * 9 });
    if (!soundRef.current || !audioRef.current) return;
    const audio = audioRef.current;
    if (audio.state !== "running") return;
    const osc = audio.createOscillator(),
      gain = audio.createGain(),
      now = audio.currentTime;
    osc.type = "sine";
    osc.frequency.value =
      220 * Math.pow(2, [0, 2, 4, 5, 7, 9, 11, 12][index % 8] / 12);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.07, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(now);
    osc.stop(now + 0.42);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }
  function download(blob, name) {
    const url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function exportArt(type) {
    try {
      const clone = svgRef.current.cloneNode(true);
      clone.setAttribute("width", "1600");
      clone.setAttribute("height", "960");
      if (state.id === 31) {
        for (const image of clone.querySelectorAll("image")) {
          const response = await fetch(image.getAttribute("href"));
          if (!response.ok) throw Error();
          const blob = await response.blob();
          const embedded = await new Promise((resolve, reject) => {
            const r = new FileReader();
            r.onload = () => resolve(r.result);
            r.onerror = reject;
            r.readAsDataURL(blob);
          });
          image.setAttribute("href", embedded);
        }
      }
      const blob = new Blob([new XMLSerializer().serializeToString(clone)], {
        type: "image/svg+xml",
      });
      if (type === "svg") {
        download(blob, `jw-study-${state.id}.svg`);
      } else {
        const url = URL.createObjectURL(blob);
        try {
          const image = new Image();
          await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
            image.src = url;
          });
          const canvas = document.createElement("canvas");
          canvas.width = 1600;
          canvas.height = 960;
          canvas.getContext("2d").drawImage(image, 0, 0, 1600, 960);
          const png = await new Promise((resolve) =>
            canvas.toBlob(resolve, "image/png"),
          );
          if (!png) throw Error();
          download(png, `jw-study-${state.id}.png`);
        } finally {
          URL.revokeObjectURL(url);
        }
      }
      setMessage(`${type.toUpperCase()} exported.`);
    } catch {
      setMessage("Export failed. Try SVG, or a different browser.");
    }
  }
  async function share() {
    const url = new URL(location.href);
    url.search = "";
    url.searchParams.set("composition", JSON.stringify(state));
    try {
      await navigator.clipboard.writeText(url.href);
      setMessage("Composition link copied.");
    } catch {
      window.history.replaceState(null, "", url);
      setMessage("Copy the composition link from your address bar.");
    }
  }
  function favorite(id = state.id) {
    setFavorites((f) =>
      f.includes(id) ? f.filter((n) => n !== id) : [...f, id],
    );
  }
  function notes() {
    download(
      new Blob(
        [
          `Jonathan Walther — local portfolio shortlist\n\n${shortlisted ? project.title : "No projects saved"}\n${shortlisted ? project.contribution : ""}\n\nFavorite studies:\n${favorites.map((id) => `${id}. ${STUDIO_IDEAS[id - 1].title}`).join("\n")}\n\nThese notes are stored on your device; they are not sent to Jonathan.\n`,
        ],
        { type: "text/plain" },
      ),
      "jonathan-walther-shortlist.txt",
    );
  }
  const results = STUDIO_IDEAS.filter(
    (i) =>
      (group === "All" || i.group === group) &&
      (!onlyFavorites || favorites.includes(i.id)) &&
      `${i.title} ${i.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section
      className="creative-studio"
      data-ready={ready ? "true" : "false"}
      aria-label="100 idea studio"
    >
      <div className="studio-manifesto">
        <p className="kicker">100 possibilities. One playground.</p>
        <h2>
          What if<span>?</span>
        </h2>
        <p>
          A collection of small, strange worlds. Pick one. Pull it apart. Make
          it yours.
        </p>
        <a href="#studio-catalog" className="text-link">
          Explore all 100 studies ↓
        </a>
      </div>
      <div className="studio-console" ref={stageRef}>
        <div className="studio-topline">
          <span>{String(state.id).padStart(3, "0")} / 100</span>
          <span>{idea.group}</span>
          <button
            type="button"
            onClick={() => favorite()}
            aria-pressed={favorites.includes(state.id)}
          >
            {favorites.includes(state.id) ? "★ Saved" : "☆ Save study"}
          </button>
        </div>
        <div
          className="studio-stage"
          tabIndex={0}
          role="group"
          aria-label="Interactive composition"
          aria-describedby="studio-instructions"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={() => {
            if (dragRef.current) setState(dragRef.current);
            dragRef.current = null;
          }}
          onKeyDown={key}
        >
          <StudioScene idea={idea} state={state} svgRef={svgRef} />
          <span
            className="studio-crosshair"
            style={{ left: `${state.x}%`, top: `${state.y}%` }}
            aria-hidden="true"
          />
        </div>
        <div className="studio-caption">
          <div>
            <p className="kicker">
              {idea.local
                ? "Local collaboration prototype"
                : "Interactive interpretation"}
            </p>
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
          </div>
          <p id="studio-instructions">
            Drag the stage or focus it and use arrow keys.
            {marks.has(state.id) &&
              " Tap to place a mark, or press Enter at the current point."}{" "}
            Every control also works from the keyboard.
          </p>
        </div>
        {idea.local && (
          <p className="studio-local-note">
            On this device only. Pass it to someone beside you. There is no
            public feed, remote synchronization, or simulated audience.
          </p>
        )}
        <div className="studio-controls">
          <label className="studio-range">
            {parameterNames[state.id] || "Intensity"}
            <input
              type="range"
              min="0"
              max="100"
              value={state.amount}
              onChange={(e) => change({ amount: Number(e.target.value) })}
            />
            <span aria-hidden="true">{Math.round(state.amount)}</span>
          </label>
          <label className="studio-range">
            Horizontal
            <input
              type="range"
              min="0"
              max="100"
              value={state.x}
              onChange={(e) => change({ x: Number(e.target.value) })}
            />
            <span aria-hidden="true">{Math.round(state.x)}</span>
          </label>
          <label className="studio-range">
            Vertical
            <input
              type="range"
              min="0"
              max="100"
              value={state.y}
              onChange={(e) => change({ y: Number(e.target.value) })}
            />
            <span aria-hidden="true">{Math.round(state.y)}</span>
          </label>
          <label>
            Material palette
            <select
              value={state.palette}
              onChange={(e) => change({ palette: Number(e.target.value) })}
            >
              {STUDIO_PALETTES.map((p, i) => (
                <option value={i} key={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          {editableWords.has(state.id) && (
            <label>
              Your words
              <input
                maxLength={36}
                value={state.word}
                onChange={(e) => change({ word: e.target.value })}
              />
            </label>
          )}
        </div>
        <div className="studio-actions">
          <button
            onClick={() =>
              change({
                step: (state.step + 1) % 500,
                turn: (state.turn + 1) % 101,
                amount: state.amount >= 95 ? 5 : state.amount + 10,
                ...(state.id === 84
                  ? {
                      points: [
                        ...state.points.slice(-79),
                        [(performance.now() % 6000) / 60, state.amount],
                      ],
                    }
                  : {}),
              })
            }
          >
            {state.id === 45
              ? "Next generation"
              : state.id === 84
                ? "Tap rhythm"
                : state.id === 55
                  ? "Next material"
                  : state.id === 96
                    ? "Transform"
                    : "Advance"}
          </button>
          <button
            onClick={() =>
              change({
                seed: (state.seed + 7919) % 1000000,
                amount: 20 + studioNoise(1, state.seed) * 65,
                x: 15 + studioNoise(2, state.seed) * 70,
                y: 15 + studioNoise(3, state.seed) * 70,
              })
            }
          >
            Remix
          </button>
          <button onClick={undo} disabled={!history.length}>
            Undo
          </button>
          <button onClick={redo} disabled={!future.length}>
            Redo
          </button>
          <button onClick={() => change(freshState(state.id))}>Reset</button>
          <button
            onClick={() => setPlaying((v) => !v)}
            disabled={reduced}
            aria-pressed={playing}
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button onClick={share}>Copy composition link</button>
          <button onClick={() => exportArt("svg")}>Export SVG</button>
          <button onClick={() => exportArt("png")}>Export PNG</button>
        </div>
        {reduced && (
          <p className="studio-footnote">
            Automatic playback is off for your reduced motion preference. You
            can still advance every study manually.
          </p>
        )}
        <div className="studio-context">
          {state.id === 19 && (
            <Link className="text-link" href="/projects/portfolio">
              Open the real project →
            </Link>
          )}
          {[
            11, 12, 13, 14, 15, 16, 17, 18, 20, 62, 66, 72, 74, 77, 79, 95,
          ].includes(state.id) && (
            <>
              <h4>From the actual project</h4>
              <p>
                {state.id === 79 || state.id === 74
                  ? project.contribution
                  : state.id === 66 && state.amount > 65
                    ? project.approach
                    : project.description}
              </p>
              <Link className="text-link" href="/projects/portfolio">
                Read the evidence →
              </Link>
            </>
          )}
          {state.id === 13 && (
            <div className="studio-project-drawers">
              {[
                ["The brief", project.brief],
                ["The approach", project.approach],
                ["The result", project.result],
              ].map(([title, text]) => (
                <details key={title}>
                  <summary>{title}</summary>
                  <p>{text}</p>
                </details>
              ))}
            </div>
          )}
          {state.id === 77 && (
            <nav aria-label="Implementation demonstrations">
              <Link href="/experiments/field">Direct manipulation →</Link>
              <Link href="/experiments/color">Contrast measurement →</Link>
              <Link href="/projects">Search and filter →</Link>
            </nav>
          )}
          {state.id === 61 && (
            <>
              <h4>
                {state.amount < 50
                  ? "Prioritize simplicity"
                  : "Prioritize expression"}
              </h4>
              <p>{project.tradeoffs[state.amount < 50 ? 0 : 1]}</p>
              <p>
                This is a reading lens on documented decisions, not a
                performance prediction.
              </p>
            </>
          )}
          {state.id === 63 && (
            <>
              <h4>
                {state.amount < 35
                  ? "One day"
                  : state.amount < 70
                    ? "One week"
                    : "One month"}{" "}
                — hypothetical scope
              </h4>
              <p>
                {state.amount < 35
                  ? "Start with one clear project, readable typography, and contact information."
                  : state.amount < 70
                    ? "Add case studies, responsive layouts, and a focused interactive study."
                    : "Explore more prototypes, test with people, and refine accessibility and performance."}
              </p>
            </>
          )}
          {state.id === 64 && (
            <p>
              {state.amount < 50
                ? "Broken sample: a long title competes with the available width."
                : "Repaired sample: shorter lines and measured spacing make the title fit."}{" "}
              This is an isolated demonstration.
            </p>
          )}
          {[65, 73, 78].includes(state.id) && (
            <ol>
              {project.timeline.map((t) => (
                <li key={t.date}>
                  <strong>
                    {t.date} / {t.title}
                  </strong>
                  <p>{t.text}</p>
                </li>
              ))}
            </ol>
          )}
          {state.id === 67 && (
            <p>
              {
                [
                  "The request reads the project's shared content module.",
                  "React assembles the page and its interactive components.",
                  "Next.js serves the built page and static assets.",
                ][state.step % 3]
              }
            </p>
          )}
          {state.id === 68 && (
            <p>
              {state.amount < 50
                ? "Current implementation: static shared content, published through Git."
                : "Hypothetical alternative: a database and editorial interface would support content changes without a code deploy, while adding authentication, hosting, and maintenance."}
            </p>
          )}
          {[71, 73, 74, 75, 76, 77, 78, 79].includes(state.id) && (
            <p className="studio-footnote">
              Career history and personal qualifications are still pending. This
              study uses portfolio implementation evidence, not invented
              employment or skill claims.
            </p>
          )}
          {state.id === 75 && (
            <button onClick={() => window.print()}>Print evidence sheet</button>
          )}
          {state.id === 76 && (
            <>
              <label>
                Reading interest
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                >
                  {["Interface", "Engineering", "Creative direction"].map(
                    (s) => (
                      <option key={s}>{s}</option>
                    ),
                  )}
                </select>
              </label>
              <p>
                {interest === "Interface"
                  ? project.description
                  : interest === "Engineering"
                    ? project.tradeoffs[0]
                    : project.contribution}
              </p>
            </>
          )}
          {state.id === 80 && (
            <>
              <button
                aria-pressed={shortlisted}
                onClick={() => setShortlisted((v) => !v)}
              >
                {shortlisted
                  ? "Remove portfolio from shortlist"
                  : "Save portfolio to shortlist"}
              </button>
              <button onClick={notes}>Export shortlist notes</button>
              <p>Saved on this device. Nothing is sent to Jonathan.</p>
            </>
          )}
          {idea.local && (
            <>
              <span>Local turn {state.turn + 1}.</span>
              <button
                onClick={() =>
                  change({
                    turn: (state.turn + 1) % 101,
                    step: (state.step + 1) % 500,
                    seed: (state.seed + 499) % 1000000,
                  })
                }
              >
                Pass to the next person
              </button>
            </>
          )}
          {state.id === 86 && (
            <>
              <p>{favorites.length} studies in your exhibition.</p>
              <button
                onClick={() => {
                  setOnlyFavorites(true);
                  setGroup("All");
                  document
                    .getElementById("studio-catalog")
                    ?.scrollIntoView({ behavior: "instant" });
                }}
              >
                View my exhibition
              </button>
              <button onClick={notes}>Export exhibition list</button>
            </>
          )}
          {state.id === 88 && (
            <p>
              Player one controls Horizontal with A / D. Player two controls
              Vertical with J / L. Focus the stage first.
            </p>
          )}
          {state.id === 94 && (
            <>
              <button aria-pressed={sound} onClick={enableSound}>
                {sound ? "Disable sound" : "Enable sound"}
              </button>
              {["C", "D", "E", "F", "G", "A", "B", "C high"].map((note, i) => (
                <button key={note} onClick={() => tone(i)}>
                  Play {note}
                </button>
              ))}
            </>
          )}
          {state.id === 91 && (
            <nav aria-label="Studio windows">
              <Link href="/projects">Open Projects ↗</Link>
              <Link href="/experiments">Open Experiments ↗</Link>
              <Link href="/cv">Open CV ↗</Link>
            </nav>
          )}
        </div>
        <p role="status" className="studio-status">
          {message}
        </p>
        <div className="studio-pagination">
          <button
            disabled={state.id === 1}
            onClick={() => select(state.id - 1)}
          >
            ← Previous study
          </button>
          <button onClick={() => select(1 + Math.floor(Math.random() * 100))}>
            Surprise me ↗
          </button>
          <button
            disabled={state.id === 100}
            onClick={() => select(state.id + 1)}
          >
            Next study →
          </button>
        </div>
      </div>
      <section
        id="studio-catalog"
        aria-label="Study catalog"
        className="studio-catalog"
      >
        <div className="studio-catalog-heading">
          <div>
            <p className="kicker">The possibility index</p>
            <h2>Choose your rabbit hole.</h2>
          </div>
          <span>{results.length} / 100</span>
        </div>
        <div className="studio-filters">
          <label>
            Search studies
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Gravity, typography, light…"
            />
          </label>
          <label>
            Collection
            <select value={group} onChange={(e) => setGroup(e.target.value)}>
              {["All", ...STUDIO_GROUPS].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>
          <button
            aria-pressed={onlyFavorites}
            onClick={() => setOnlyFavorites((v) => !v)}
          >
            {onlyFavorites ? "Show all studies" : "Saved studies"}
          </button>
        </div>
        {!results.length && (
          <p>
            No studies match.{" "}
            <button
              onClick={() => {
                setQuery("");
                setGroup("All");
                setOnlyFavorites(false);
              }}
            >
              Clear filters
            </button>
          </p>
        )}
        <div className="studio-card-grid">
          {results.map((i) => (
            <article
              className={`studio-card studio-card-${Math.floor((i.id - 1) / 10)}`}
              key={i.id}
            >
              <button
                className="studio-card-open"
                aria-pressed={state.id === i.id}
                onClick={() => select(i.id)}
              >
                <span className="studio-card-number">
                  {String(i.id).padStart(3, "0")}{" "}
                  <span aria-hidden="true">↗</span>
                </span>
                <span
                  className={`studio-card-mark mark-${i.id % 5}`}
                  style={{ "--turn": `${i.id * 13}deg` }}
                  aria-hidden="true"
                >
                  <i />
                  <i />
                  <i />
                </span>
                <span className="studio-card-group">{i.group}</span>
                <strong>{i.title}</strong>
                <span className="studio-card-description">{i.description}</span>
              </button>
              <button
                className="studio-card-save"
                aria-label={`${favorites.includes(i.id) ? "Unsave" : "Save"} ${i.title}`}
                aria-pressed={favorites.includes(i.id)}
                onClick={() => favorite(i.id)}
              >
                {favorites.includes(i.id) ? "★" : "☆"}
              </button>
            </article>
          ))}
        </div>
      </section>
      <div className="studio-print-sheet">
        <h2>Jonathan Walther — portfolio evidence</h2>
        <p>{project.title}</p>
        <p>{project.description}</p>
        <p>{project.contribution}</p>
        {project.tradeoffs.map((t) => (
          <p key={t}>{t}</p>
        ))}
        <p>Career history and CV details pending.</p>
      </div>
    </section>
  );
}
