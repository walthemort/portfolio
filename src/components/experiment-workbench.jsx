"use client";
import { useEffect, useRef, useState } from "react";
import ExperimentScene from "./experiment-scene";
import { useReducedMotion } from "./motion-preference";
import {
  defaultSettings,
  sanitizeSettings,
  parseExperimentState,
  experimentQuery,
  historyChange,
  historyUndo,
  historyRedo,
  experimentPresets,
  PALETTES,
  contrastRatio,
} from "../lib/experiments";

function download(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
function Range({ name, keyName, min, max, s, studyId, onChange }) {
  return (
    <label htmlFor={`${studyId}-${keyName}`}>
      {name}
      <output aria-hidden="true">{s[keyName]}</output>
      <input
        id={`${studyId}-${keyName}`}
        type="range"
        min={min}
        max={max}
        value={s[keyName]}
        onChange={(e) => onChange({ [keyName]: Number(e.target.value) })}
      />
    </label>
  );
}
export default function ExperimentWorkbench({ study }) {
  const [history, setHistory] = useState(() => ({
    past: [],
    present: defaultSettings(study.id),
    future: [],
  }));
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const [playing, setPlaying] = useState(false);
  const [draft, setDraft] = useState(null);
  const drawing = useRef(null);
  const fieldDrag = useRef(null);
  const [fieldPreview, setFieldPreview] = useState(null);
  const svg = useRef(null);
  const container = useRef(null);
  const visible = useRef(true);
  const reduced = useReducedMotion();
  const s = history.present;
  useEffect(() => {
    function load() {
      setHistory({
        past: [],
        present: parseExperimentState(
          study.id,
          new URLSearchParams(window.location.search),
        ),
        future: [],
      });
      setReady(true);
    }
    load();
    window.addEventListener("popstate", load);
    return () => window.removeEventListener("popstate", load);
  }, [study.id]);
  const query = experimentQuery(s),
    tooLarge = query.length > 12000;
  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    if (tooLarge) url.searchParams.delete("state");
    else url.searchParams.set("state", JSON.stringify(s));
    window.history.replaceState(
      window.history.state,
      "",
      url.pathname + url.search + url.hash,
    );
  }, [s, ready, tooLarge]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);
  useEffect(() => {
    if (!playing || reduced) return;
    const timer = setInterval(() => {
      if (document.hidden || !visible.current) return;
      setHistory((h) => ({
        ...h,
        present: {
          ...h.present,
          seed: (h.present.seed % 99999) + 1,
          phase: (h.present.phase + 1) % 99999,
        },
      }));
    }, 1400);
    return () => clearInterval(timer);
  }, [playing, reduced]);
  function change(patch) {
    setPlaying(false);
    setHistory((h) =>
      historyChange(h, sanitizeSettings(study.id, { ...h.present, ...patch })),
    );
    setMessage("");
  }
  function point(event) {
    const node = svg.current,
      matrix = node?.getScreenCTM();
    if (!matrix) return null;
    const p = node.createSVGPoint();
    p.x = event.clientX;
    p.y = event.clientY;
    const local = p.matrixTransform(matrix.inverse());
    return [
      Math.round(Math.max(0, Math.min(1100, local.x))),
      Math.round(Math.max(0, Math.min(600, local.y))),
    ];
  }
  function down(event) {
    if (!["field", "drawing"].includes(study.id)) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const p = point(event);
    if (!p) return;
    if (study.id === "field") {
      fieldDrag.current = { x: p[0], y: p[1] };
      setFieldPreview(fieldDrag.current);
    } else {
      drawing.current = {
        id: event.pointerId,
        stroke: { points: [p], color: s.color, width: s.brush },
      };
      setDraft(drawing.current.stroke);
    }
  }
  function move(event) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const p = point(event);
    if (!p) return;
    if (study.id === "field") {
      fieldDrag.current = { x: p[0], y: p[1] };
      setFieldPreview(fieldDrag.current);
    } else if (drawing.current?.id === event.pointerId) {
      const stroke = drawing.current.stroke,
        last = stroke.points.at(-1);
      if (
        stroke.points.length >= 400 ||
        Math.hypot(p[0] - last[0], p[1] - last[1]) < 3
      )
        return;
      drawing.current.stroke = { ...stroke, points: [...stroke.points, p] };
      setDraft(drawing.current.stroke);
    }
  }
  function finish(event) {
    if (study.id === "field" && fieldDrag.current) {
      change(fieldDrag.current);
      fieldDrag.current = null;
      setFieldPreview(null);
    }
    if (drawing.current?.id === event.pointerId) {
      let stroke = drawing.current.stroke;
      if (stroke.points.length === 1)
        stroke = {
          ...stroke,
          points: [
            ...stroke.points,
            [stroke.points[0][0] + 0.1, stroke.points[0][1] + 0.1],
          ],
        };
      change({ strokes: [...s.strokes, stroke] });
      drawing.current = null;
      setDraft(null);
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function keyboard(event) {
    if (study.id !== "field" || event.target !== event.currentTarget) return;
    const d = {
      ArrowLeft: [-35, 0],
      ArrowRight: [35, 0],
      ArrowUp: [0, -35],
      ArrowDown: [0, 35],
    }[event.key];
    if (d) {
      event.preventDefault();
      change({ x: s.x + d[0], y: s.y + d[1] });
    }
  }
  async function share() {
    if (tooLarge) {
      setMessage(
        "This drawing is too large for a link. Export it as an image instead.",
      );
      return;
    }
    const url = new URL(`/experiments/${study.id}`, window.location.origin);
    url.search = query;
    try {
      await navigator.clipboard.writeText(url.toString());
      setMessage("Composition link copied.");
    } catch {
      setMessage(`Copy this address: ${url}`);
    }
  }
  async function exportImage(type) {
    setMessage(`Preparing ${type.toUpperCase()}…`);
    try {
      const clone = svg.current.cloneNode(true);
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      const text = new XMLSerializer().serializeToString(clone);
      const blob = new Blob([text], { type: "image/svg+xml;charset=utf-8" });
      const name = `jonathan-walther-${study.id}-${s.seed}`;
      if (type === "svg") download(blob, `${name}.svg`);
      else {
        const url = URL.createObjectURL(blob);
        try {
          const image = new window.Image();
          await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
            image.src = url;
          });
          const canvas = document.createElement("canvas");
          canvas.width = 2200;
          canvas.height = 1200;
          canvas.getContext("2d").drawImage(image, 0, 0, 2200, 1200);
          const png = await new Promise((resolve) =>
            canvas.toBlob(resolve, "image/png"),
          );
          if (!png) throw new Error("PNG export failed");
          download(png, `${name}.png`);
        } finally {
          URL.revokeObjectURL(url);
        }
      }
      setMessage(`${type.toUpperCase()} downloaded.`);
    } catch {
      setMessage("Export could not be completed. Please try again.");
    }
  }

  const ratio =
    study.id === "color" ? contrastRatio(s.foreground, s.background) : null;
  return (
    <div
      ref={container}
      data-ready={ready}
      className={`workbench workbench-${study.id}`}
      aria-label={`${study.title} workbench`}
    >
      <div className="workbench-header">
        <span>STUDY / {study.id.toUpperCase()}</span>
        <span>
          {study.id === "drawing"
            ? `${s.strokes.length} strokes`
            : `SEED ${String(s.seed).padStart(3, "0")}`}
        </span>
      </div>
      <div
        className={`interactive-canvas ${["field", "drawing"].includes(study.id) ? "direct-manipulation" : ""}`}
        {...(study.id === "field"
          ? {
              tabIndex: 0,
              role: "group",
              "aria-label":
                "Magnetic field. Drag the force point or use arrow keys.",
              onKeyDown: keyboard,
            }
          : {})}
      >
        <ExperimentScene
          id={study.id}
          s={fieldPreview ? { ...s, ...fieldPreview } : s}
          draft={draft}
          svgRef={svg}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={finish}
          onPointerCancel={() => {
            drawing.current = null;
            fieldDrag.current = null;
            setFieldPreview(null);
            setDraft(null);
          }}
        />
      </div>
      <div className="workbench-settings">
        {study.id === "field" && (
          <>
            <Range
              s={s}
              studyId={study.id}
              onChange={change}
              name="Force"
              keyName="force"
              min={0}
              max={100}
            />
            <button
              type="button"
              aria-pressed={s.repel}
              onClick={() => change({ repel: !s.repel })}
            >
              {s.repel ? "Repel" : "Attract"}
            </button>
            <button type="button" onClick={() => change({ x: 550, y: 300 })}>
              Center force
            </button>
          </>
        )}
        {["type", "poster"].includes(study.id) && (
          <>
            <label>
              Your words
              <input
                type="text"
                value={s.text}
                maxLength={study.id === "poster" ? 32 : 16}
                onChange={(e) => change({ text: e.target.value })}
                spellCheck={false}
              />
            </label>
            <Range
              s={s}
              studyId={study.id}
              onChange={change}
              name="Bend"
              keyName="bend"
              min={0}
              max={90}
            />
            {study.id === "poster" && (
              <Range
                s={s}
                studyId={study.id}
                onChange={change}
                name="Tracking"
                keyName="tracking"
                min={0}
                max={15}
              />
            )}
            <button
              type="button"
              aria-pressed={s.outline}
              onClick={() => change({ outline: !s.outline })}
            >
              Outline
            </button>
            <button
              type="button"
              onClick={() => change({ phase: s.phase + 1 })}
            >
              Remix
            </button>
          </>
        )}
        {study.id === "grid" && (
          <Range
            s={s}
            studyId={study.id}
            onChange={change}
            name="Density"
            keyName="density"
            min={10}
            max={100}
          />
        )}
        {study.id === "drawing" && (
          <>
            <Range
              s={s}
              studyId={study.id}
              onChange={change}
              name="Brush size"
              keyName="brush"
              min={1}
              max={30}
            />
            <label>
              Brush color
              <input
                type="color"
                value={s.color}
                onChange={(e) => change({ color: e.target.value })}
              />
            </label>
            <button
              type="button"
              onClick={() => change({ strokes: [] })}
              disabled={!s.strokes.length}
            >
              Clear drawing
            </button>
            <button
              type="button"
              onClick={() => {
                const x = 150 + ((s.seed * 79) % 750),
                  y = 120 + ((s.seed * 47) % 350);
                change({
                  seed: (s.seed % 99999) + 1,
                  strokes: [
                    ...s.strokes,
                    {
                      points: [
                        [x, y],
                        [x + 35, y - 25],
                        [x + 75, y + 15],
                        [x + 105, y - 5],
                      ],
                      color: s.color,
                      width: s.brush,
                    },
                  ],
                });
              }}
            >
              Add a mark
            </button>
            <p className="control-note">
              Draw with a mouse, pen, or finger, or use Add a mark.
            </p>
          </>
        )}
        {study.id === "landscape" && (
          <>
            <Range
              s={s}
              studyId={study.id}
              onChange={change}
              name="Roughness"
              keyName="roughness"
              min={0}
              max={100}
            />
            <Range
              s={s}
              studyId={study.id}
              onChange={change}
              name="Sun position"
              keyName="sun"
              min={20}
              max={350}
            />
          </>
        )}
        {study.id === "color" && (
          <>
            <label>
              Foreground color
              <input
                type="color"
                value={s.foreground}
                onChange={(e) => change({ foreground: e.target.value })}
              />
            </label>
            <label>
              Background color
              <input
                type="color"
                value={s.background}
                onChange={(e) => change({ background: e.target.value })}
              />
            </label>
          </>
        )}
        {["grid", "poster", "landscape", "drawing"].includes(study.id) && (
          <label>
            Palette
            <select
              value={s.palette}
              onChange={(e) => change({ palette: e.target.value })}
            >
              {Object.keys(PALETTES).map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
        )}
        {["grid", "landscape"].includes(study.id) && (
          <button
            type="button"
            onClick={() => change({ seed: (s.seed % 99999) + 1 })}
          >
            New variation
          </button>
        )}
        {["grid", "poster", "type", "landscape"].includes(study.id) &&
          !reduced && (
            <button
              type="button"
              aria-pressed={playing}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? "Pause motion" : "Play motion"}
            </button>
          )}
      </div>
      {ratio !== null && (
        <div className="contrast-readout" role="status">
          <strong>{ratio.toFixed(2)}:1</strong>
          <span>
            {ratio >= 7
              ? "AAA for normal text"
              : ratio >= 4.5
                ? "AA for normal text"
                : ratio >= 3
                  ? "AA for large text only"
                  : "Below AA text contrast"}
          </span>
          <span>Normal text needs 4.5:1 for AA; large text needs 3:1.</span>
        </div>
      )}
      <div className="workbench-tools">
        <label>
          Preset
          <select
            defaultValue=""
            onChange={(e) => {
              const preset = experimentPresets(study.id)[
                Number(e.target.value)
              ];
              change(
                study.id === "drawing"
                  ? {
                      brush: preset.settings.brush,
                      color: preset.settings.color,
                    }
                  : preset.settings,
              );
              e.target.value = "";
            }}
          >
            <option value="" disabled>
              Choose a preset
            </option>
            {experimentPresets(study.id).map((p, i) => (
              <option key={p.name} value={i}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          disabled={!history.past.length}
          onClick={() => {
            setPlaying(false);
            setHistory(historyUndo);
          }}
        >
          Undo
        </button>
        <button
          type="button"
          disabled={!history.future.length}
          onClick={() => {
            setPlaying(false);
            setHistory(historyRedo);
          }}
        >
          Redo
        </button>
        <button type="button" onClick={() => change(defaultSettings(study.id))}>
          Reset
        </button>
        <button type="button" onClick={share}>
          Copy composition link
        </button>
        <button type="button" onClick={() => exportImage("svg")}>
          Export SVG
        </button>
        <button type="button" onClick={() => exportImage("png")}>
          Export PNG
        </button>
      </div>
      {tooLarge && (
        <p className="workbench-message">
          This drawing is too large for a share link. Image exports still
          include every stroke.
        </p>
      )}
      <p className="workbench-message" role="status">
        {message}
      </p>
    </div>
  );
}
