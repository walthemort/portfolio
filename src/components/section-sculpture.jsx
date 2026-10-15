"use client";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "./motion-preference";
export default function SectionSculpture() {
  const path = usePathname(),
    reduced = useReducedMotion();
  const chapter = path.startsWith("/experiments")
    ? 2
    : path.startsWith("/cv")
      ? 3
      : 1;
  return (
    <div
      className={`section-sculpture sculpture-chapter-${chapter}`}
      data-still={reduced ? "true" : "false"}
      aria-hidden="true"
    >
      <svg viewBox="0 0 300 240">
        <path
          className="sculpture-ribbon"
          d={
            chapter === 1
              ? "M40 170 C90 210 95 30 150 90 S230 210 265 50"
              : chapter === 2
                ? "M40 120 C40 0 270 0 260 120 S40 240 40 120"
                : "M70 35 C70 200 70 200 155 200 S240 200 240 35"
          }
        />
        <ellipse cx="150" cy="213" rx="95" ry="8" />
        <circle cx="245" cy="35" r="7" />
      </svg>
    </div>
  );
}
