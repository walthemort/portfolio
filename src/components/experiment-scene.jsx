import { PALETTES, noise, mixColors } from "../lib/experiments";

export default function ExperimentScene({ id, s, draft, svgRef, ...events }) {
  const palette = PALETTES[s.palette];
  const paper =
    id === "field"
      ? "#18251d"
      : id === "type"
        ? "#f4ccd4"
        : id === "landscape"
          ? "#e1e7e1"
          : id === "color"
            ? s.background
            : palette.paper;
  const ink =
    id === "field" ? "#d8f5b0" : id === "type" ? "#5d2035" : palette.ink;
  const letters = Array.from(s.text || " ");
  function strokePath(stroke, key) {
    return (
      <polyline
        key={key}
        points={stroke.points.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke={stroke.color}
        strokeWidth={stroke.width}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  }
  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1100 600"
      role="img"
      aria-label={`${id} composition, seed ${s.seed}${id === "type" || id === "poster" ? `, text ${s.text}` : ""}${id === "color" ? `, foreground ${s.foreground}, background ${s.background}` : ""}`}
      {...events}
    >
      <rect width="1100" height="600" fill={paper} />
      {id === "field" && (
        <>
          <defs>
            <radialGradient id="field-glow">
              <stop stopColor="#d8f5b0" stopOpacity=".14" />
              <stop offset="1" stopColor="#d8f5b0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={s.x} cy={s.y} r="240" fill="url(#field-glow)" />
          {Array.from({ length: 220 }, (_, i) => {
            const x = 45 + (i % 22) * 48,
              y = 70 + Math.floor(i / 22) * 48,
              dx = s.x - x,
              dy = s.y - y,
              f =
                ((Math.exp(-(dx * dx + dy * dy) / 46000) * s.force) / 100) *
                (s.repel ? -1.15 : 0.86);
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={y}
                  x2={x + dx * f}
                  y2={y + dy * f}
                  stroke={ink}
                  strokeOpacity=".2"
                />
                <circle
                  cx={x + dx * f}
                  cy={y + dy * f}
                  r={2 + Math.abs(f) * 3}
                  fill={ink}
                  opacity={0.4 + Math.abs(f) * 0.6}
                />
              </g>
            );
          })}
          <circle cx={s.x} cy={s.y} r="12" fill="none" stroke={ink} />
        </>
      )}
      {id === "type" && (
        <>
          <path d="M45 300H1055" stroke="#5d203545" strokeDasharray="3 8" />
          {letters.map((letter, i) => {
            const spacing = Math.min(105, 870 / letters.length),
              x = 550 + (i - (letters.length - 1) / 2) * spacing,
              wave = Math.sin(i * 0.7 + s.phase * 0.8),
              y = 310 + wave * s.bend;
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${wave * s.bend * 0.3} ${x} ${y})`}
                fill={s.outline ? "none" : "#5d2035"}
                stroke="#5d2035"
                strokeWidth={s.outline ? 1.5 : 0}
                fontFamily="Arial, sans-serif"
                fontWeight="800"
                fontSize={Math.min(125, 1050 / letters.length)}
              >
                {letter}
              </text>
            );
          })}
        </>
      )}
      {id === "grid" &&
        Array.from({ length: 112 }, (_, i) => {
          const value = Math.floor(noise(s.seed, i) * 1000),
            x = 100 + (i % 14) * 65,
            y = 60 + Math.floor(i / 14) * 60;
          return (
            <g
              key={i}
              transform={`translate(${x} ${y}) rotate(${(value % 4) * 90} 25 25)`}
            >
              {value % 100 < s.density &&
                (value % 3 === 0 ? (
                  <circle
                    cx="25"
                    cy="25"
                    r={12 + (value % 13)}
                    fill={value % 2 ? palette.color : palette.ink}
                  />
                ) : (
                  <rect
                    x="4"
                    y="4"
                    width={25 + (value % 25)}
                    height={25 + (value % 25)}
                    fill={value % 2 ? palette.color : palette.ink}
                  />
                ))}
            </g>
          );
        })}
      {id === "drawing" && (
        <>
          {Array.from({ length: 11 }, (_, i) => (
            <line
              key={i}
              x1="45"
              x2="1055"
              y1={60 + i * 48}
              y2={60 + i * 48}
              stroke={palette.ink}
              strokeOpacity=".08"
            />
          ))}
          {s.strokes.map(strokePath)}
          {draft && strokePath(draft, "draft")}
        </>
      )}
      {id === "landscape" && (
        <>
          <rect
            width="1100"
            height="600"
            fill={
              s.palette === "orange"
                ? "#f7dfc3"
                : s.palette === "green"
                  ? "#dce5d7"
                  : "#dce9ed"
            }
          />
          <circle
            cx="800"
            cy={s.sun}
            r="55"
            fill={s.palette === "blue" ? "#ffe3a0" : "#eaa381"}
          />
          {["#4e7180", "#5a848b", "#769a91", "#a4b69b", "#c9c6a7"].map(
            (color, layer) => {
              const points = Array.from(
                { length: 30 },
                (_, i) =>
                  `${(i * 1100) / 29},${190 + layer * 75 + (noise(s.seed + layer, i) - 0.5) * (60 + s.roughness * 2.5)}`,
              );
              return (
                <path
                  key={color}
                  d={`M0 600L${points.join("L")}L1100 600Z`}
                  fill={color}
                />
              );
            },
          )}
        </>
      )}
      {id === "color" && (
        <>
          <text
            x="70"
            y="190"
            fill={s.foreground}
            fontFamily="Arial, sans-serif"
            fontWeight="700"
            fontSize="92"
          >
            Hello, color.
          </text>
          <text
            x="75"
            y="240"
            fill={s.foreground}
            fontFamily="Arial, sans-serif"
            fontSize="22"
          >
            Foreground and background, in good company.
          </text>
          {Array.from({ length: 7 }, (_, i) => (
            <rect
              key={i}
              x={70 + i * 138}
              y="330"
              width="124"
              height="150"
              rx="62"
              fill={mixColors(s.foreground, s.background, i / 6)}
            />
          ))}
        </>
      )}
      {id === "poster" && (
        <>
          <circle
            cx={850 + Math.sin(s.phase) * 70}
            cy="230"
            r="175"
            fill={palette.color}
          />
          <path
            d={`M80 ${420 + Math.sin(s.phase) * 30}H1020`}
            stroke={ink}
            strokeWidth="2"
          />
          {s.text
            .split(/\s+/)
            .filter(Boolean)
            .reduce((lines, word) => {
              if (lines.length && `${lines.at(-1)} ${word}`.length < 14)
                lines[lines.length - 1] += ` ${word}`;
              else lines.push(word);
              return lines;
            }, [])
            .slice(0, 3)
            .map((line, i) => (
              <text
                key={i}
                x="75"
                y={165 + i * 105}
                fill={s.outline ? "none" : ink}
                stroke={ink}
                strokeWidth={s.outline ? 2 : 0}
                fontSize={Math.min(100, (950 / Math.max(line.length, 1)) * 1.5)}
                letterSpacing={s.tracking}
                fontWeight="800"
                fontFamily="Arial, sans-serif"
                transform={`rotate(${Math.sin(s.phase + i) * s.bend * 0.1} 550 300)`}
              >
                {line}
              </text>
            ))}
          <text
            x="80"
            y="480"
            fill={ink}
            fontSize="13"
            fontFamily="monospace"
            letterSpacing="4"
          >
            A SMALL IDEA. A LOUD EXPRESSION.
          </text>
        </>
      )}
      <text
        x="45"
        y="565"
        fill={id === "color" ? s.foreground : ink}
        fontFamily="monospace"
        fontSize="11"
        letterSpacing="2"
      >
        {id.toUpperCase()} / {String(s.seed).padStart(3, "0")}
      </text>
    </svg>
  );
}
