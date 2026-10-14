"use client";

import { useState } from "react";

const palettes = {
  orange: ["#fa5b35", "#fbc0a8"],
  blue: ["#4969df", "#aebef8"],
  green: ["#2b7556", "#b8d9c7"],
};

export default function GridStudy() {
  const [seed, setSeed] = useState(1);
  const [density, setDensity] = useState(65);
  const [palette, setPalette] = useState("orange");
  const colors = palettes[palette];
  return (
    <div className="study">
      <div
        className="study-canvas"
        role="img"
        aria-label={`Generative grid in ${palette}, density ${density} percent, variation ${seed}`}
      >
        <div className="study-grid" aria-hidden="true">
          {Array.from({ length: 112 }, (_, i) => {
            const value = ((i + 1) * 7919 + seed * 104729) % 997;
            return (
              <span
                key={i}
                style={{
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
        <button
          className="regenerate"
          type="button"
          onClick={() => setSeed((s) => s + 1)}
        >
          New variation <span aria-hidden="true">↻</span>
        </button>
      </div>
    </div>
  );
}
