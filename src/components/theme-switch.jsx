"use client";

import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-appearance") === "ink";
      setDark(saved);
      document.documentElement.dataset.appearance = saved ? "ink" : "paper";
    } catch {
      /* Keep the readable default when storage is unavailable. */
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.appearance = next ? "ink" : "paper";
    try {
      localStorage.setItem("portfolio-appearance", next ? "ink" : "paper");
    } catch {
      /* The control still works without persistence. */
    }
  }

  return (
    <button
      className="theme-switch"
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to paper theme" : "Switch to ink theme"}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M12 4a8 8 0 000 16z" fill="currentColor" />
      </svg>
      <span>{dark ? "Ink" : "Paper"}</span>
    </button>
  );
}
