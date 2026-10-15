"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./motion-preference";

export default function PortfolioArtwork() {
  const surface = useRef(null);
  const frame = useRef(null);
  const reduced = useReducedMotion();
  const [dark, setDark] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function reset() {
    cancelAnimationFrame(frame.current);
    if (!surface.current) return;
    surface.current.style.setProperty("--pointer-x", "0");
    surface.current.style.setProperty("--pointer-y", "0");
  }

  function move(event) {
    if (
      paused ||
      reduced ||
      !window.matchMedia(
        "(hover: hover) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (!surface.current) return;
      surface.current.style.setProperty("--pointer-x", String(x));
      surface.current.style.setProperty("--pointer-y", String(y));
    });
  }

  return (
    <div className="artwork-stage" onPointerMove={move} onPointerLeave={reset}>
      <div
        ref={surface}
        className="project-art"
        data-theme={dark ? "dark" : "orange"}
        data-paused={paused || reduced}
      >
        <div className="art-light" aria-hidden="true" />
        <div className="art-label" aria-hidden="true">
          <span>PERSONAL ARCHIVE</span>
          <span>VOL. 01 / 2026</span>
        </div>
        <div className="art-type" aria-hidden="true">
          Work<span>& play.</span>
        </div>
        <div className="art-orbit" aria-hidden="true">
          <span />
        </div>
        <div className="art-bottom">
          <span className="art-caption" aria-hidden="true">
            DESIGN × DEVELOPMENT
          </span>
          <div className="art-controls">
            <button
              type="button"
              className="art-control art-motion"
              aria-label={
                paused ? "Resume artwork motion" : "Pause artwork motion"
              }
              aria-pressed={paused}
              onClick={() => {
                reset();
                setPaused((p) => !p);
              }}
            >
              <svg aria-hidden="true" viewBox="0 0 20 20">
                {paused ? (
                  <path d="M6 4l10 6-10 6z" fill="currentColor" />
                ) : (
                  <path
                    d="M7 4v12M13 4v12"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                )}
              </svg>
            </button>
            <button
              type="button"
              className="art-control"
              aria-label="Change artwork theme"
              aria-pressed={dark}
              onClick={() => setDark((d) => !d)}
            >
              <svg aria-hidden="true" viewBox="0 0 20 20">
                <circle
                  cx="10"
                  cy="10"
                  r="6"
                  fill="none"
                  stroke="currentColor"
                />
                <path d="M10 4a6 6 0 000 12z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
