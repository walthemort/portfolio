"use client";

import { useEffect, useState } from "react";

const palettes = {
  orange: ["#fa5b35", "#fbc0a8"],
  blue: ["#4969df", "#aebef8"],
  green: ["#2b7556", "#b8d9c7"],
};

export default function GridStudy() {
  const [seed, setSeed] = useState(1);
  const [density, setDensity] = useState(65);
  const [palette, setPalette] = useState("orange");
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function sync() {
      setReducedMotion(preference.matches);
      if (preference.matches) setPlaying(false);
    }
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!playing || reducedMotion) return;
    const timer = setInterval(() => {
      if (!document.hidden) setSeed((s) => s + 1);
    }, 1600);
    return () => clearInterval(timer);
  }, [playing, reducedMotion]);

  const colors = palettes[palette];
  return (
    <div className="study" data-playing={playing}>
      <div
        className="study-canvas"
        role="img"
        aria-label={`Generative grid in ${palette}, density ${density} percent, variation ${seed}`}
      >
        <div className="canvas-cross canvas-cross-tl" aria-hidden="true" />
        <div className="canvas-cross canvas-cross-br" aria-hidden="true" />
        <div className="study-grid" aria-hidden="true">
          {Array.from({ length: 112 }, (_, i) => {
            const value = ((i + 1) * 7919 + seed * 104729) % 997;
            return (
              <span
                key={i}
                style={{
                  "--cell-delay": `${(i % 14) * 12}ms`,
                  backgroundColor:
                    value % 100 < density ? colors[value % 2] : "transparent",
                  borderRadius: value % 3 === 0 ? "50%" : "0",
                  transform: `rotate(${(value % 4) * 90}deg) scale(${0.55 + (value % 45) / 100})`,
                }}
              />
            );
          })}
        </div>
        <span className="canvas-caption">FIG. 01 — GRID STUDY</span>
        <span className="canvas-seed">
          SEED {String(seed).padStart(3, "0")}
        </span>
      </div>
      <div className="study-controls">
        <label className="density-control" htmlFor="density">
          Density <output htmlFor="density">{density}%</output>
          <input
            id="density"
            type="range"
            min="10"
            max="100"
            value={density}
            onChange={(e) => setDensity(Number(e.target.value))}
          />
        </label>
        <fieldset className="palette-control">
          <legend>Palette</legend>
          {Object.keys(palettes).map((color) => (
            <button
              key={color}
              type="button"
              className="swatch"
              style={{ "--swatch": palettes[color][0] }}
              aria-label={`${color} palette`}
              aria-pressed={palette === color}
              onClick={() => setPalette(color)}
            />
          ))}
        </fieldset>
        <div className="study-actions">
          {!reducedMotion && (
            <button
              className="play-study"
              type="button"
              aria-pressed={playing}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? "Pause motion" : "Play motion"}
              <svg aria-hidden="true" viewBox="0 0 20 20">
                {playing ? (
                  <path
                    d="M7 4v12M13 4v12"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                ) : (
                  <path d="M6 4l10 6-10 6z" fill="currentColor" />
                )}
              </svg>
            </button>
          )}
          <button
            className="regenerate"
            type="button"
            onClick={() => setSeed((s) => s + 1)}
          >
            New variation <span aria-hidden="true">↻</span>
          </button>
        </div>
      </div>
    </div>
  );
}
