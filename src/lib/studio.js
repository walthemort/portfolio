export const STUDIO_GROUPS = [
  "Entrances",
  "Project objects",
  "Physics",
  "Typography",
  "Living systems",
  "Light & materials",
  "Ways of thinking",
  "CV & evidence",
  "Together, locally",
  "Signature worlds",
];
// Each row is an interactive interpretation, not a claim about client work.
const rows = [
  ["Unfold the portfolio", "fold", "Unfold a paper stage around the work."],
  [
    "One continuous line",
    "line",
    "Pull a single line into an entire composition.",
  ],
  [
    "Miniature workspace",
    "room",
    "Zoom out from a desk to a miniature studio.",
  ],
  [
    "The printing press",
    "press",
    "Advance the press and separate its ink plates.",
  ],
  [
    "A slit in the screen",
    "slit",
    "Open a narrow seam to reveal another world.",
  ],
  [
    "Impossible depth",
    "tunnel",
    "Travel through nested frames and shifting perspective.",
  ],
  ["The darkroom", "develop", "Develop an image from darkness into light."],
  ["Curtain of letters", "curtain", "Part a curtain woven from the alphabet."],
  [
    "The gallery doorway",
    "door",
    "Open an architectural entrance into the work.",
  ],
  [
    "A different dawn",
    "dawn",
    "A composition seeded by today's local date; remix it yourself.",
  ],
  [
    "Project diorama",
    "diorama",
    "Separate the layers of a miniature project landscape.",
  ],
  [
    "Exploded project",
    "explode",
    "Pull a project apart into content, interface, and delivery.",
  ],
  [
    "Specimen drawers",
    "drawers",
    "Slide open drawers containing real project details.",
  ],
  ["Impossible bookshelf", "shelf", "Tilt a shelf of project chapters."],
  [
    "Project terrarium",
    "terrarium",
    "Grow a landscape around a project specimen.",
  ],
  [
    "Constellation archive",
    "constellation",
    "Connect project facts into an orbital archive.",
  ],
  [
    "Project passport",
    "passport",
    "Turn the pages of a passport made from real project metadata.",
  ],
  [
    "The project machine",
    "machine",
    "Follow content through interface to delivery.",
  ],
  [
    "A working miniature",
    "miniature",
    "Zoom into a miniature of the project's actual page.",
  ],
  ["Under glass", "glass", "Move a light across a project exhibit."],
  [
    "Gravity dial",
    "gravity",
    "Change the gravity acting on a field of objects.",
  ],
  ["Elastic edges", "elastic", "Pull a boundary into a soft elastic surface."],
  [
    "Objects remember",
    "memory",
    "Place points on the stage; they remain when you revisit this study.",
  ],
  [
    "Spring-loaded stack",
    "spring",
    "Fan a stack of cards with a spring curve.",
  ],
  [
    "Cloth interface",
    "cloth",
    "Tug at a woven sheet by moving over the stage.",
  ],
  ["Liquid transition", "liquid", "Move between circular and liquid shapes."],
  ["Magnetic rail", "rail", "Move a magnet along a rail of nodes."],
  [
    "Balancing sculpture",
    "balance",
    "Shift the center of mass of a balancing mobile.",
  ],
  [
    "Carry a glass lens",
    "lens",
    "Move a magnifying lens across a typographic field.",
  ],
  [
    "Tear the cover",
    "tear",
    "Pull apart a paper cover along an irregular seam.",
  ],
  [
    "A name made of work",
    "mosaic",
    "Resolve a mosaic of project images into Jonathan's name.",
  ],
  [
    "Architectural type",
    "architecture",
    "Stretch letters into an architectural skyline.",
  ],
  ["Type remembers", "trail", "Place letters along a trail of your gestures."],
  [
    "Typographic loom",
    "loom",
    "Weave a word through horizontal and vertical threads.",
  ],
  ["Suspended letters", "suspend", "Swing letters from a row of cables."],
  [
    "The second shadow",
    "shadow",
    "Move the light to reveal another typographic layer.",
  ],
  [
    "A sentence in space",
    "sentence",
    "Align the scattered fragments of a sentence.",
  ],
  ["Letter foundry", "foundry", "Pour forms into a modular typographic mold."],
  [
    "Anamorphic name",
    "anamorphic",
    "Find the angle where a distorted name becomes legible.",
  ],
  [
    "Type landscape",
    "type-landscape",
    "Walk a word across a mountainous baseline.",
  ],
  [
    "Self-organizing city",
    "city",
    "Grow an isometric city from the project's actual stack.",
  ],
  [
    "Coral garden",
    "coral",
    "Branch an abstract coral garden with controlled growth.",
  ],
  [
    "Reaction study",
    "reaction",
    "Explore a sampled interference field inspired by reaction patterns.",
  ],
  [
    "Murmuration",
    "flock",
    "Steer a flock of marks around a point of attraction.",
  ],
  ["Cellular world", "cells", "Step a seeded Conway cellular automaton."],
  [
    "Procedural stained glass",
    "stained",
    "Refract a geometric window into colored panes.",
  ],
  [
    "Synthetic organism",
    "organism",
    "Grow the articulated limbs of a radial creature.",
  ],
  ["Branching river", "river", "Split a river into an ever wider delta."],
  [
    "Erosion table",
    "erosion",
    "Cut contour lines through a procedural landscape.",
  ],
  [
    "Component ecosystem",
    "ecosystem",
    "Arrange a habitat of interface elements.",
  ],
  [
    "Move the studio light",
    "light",
    "Relight a sculpture with a movable highlight.",
  ],
  [
    "Holographic sleeve",
    "hologram",
    "Tilt a spectral sleeve around a project card.",
  ],
  [
    "Frosted reveal",
    "frost",
    "Clear an aperture in a frosted typographic surface.",
  ],
  [
    "Caustic light",
    "caustic",
    "Layer moving wave contours into a pool of light.",
  ],
  [
    "Material library",
    "materials",
    "Switch the same sculpture between paper, chrome, and glass.",
  ],
  [
    "Light-sensitive type",
    "sensitive",
    "Change the weight and spacing of type with light.",
  ],
  [
    "Chromatic echoes",
    "echo",
    "Separate the color channels of a typographic echo.",
  ],
  [
    "Only the shadows",
    "only-shadow",
    "Reconstruct an object from its projected shadows.",
  ],
  [
    "Day / night studio",
    "day-night",
    "Slide a miniature studio between daylight and night.",
  ],
  ["From wire to object", "wire", "Resolve a wire model into a solid object."],
  [
    "Decision simulator",
    "decision",
    "Compare the project's documented tradeoffs through a choice of priorities.",
  ],
  [
    "Project autopsy",
    "autopsy",
    "Peel back the visible interface to inspect its real architecture.",
  ],
  [
    "Constraint engine",
    "constraint",
    "Change a hypothetical time budget and see scope recommendations.",
  ],
  [
    "A playable failure",
    "failure",
    "Break a sample layout with long content, then repair it.",
  ],
  [
    "Branching history",
    "history",
    "Travel through the project's documented milestones.",
  ],
  [
    "Complexity dial",
    "complexity",
    "Reveal progressively deeper detail from the actual case study.",
  ],
  [
    "Live system diagram",
    "system",
    "Step a request through this portfolio's architecture.",
  ],
  [
    "Alternative universe",
    "alternate",
    "Compare an explicitly hypothetical database-driven version with the current static site.",
  ],
  [
    "Design negotiation",
    "negotiate",
    "Trade visual density for clarity in a sample layout.",
  ],
  [
    "Invisible work",
    "invisible",
    "Reveal loading, empty, error, and focus states in a tiny interface.",
  ],
  [
    "Foldable CV",
    "cv-fold",
    "Fold a typographic CV cover; no invented career history.",
  ],
  [
    "Evidence constellation",
    "evidence",
    "Trace implementation evidence back to the real case study.",
  ],
  [
    "Career transit map",
    "transit",
    "A transit-map layout using project milestones while career details are pending.",
  ],
  [
    "Experience depth",
    "depth",
    "Zoom from an overview into documented contribution details.",
  ],
  [
    "The print edition",
    "print",
    "Open the browser's print dialog for a clean portfolio evidence sheet.",
  ],
  [
    "Role lens",
    "role",
    "Reorder the same project evidence by your reading interest.",
  ],
  [
    "Skill workbench",
    "skill",
    "Inspect demonstrations of implemented features, without claiming unverified personal skills.",
  ],
  [
    "Chronological ribbon",
    "ribbon",
    "Scrub through the documented project timeline.",
  ],
  [
    "Contribution fingerprint",
    "fingerprint",
    "Unroll the project's disclosed human and AI contributions.",
  ],
  [
    "Recruiter tray",
    "shortlist",
    "Save the real project to a local shortlist and export your notes.",
  ],
  [
    "Collaborative constellation",
    "shared-stars",
    "Take turns on this device to add stars to a shared composition.",
  ],
  [
    "Visual relay",
    "relay",
    "Pass the device and let the next person alter one layer.",
  ],
  [
    "Unfinished poster",
    "unfinished",
    "Complete a poster, then pass it on locally.",
  ],
  [
    "Shared rhythm",
    "rhythm",
    "Tap a rhythm on this device and inspect its visual score.",
  ],
  [
    "Community palette",
    "palette",
    "Take turns choosing colors for a palette saved on this device.",
  ],
  [
    "Curated exhibition",
    "curate",
    "Collect favorite studies into your own local exhibition.",
  ],
  [
    "Portfolio postcard",
    "postcard",
    "Make an exportable visual souvenir with a personal message.",
  ],
  [
    "Two-person machine",
    "duet",
    "Two controls, one composition: share a device or use A/D and J/L.",
  ],
  [
    "Transformation chain",
    "chain",
    "Record a local sequence of transformations and step backward.",
  ],
  [
    "Accidental collaboration",
    "accident",
    "Combine two independently seeded visual layers on this device.",
  ],
  [
    "Operating studio",
    "operating",
    "Switch between miniature project, lab, and CV windows.",
  ],
  [
    "Impossible corridor",
    "corridor",
    "Travel down a corridor of repeating project frames.",
  ],
  [
    "Portfolio within portfolio",
    "recursive",
    "Zoom through a nested series of miniature interfaces.",
  ],
  [
    "Browser instrument",
    "instrument",
    "Opt in to sound, then play a short visual instrument.",
  ],
  [
    "The reverse side",
    "reverse",
    "Turn a project card over to its implementation notes.",
  ],
  [
    "One transforming object",
    "transform",
    "Morph one ribbon between Projects, Experiments, and CV.",
  ],
  [
    "Optical illusion gallery",
    "illusion",
    "Change the angles of a geometric interference illusion.",
  ],
  [
    "Your sculpture",
    "sculpture",
    "Shape a radial sculpture and export its silhouette.",
  ],
  [
    "The portfolio stage",
    "stage",
    "Set a scene with curtains, a spotlight, and a central composition.",
  ],
  [
    "A personal visual language",
    "language",
    "Compose a small visual grammar from lines, circles, and folds.",
  ],
];
export const STUDIO_IDEAS = rows.map(([title, scene, description], index) => ({
  id: index + 1,
  title,
  scene,
  description,
  group: STUDIO_GROUPS[Math.floor(index / 10)],
  local: index >= 80 && index < 90,
}));
export const STUDIO_PALETTES = [
  {
    name: "Vermilion",
    background: "#eeede6",
    ink: "#22221f",
    accent: "#c13e26",
    soft: "#d8c3a9",
  },
  {
    name: "After hours",
    background: "#151b2b",
    ink: "#e8e7df",
    accent: "#b7f779",
    soft: "#59667d",
  },
  {
    name: "Ultramarine",
    background: "#e4e9f5",
    ink: "#182751",
    accent: "#2849cf",
    soft: "#a4b4e2",
  },
  {
    name: "Orchid",
    background: "#2b1738",
    ink: "#fae4e9",
    accent: "#ffbb70",
    soft: "#9d6492",
  },
];
export function studioDefaults(id = 1) {
  return {
    id,
    amount: 55,
    x: 50,
    y: 50,
    seed: id * 137,
    palette: 0,
    word: "JONATHAN",
    step: 0,
    points: [],
    turn: 0,
  };
}
export function sanitizeStudio(input = {}) {
  const clamp = (v, min, max, fallback) =>
    Number.isFinite(Number(v))
      ? Math.min(max, Math.max(min, Number(v)))
      : fallback;
  const id = Math.round(clamp(input.id, 1, 100, 1));
  const base = studioDefaults(id);
  return {
    ...base,
    amount: clamp(input.amount, 0, 100, 55),
    x: clamp(input.x, 0, 100, 50),
    y: clamp(input.y, 0, 100, 50),
    seed: Math.round(clamp(input.seed, 0, 999999, base.seed)),
    palette: Math.round(clamp(input.palette, 0, 3, 0)),
    word: typeof input.word === "string" ? input.word.slice(0, 36) : base.word,
    step: Math.round(clamp(input.step, 0, 500, 0)),
    turn: Math.round(clamp(input.turn, 0, 100, 0)),
    points: Array.isArray(input.points)
      ? input.points
          .slice(-80)
          .filter(
            (p) =>
              Array.isArray(p) &&
              p.length === 2 &&
              p.every((n) => typeof n === "number" && Number.isFinite(n)),
          )
          .map((p) => p.map((n) => clamp(n, 0, 100, 50)))
      : [],
  };
}
export function studioNoise(index, seed = 1) {
  const n = Math.sin(index * 127.1 + seed * 311.7) * 43758.5453;
  return n - Math.floor(n);
}
export function cellularWorld(seed, generations, size = 22) {
  let cells = Array.from(
    { length: size * size },
    (_, i) => studioNoise(i, seed) > 0.69,
  );
  for (let n = 0; n < Math.min(generations, 100); n++)
    cells = cells.map((alive, i) => {
      const x = i % size,
        y = Math.floor(i / size);
      let neighbors = 0;
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          if (dx || dy)
            neighbors += cells[
              ((y + dy + size) % size) * size + ((x + dx + size) % size)
            ]
              ? 1
              : 0;
        }
      return neighbors === 3 || (alive && neighbors === 2);
    });
  return cells;
}
