export const EXPERIMENTS = [
  {
    id: "field",
    title: "Magnetic field",
    hint: "Move the invisible.",
    description:
      "Drag the force point, or use the arrow keys, to attract and repel a field of particles.",
    tags: ["SVG", "Interaction", "Mathematics"],
  },
  {
    id: "type",
    title: "Type, untamed",
    hint: "Break the baseline.",
    description:
      "Write something, bend its baseline, switch to outlines, and remix the composition.",
    tags: ["Typography", "SVG"],
  },
  {
    id: "grid",
    title: "Order & chaos",
    hint: "Make your own rules.",
    description:
      "Explore density, color, and seeded variation in a generative grid.",
    tags: ["Generative design", "React"],
  },
  {
    id: "drawing",
    title: "Little gestures",
    hint: "Leave a trace.",
    description:
      "Draw with a mouse, pen, or finger. Adjust the brush, undo a gesture, and export your drawing.",
    tags: ["Drawing", "Pointer events"],
  },
  {
    id: "landscape",
    title: "Somewhere, nowhere",
    hint: "Invent a horizon.",
    description:
      "Shape a procedural landscape with a seed, a roughness control, and the position of the sun.",
    tags: ["Procedural art", "SVG"],
  },
  {
    id: "color",
    title: "Good company",
    hint: "Find colors that work.",
    description:
      "Mix foreground and background colors, inspect their blend, and check their WCAG contrast.",
    tags: ["Color", "Accessibility"],
  },
  {
    id: "poster",
    title: "Make some noise",
    hint: "Say it differently.",
    description:
      "Build a typographic poster, change its palette, and play or pause a sequence of compositions.",
    tags: ["Poster design", "Typography"],
  },
];
export const PALETTES = {
  orange: { ink: "#42251c", paper: "#ffe1cd", color: "#f45b32" },
  blue: { ink: "#182f58", paper: "#e0e6ff", color: "#4d6bcd" },
  green: { ink: "#203c2c", paper: "#e3edcf", color: "#568460" },
};
const defaults = {
  seed: 1,
  density: 65,
  palette: "orange",
  force: 70,
  repel: false,
  x: 550,
  y: 300,
  text: "WHAT IF?",
  bend: 22,
  outline: false,
  phase: 0,
  brush: 8,
  color: "#31583d",
  strokes: [],
  roughness: 55,
  sun: 130,
  foreground: "#17251a",
  background: "#e4efc9",
  tracking: 1,
};
export function defaultSettings(id) {
  return {
    ...defaults,
    strokes: [],
    ...(id === "poster"
      ? { text: "MAKE SOME NOISE", palette: "blue", bend: 12 }
      : {}),
    ...(id === "landscape" ? { palette: "blue" } : {}),
  };
}
export function sanitizeSettings(id, input = {}) {
  const d = defaultSettings(id),
    out = { ...d };
  if (!input || typeof input !== "object") return out;
  const bounds = {
    seed: [1, 99999],
    density: [10, 100],
    force: [0, 100],
    x: [0, 1100],
    y: [0, 600],
    bend: [0, 90],
    phase: [0, 99999],
    brush: [1, 30],
    roughness: [0, 100],
    sun: [20, 350],
    tracking: [0, 15],
  };
  for (const [key, [min, max]] of Object.entries(bounds)) {
    if (typeof input[key] === "number" && Number.isFinite(input[key]))
      out[key] = Math.min(max, Math.max(min, Math.round(input[key])));
  }
  for (const key of ["repel", "outline"])
    if (typeof input[key] === "boolean") out[key] = input[key];
  for (const key of ["color", "foreground", "background"])
    if (typeof input[key] === "string" && /^#[0-9a-f]{6}$/i.test(input[key]))
      out[key] = input[key].toLowerCase();
  if (Object.hasOwn(PALETTES, input.palette)) out.palette = input.palette;
  if (typeof input.text === "string")
    out.text = Array.from(input.text.replace(/[\u0000-\u001f]/g, ""))
      .slice(0, id === "poster" ? 32 : 16)
      .join("");
  if (Array.isArray(input.strokes))
    out.strokes = input.strokes.slice(-80).flatMap((stroke) => {
      if (
        !stroke ||
        !Array.isArray(stroke.points) ||
        !/^#[0-9a-f]{6}$/i.test(stroke.color)
      )
        return [];
      const points = stroke.points
        .slice(0, 400)
        .filter(
          (p) => Array.isArray(p) && p.length === 2 && p.every(Number.isFinite),
        )
        .map(([x, y]) => [
          Math.round(Math.max(0, Math.min(1100, x))),
          Math.round(Math.max(0, Math.min(600, y))),
        ]);
      return points.length
        ? [
            {
              points,
              color: stroke.color,
              width: Math.max(1, Math.min(30, Number(stroke.width) || 8)),
            },
          ]
        : [];
    });
  return out;
}
export function parseExperimentState(id, query) {
  try {
    const raw = query.get("state");
    return raw && raw.length <= 12000
      ? sanitizeSettings(id, JSON.parse(raw))
      : defaultSettings(id);
  } catch {
    return defaultSettings(id);
  }
}
export function experimentQuery(settings) {
  const params = new URLSearchParams();
  params.set("state", JSON.stringify(settings));
  return params.toString();
}
export function historyChange(history, next) {
  if (JSON.stringify(history.present) === JSON.stringify(next)) return history;
  return {
    past: [...history.past, history.present].slice(-40),
    present: next,
    future: [],
  };
}
export function historyUndo(h) {
  return h.past.length
    ? {
        past: h.past.slice(0, -1),
        present: h.past.at(-1),
        future: [h.present, ...h.future].slice(0, 40),
      }
    : h;
}
export function historyRedo(h) {
  return h.future.length
    ? {
        past: [...h.past, h.present].slice(-40),
        present: h.future[0],
        future: h.future.slice(1),
      }
    : h;
}
export function noise(seed, i) {
  const n = Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453;
  return n - Math.floor(n);
}
export function contrastRatio(a, b) {
  function luminance(hex) {
    return hex
      .match(/[a-f0-9]{2}/gi)
      .map((v) => parseInt(v, 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
      .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
  }
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
export function mixColors(a, b, amount) {
  const x = a.match(/[a-f0-9]{2}/gi),
    y = b.match(/[a-f0-9]{2}/gi);
  return (
    "#" +
    x
      .map((v, i) =>
        Math.round(parseInt(v, 16) * (1 - amount) + parseInt(y[i], 16) * amount)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}
export function experimentPresets(id) {
  const d = defaultSettings(id);
  return [
    { name: "Original", settings: d },
    {
      name:
        id === "drawing"
          ? "Fine blue"
          : id === "color"
            ? "Ink on paper"
            : "Quiet",
      settings: {
        ...d,
        palette: "blue",
        seed: 7,
        density: 30,
        force: 35,
        bend: 8,
        brush: 3,
        color: "#3455b8",
        roughness: 20,
        foreground: "#22221f",
        background: "#f8f8f4",
      },
    },
    {
      name:
        id === "drawing"
          ? "Bold coral"
          : id === "color"
            ? "High contrast"
            : "Wild",
      settings: {
        ...d,
        palette: "green",
        seed: 29,
        density: 90,
        force: 100,
        bend: 75,
        brush: 24,
        color: "#b33123",
        roughness: 90,
        sun: 240,
        outline: true,
        foreground: "#ffffff",
        background: "#17251a",
      },
    },
  ];
}
