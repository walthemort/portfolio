"use client";
import { useEffect, useState } from "react";
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () =>
      setReduced(
        media.matches || document.documentElement.dataset.motion === "reduce",
      );
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("portfolio-motion", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("portfolio-motion", sync);
    };
  }, []);
  return reduced;
}
export default function MotionPreference() {
  const [mode, setMode] = useState("system");
  useEffect(() => {
    try {
      const saved =
        localStorage.getItem("portfolio-motion") === "reduce"
          ? "reduce"
          : "system";
      setMode(saved);
      document.documentElement.dataset.motion = saved;
      window.dispatchEvent(new Event("portfolio-motion"));
    } catch {}
  }, []);
  function change(value) {
    setMode(value);
    document.documentElement.dataset.motion = value;
    try {
      localStorage.setItem("portfolio-motion", value);
    } catch {}
    window.dispatchEvent(new Event("portfolio-motion"));
  }
  return (
    <label className="motion-preference">
      Motion
      <select value={mode} onChange={(e) => change(e.target.value)}>
        <option value="system">Follow system</option>
        <option value="reduce">Reduced</option>
      </select>
    </label>
  );
}
