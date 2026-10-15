import { STUDIO_PALETTES, studioNoise, cellularWorld } from "../lib/studio";
import { projects } from "../content/portfolio";
const TAU = Math.PI * 2;
const many = (n, fn) =>
  Array.from({ length: n }, (_, i) => <g key={i}>{fn(i)}</g>);
export default function StudioScene({ idea, state, svgRef }) {
  const { id, amount, x, y, seed, word, step, points } = state;
  const a = amount / 100,
    p = STUDIO_PALETTES[state.palette],
    cx = x * 10,
    cy = y * 6;
  const rnd = (i) => studioNoise(i, seed),
    text = word || "JONATHAN",
    phase = step * 0.17;
  const label = (value, xx, yy, size = 22, extra = {}) => (
    <text x={xx} y={yy} fontSize={size} fill={p.ink} {...extra}>
      {value}
    </text>
  );
  const line = (x1, y1, x2, y2, extra = {}) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={p.ink} {...extra} />
  );
  const card = (xx, yy, w = 170, h = 220, rotate = 0, title = "PORTFOLIO") => (
    <g transform={`translate(${xx} ${yy}) rotate(${rotate})`}>
      <rect width={w} height={h} rx="3" fill={p.background} stroke={p.ink} />
      <rect
        x="12"
        y="12"
        width={w - 24}
        height={h * 0.5}
        fill={p.accent}
        opacity=".85"
      />
      {line(12, h * 0.65, w - 12, h * 0.65)}
      {label(title, 12, h * 0.77, Math.min(15, w / 10))}
      {label("JONATHAN WALTHER", 12, h * 0.88, Math.min(9, w / 18))}
    </g>
  );
  const ribbon = (offset = 0) => (
    <path
      d={`M 230 ${400 - offset} C ${330 + cx * 0.1} ${500 - a * 300}, ${400 - cx * 0.1} ${70 + a * 250}, 510 ${260 - offset} S ${700 - cx * 0.1} ${550 - a * 300}, 790 ${140 + offset}`}
      fill="none"
      stroke={p.accent}
      strokeWidth={24 + a * 48}
      strokeLinecap="square"
    />
  );
  const node = (xx, yy, r = 8, color = p.accent) => (
    <circle cx={xx} cy={yy} r={r} fill={color} />
  );
  let art;
  switch (idea.scene) {
    case "fold":
    case "cv-fold":
      art = many(5, (i) => (
        <g
          transform={`translate(${160 + i * 140} ${150 + Math.sin(i * a) * 70}) skewY(${(i % 2 ? 1 : -1) * a * 28})`}
        >
          <rect
            width="140"
            height="300"
            fill={i % 2 ? p.soft : p.background}
            stroke={p.ink}
          />
          {label(
            id === 71
              ? ["CV", "JONATHAN", "WALTHER", "DRAFT", "03"][i]
              : ["01", "WORK", "02", "PLAY", "03"][i],
            15,
            170,
            i === 0 ? 45 : 17,
          )}
        </g>
      ));
      break;
    case "line":
      art = (
        <>
          {many(18, (i) => (
            <path
              d={`M 100 ${100 + i * 24} C ${cx} ${cy}, ${1000 - cx} ${600 - cy}, 900 ${500 - i * 24}`}
              fill="none"
              stroke={i % 4 === 0 ? p.accent : p.ink}
              strokeWidth={i % 4 === 0 ? 4 : 1}
            />
          ))}
          {label("EVERYTHING STARTS SOMEWHERE.", 100, 555, 18)}
        </>
      );
      break;
    case "room":
    case "dawn":
    case "day-night":
      art = (
        <g transform={`translate(500 270) scale(${0.6 + a * 0.6})`}>
          <path d="M -320 80 L 0 270 L 320 80 L 0 -110 Z" fill={p.soft} />
          <path
            d="M -320 80 L -320 -200 L 0 -380 L 0 -110 Z"
            fill={p.background}
            stroke={p.ink}
          />
          <path
            d="M 0 -110 L 320 80 L 320 -200 L 0 -380 Z"
            fill={p.ink}
            opacity={id === 59 ? 0.2 + a * 0.7 : 0.12}
          />
          <path d="M -100 0 L 70 -100 L 180 -35 L 10 65 Z" fill={p.accent} />
          {line(-100, 0, -100, 100)}
          {line(180, -35, 180, 65)}
          {line(10, 65, 10, 165)}
          <circle
            cx={-200 + (id === 10 ? rnd(1) * 200 : a * 400)}
            cy="-180"
            r="38"
            fill={p.accent}
          />
        </g>
      );
      break;
    case "press":
      art = (
        <>
          {many(3, (i) => (
            <g
              transform={`translate(${250 + i * a * 95} ${130 + i * a * 70})`}
              opacity=".72"
            >
              <rect
                width="360"
                height="260"
                fill={[p.accent, p.soft, p.ink][i]}
              />
              <text
                x="180"
                y="170"
                textAnchor="middle"
                fill={p.background}
                fontSize="120"
                fontWeight="900"
              >
                JW
              </text>
            </g>
          ))}
          {line(130, 510, 870, 510, { strokeWidth: 12 })}
          {many(7, (i) => node(160 + i * 110, 535, 12, p.ink))}
        </>
      );
      break;
    case "slit":
    case "tear":
      art = (
        <>
          {ribbon()}
          <path
            d={`M 0 0 H ${500 - a * 480} L ${500 - a * 400} 120 L ${500 - a * 470} 230 L ${500 - a * 390} 340 L ${500 - a * 450} 480 L ${500 - a * 480} 600 H 0 Z`}
            fill={p.ink}
          />
          <path
            d={`M 1000 0 H ${500 + a * 480} L ${500 + a * 400} 120 L ${500 + a * 470} 230 L ${500 + a * 390} 340 L ${500 + a * 450} 480 L ${500 + a * 480} 600 H 1000 Z`}
            fill={p.ink}
          />
        </>
      );
      break;
    case "tunnel":
    case "corridor":
    case "recursive":
      art = many(14, (i) => (
        <g
          transform={`translate(${500 + (cx - 500) * i * 0.02} ${300 + (cy - 300) * i * 0.02}) rotate(${id === 92 ? i * a * 6 : 0}) scale(${Math.pow(0.81, i) * (1 + a * 0.45)})`}
        >
          <rect
            x="-380"
            y="-240"
            width="760"
            height="480"
            rx={id === 6 ? 40 : 0}
            fill={id === 93 ? p.background : "none"}
            stroke={i % 3 === 0 ? p.accent : p.ink}
            strokeWidth="2"
          />
          {id === 93 && (
            <>
              {line(-360, -200, 360, -200)}
              {label("JONATHAN WALTHER", -350, -211, 17)}
              {card(-300, -150, 230, 300, 0)}
            </>
          )}
        </g>
      ));
      break;
    case "develop":
      art = (
        <>
          <rect x="160" y="70" width="680" height="460" fill={p.ink} />
          <g opacity={a}>
            {ribbon()}
            {many(60, (i) =>
              node(
                200 + rnd(i) * 600,
                110 + rnd(i + 100) * 380,
                1 + rnd(i + 200) * 5,
                p.background,
              ),
            )}
          </g>
          {label("LIGHT / TIME / POSSIBILITY", 190, 570, 17)}
        </>
      );
      break;
    case "curtain":
      art = many(90, (i) => {
        const col = i % 15,
          row = Math.floor(i / 15);
        const away = Math.sign(col - 7) * (120 * a) * Math.sin(row * 0.5);
        return label(
          String.fromCharCode(65 + (i % 26)),
          100 + col * 54 + away,
          100 + row * 75,
          34,
          { opacity: 0.3 + rnd(i) * 0.7 },
        );
      });
      break;
    case "door":
      art = (
        <>
          <path
            d="M 240 560 V 60 H 760 V 560"
            fill="none"
            stroke={p.ink}
            strokeWidth="8"
          />
          {ribbon()}
          <path
            d={`M 245 65 L ${755 - a * 450} ${65 + a * 70} V ${555 - a * 70} L 245 555 Z`}
            fill={p.ink}
          />
          {node(720 - a * 410, 320, 7, p.background)}
        </>
      );
      break;
    case "diorama":
      art = (
        <>
          <ellipse
            cx="500"
            cy="515"
            rx="300"
            ry="35"
            fill={p.ink}
            opacity=".08"
          />
          {many(3, (i) => (
            <g transform={`translate(0 ${-i * a * 38})`}>
              <path
                d="M180 365 L500 190 L820 365 L500 540 Z"
                fill={i === 2 ? p.background : p.soft}
                stroke={p.ink}
              />
              <path
                d="M180 365 L500 540 L820 365 V385 L500 560 L180 385Z"
                fill={i === 1 ? p.accent : p.soft}
                stroke={p.ink}
              />
            </g>
          ))}
          <g transform={`translate(315 ${165 - a * 95}) skewY(-15)`}>
            <path d="M0 0 H260 V190 H0Z" fill={p.ink} />
            <path d="M10 10 H250 V170 H10Z" fill={p.background} />
            {label("Jonathan Walther", 24, 35, 12)}
            {label("Projects.", 24, 78, 37, { fontWeight: 900 })}
            <rect x="24" y="98" width="105" height="55" fill={p.accent} />
            {line(145, 108, 225, 108)}
            {line(145, 123, 210, 123)}
            {line(145, 138, 220, 138)}
            <path
              d="M110 190 V215 H170 V190"
              fill="none"
              stroke={p.ink}
              strokeWidth="6"
            />
          </g>
          {many(4, (i) => (
            <g
              transform={`translate(${650 + (i % 2) * 45} ${290 + Math.floor(i / 2) * 40 - a * 60})`}
            >
              {line(0, 0, 0, 60, { strokeWidth: 4 })}
              <ellipse
                cy="-5"
                rx={20 + i * 3}
                ry={35 + i * 4}
                fill={i % 2 ? p.accent : p.ink}
              />
            </g>
          ))}
          <path
            d={`M 250 ${390 - a * 90} L 370 ${455 - a * 90} L 430 ${420 - a * 90} L 310 ${355 - a * 90} Z`}
            fill={p.accent}
          />
          {label("A SMALL WORLD, BUILT AROUND THE WORK.", 500, 575, 13, {
            textAnchor: "middle",
          })}
        </>
      );
      break;
    case "terrarium":
      art = (
        <>
          <ellipse
            cx="500"
            cy="500"
            rx="285"
            ry="65"
            fill={p.soft}
            stroke={p.ink}
          />
          {many(20, (i) => {
            const xx = 290 + rnd(i) * 420,
              yy = 410 + rnd(i + 77) * 95,
              h = 30 + a * (50 + rnd(i + 55) * 160);
            return (
              <g>
                {line(xx, yy, xx, yy - h, { strokeWidth: 2 })}
                <ellipse
                  cx={xx - 13}
                  cy={yy - h * 0.65}
                  rx="22"
                  ry="8"
                  fill={p.accent}
                  transform={`rotate(30 ${xx - 13} ${yy - h * 0.65})`}
                />
                <ellipse
                  cx={xx + 13}
                  cy={yy - h * 0.85}
                  rx="22"
                  ry="8"
                  fill={p.ink}
                  transform={`rotate(-30 ${xx + 13} ${yy - h * 0.85})`}
                />
              </g>
            );
          })}
          <path
            d="M215 500 V310 A285 260 0 0 1 785 310 V500"
            fill="url(#studio-light)"
            fillOpacity=".2"
            stroke={p.ink}
          />
          <path
            d="M290 250 Q330 130 440 100"
            fill="none"
            stroke={p.background}
            strokeWidth="9"
          />
          {label("PORTFOLIO / LIVING SPECIMEN", 500, 560, 16, {
            textAnchor: "middle",
          })}
        </>
      );
      break;
    case "explode":
    case "autopsy":
      art = many(4, (i) => (
        <g
          transform={`translate(${240 + i * a * 65} ${340 - i * a * 85}) skewY(-15)`}
        >
          <rect
            width="380"
            height="140"
            fill={i % 2 ? p.soft : p.background}
            stroke={p.ink}
          />
          {label(
            [
              "DELIVERY / NEXT.JS",
              "INTERFACE / REACT",
              "DESIGN / TYPOGRAPHY",
              "CONTENT / VERIFIED DATA",
            ][i],
            20,
            80,
            18,
          )}
        </g>
      ));
      break;
    case "drawers":
      art = many(3, (i) => (
        <g transform={`translate(${210 + a * (i + 1) * 30} ${75 + i * 160})`}>
          <path
            d="M 0 0 H 500 L 550 40 V 140 H 50 L 0 100 Z"
            fill={p.soft}
            stroke={p.ink}
          />
          <rect
            x="50"
            y="40"
            width="500"
            height="100"
            fill={p.background}
            stroke={p.ink}
          />
          {label(
            ["01 / THE BRIEF", "02 / THE APPROACH", "03 / THE RESULT"][i],
            80,
            100,
            22,
          )}
          {line(450, 90, 510, 90, { strokeWidth: 5 })}
        </g>
      ));
      break;
    case "shelf":
      art = (
        <>
          {line(120, 490, 880, 490, { strokeWidth: 8 })}
          {many(8, (i) => (
            <g
              transform={`translate(${160 + i * 90} 490) rotate(${(rnd(i) - 0.5) * a * 45})`}
            >
              <rect
                y={-200 - rnd(i) * 100}
                width="65"
                height={200 + rnd(i) * 100}
                fill={i % 2 ? p.accent : p.soft}
                stroke={p.ink}
              />
              {label(String(i + 1).padStart(2, "0"), 12, -25, 26)}
            </g>
          ))}
        </>
      );
      break;
    case "constellation":
    case "shared-stars":
    case "evidence":
      art = (
        <>
          {many(16, (i) => {
            const xx = 500 + Math.cos(i * 2.4 + phase) * (90 + i * 15) * a,
              yy = 300 + Math.sin(i * 2.4 + phase) * (60 + i * 10) * a;
            return (
              <>
                {line(500, 300, xx, yy, { opacity: 0.25 })}
                {node(xx, yy, 5 + (i % 4))}
                {i < 4 &&
                  label(
                    ["CONTENT", "INTERACTION", "DELIVERY", "EVIDENCE"][i],
                    xx + 14,
                    yy,
                    12,
                  )}
              </>
            );
          })}
          {points.map(([xx, yy], i) => (
            <g key={i}>
              {line(500, 300, xx * 10, yy * 6, { opacity: 0.3 })}
              {node(xx * 10, yy * 6, 8)}
            </g>
          ))}
          {node(500, 300, 24)}
        </>
      );
      break;
    case "passport":
      art = (
        <g transform={`translate(220 100) rotate(${-8 + a * 16} 280 200)`}>
          <rect
            width="560"
            height="400"
            rx="12"
            fill={p.background}
            stroke={p.ink}
          />
          {line(280, 0, 280, 400)}
          {label("PROJECT PASSPORT", 30, 60, 20)}
          {label("PORTFOLIO", 30, 110, 32)}
          {label("NEXT.JS / REACT", 30, 155, 16)}
          {label("IN PROGRESS", 310, 90, 22)}
          {many(5, (i) => (
            <circle
              cx={330 + rnd(i) * 170}
              cy={170 + rnd(i + 9) * 160}
              r={20 + rnd(i + 6) * 20}
              fill="none"
              stroke={p.accent}
            />
          ))}
          {label("PERSONAL PROJECT", 310, 360, 14)}
        </g>
      );
      break;
    case "machine":
    case "system":
      art = (
        <>
          {many(3, (i) => (
            <g transform={`translate(${90 + i * 310} 200)`}>
              <rect
                width="210"
                height="170"
                rx="16"
                fill={i === step % 3 ? p.accent : p.soft}
              />
              {label(["CONTENT", "INTERFACE", "DELIVERY"][i], 20, 75, 21)}
              {label(
                ["portfolio.js", "React / SVG", "Next.js"][i],
                20,
                115,
                17,
              )}
              {i < 2 && line(220, 85, 300, 85, { strokeDasharray: "5 5" })}
            </g>
          ))}
          {node(190 + (step % 3) * 310, 435, 10)}
          {label("ADVANCE TO FOLLOW THE REQUEST", 280, 520, 17)}
        </>
      );
      break;
    case "miniature":
    case "operating":
      art = (
        <g
          transform={`translate(${170 - a * 100} ${90 - a * 60}) scale(${0.65 + a * 0.7})`}
        >
          <rect
            width="660"
            height="430"
            rx="10"
            fill={p.background}
            stroke={p.ink}
          />
          {line(0, 55, 660, 55)}
          {label("Jonathan Walther", 25, 35, 22)}
          {label(
            ["Projects.", "Experiments.", "CV."][id === 91 ? step % 3 : 0],
            35,
            145,
            65,
          )}
          {card(35, 190, 240, 200, 0)}
          {label("A closer look at the work.", 310, 225, 20)}
          {label("The decisions, the details.", 310, 265, 16)}
        </g>
      );
      break;
    case "glass":
    case "light":
    case "hologram":
    case "materials":
    case "frost":
    case "sensitive":
      art = (
        <>
          {id === 53 ? (
            label(text, 500, 340, 100, {
              textAnchor: "middle",
              fontWeight: 900,
            })
          ) : (
            <g>
              {ribbon()}
              <path
                d={`M230 400 C330 ${500 - a * 300} 400 ${70 + a * 250} 510 260 S700 ${550 - a * 300} 790 140`}
                fill="none"
                stroke={
                  id === 52
                    ? "url(#studio-spectrum)"
                    : id === 55 && step % 3 === 0
                      ? p.soft
                      : "url(#studio-metal)"
                }
                strokeWidth={24 + a * 48}
              />
            </g>
          )}
          <ellipse
            cx={cx}
            cy={cy}
            rx={110 + a * 180}
            ry={100 + a * 100}
            fill={id === 52 ? "url(#studio-spectrum)" : "url(#studio-light)"}
            opacity={id === 55 ? [0.2, 0.75, 0.4][step % 3] : 0.8}
          />
          {many(7, (i) => (
            <path
              d={`M ${200 + i * 40} 100 L ${400 + i * 40} 500`}
              fill="none"
              stroke={p.ink}
              opacity=".1"
            />
          ))}
          {id === 55 &&
            label(["PAPER", "CHROME", "GLASS"][step % 3], 70, 540, 18)}
        </>
      );
      break;
    case "gravity":
      art = many(55, (i) => {
        const xx = 80 + rnd(i) * 840,
          yy = 70 + rnd(i + 99) * 460;
        return (
          <g
            transform={`translate(${xx + (cx - 500) * a * 0.2} ${yy * (1 - a) + 510 * a}) rotate(${rnd(i + 8) * a * 180})`}
          >
            <rect
              x="-12"
              y="-12"
              width={18 + rnd(i + 10) * 25}
              height={18 + rnd(i + 10) * 25}
              fill={i % 3 ? p.ink : p.accent}
            />
          </g>
        );
      });
      break;
    case "elastic":
    case "cloth":
    case "loom":
      art = (
        <>
          {many(22, (i) => (
            <path
              d={`M 80 ${65 + i * 22} Q ${cx} ${cy + (i - 11) * a * 15} 920 ${65 + i * 22}`}
              fill="none"
              stroke={i % 4 ? p.ink : p.accent}
              strokeWidth={i % 4 ? 1 : 3}
            />
          ))}
          {many(30, (i) => (
            <path
              d={`M ${80 + i * 29} 50 Q ${cx + (i - 15) * a * 20} ${cy} ${80 + i * 29} 550`}
              fill="none"
              stroke={p.ink}
              opacity=".3"
            />
          ))}
          {id === 34 &&
            label(text, 500, 330, 78, {
              textAnchor: "middle",
              fontWeight: 900,
            })}
        </>
      );
      break;
    case "memory":
    case "trail":
      art = (
        <>
          {points.length > 1 && (
            <polyline
              points={points
                .map(([xx, yy]) => `${xx * 10},${yy * 6}`)
                .join(" ")}
              fill="none"
              stroke={p.soft}
              strokeWidth="2"
            />
          )}
          {points.map(([xx, yy], i) => (
            <g key={i}>
              {id === 33
                ? label(text[i % text.length], xx * 10, yy * 6, 24 + a * 38, {
                    textAnchor: "middle",
                  })
                : node(xx * 10, yy * 6, 8 + a * 30, i % 2 ? p.ink : p.accent)}
            </g>
          ))}
          {!points.length &&
            label("TAP TO LEAVE SOMETHING BEHIND", 500, 310, 24, {
              textAnchor: "middle",
            })}
        </>
      );
      break;
    case "spring":
      art = many(9, (i) =>
        card(
          360 + Math.sin(i * 0.45) * a * 180,
          250 - i * 16 - a * i * 12,
          250,
          210,
          (i - 4) * a * 12,
          `CHAPTER ${i + 1}`,
        ),
      );
      break;
    case "liquid":
    case "organism":
    case "transform":
    case "sculpture":
      art = (
        <>
          {many(id === 47 ? 14 : 32, (i) => {
            const angle = (i / 32) * TAU + phase,
              r = 90 + a * 100 + Math.sin(i * 0.8 + phase) * a * 55;
            const xx = 500 + Math.cos(angle) * r,
              yy = 300 + Math.sin(angle) * r;
            return id === 47 ? (
              <path
                d={`M 500 300 Q ${xx} ${yy} ${500 + Math.cos(angle) * r * 1.6} ${300 + Math.sin(angle) * r * 1.6}`}
                fill="none"
                stroke={p.accent}
                strokeWidth={14 - i * 0.6}
                strokeLinecap="round"
              />
            ) : (
              node(xx, yy, 15 + a * 35, i % 6 === 0 ? p.ink : p.accent)
            );
          })}
          {id === 96 &&
            label(["PROJECTS", "EXPERIMENTS", "CV"][step % 3], 500, 550, 18, {
              textAnchor: "middle",
            })}
        </>
      );
      break;
    case "rail":
      art = (
        <>
          {line(100, 300, 900, 300, { strokeWidth: 2 })}
          {many(30, (i) => {
            const xx = 110 + i * 27,
              dy = Math.exp(-Math.pow((xx - cx) / 140, 2)) * a * 190;
            return (
              <>
                {line(xx, 300, xx, 300 - dy, { opacity: 0.2 })}
                {node(xx, 300 - dy, 8, i % 3 ? p.ink : p.accent)}
              </>
            );
          })}
          {node(cx, 420, 24)}
        </>
      );
      break;
    case "balance":
      art = (
        <>
          {line(500, 50, 500, 150)}
          {many(5, (i) => (
            <g
              transform={`translate(500 ${150 + i * 70}) rotate(${(x - 50) * (i % 2 ? 1 : -1) * a})`}
            >
              {line(-250 + i * 30, 0, 250 - i * 30, 0, { strokeWidth: 3 })}
              {line(-250 + i * 30, 0, -250 + i * 30, 35)}
              {node(-250 + i * 30, 55, 25 - i * 3)}
              {line(250 - i * 30, 0, 250 - i * 30, 35)}
              {node(250 - i * 30, 55, 18 + i * 2, p.ink)}
            </g>
          ))}
        </>
      );
      break;
    case "lens":
      art = (
        <>
          {many(8, (i) =>
            label("JONATHAN WALTHER · WORK · PLAY · ", 45, 90 + i * 62, 25, {
              opacity: 0.3,
            }),
          )}
          <circle
            cx={cx}
            cy={cy}
            r={65 + a * 100}
            fill={p.background}
            stroke={p.ink}
            strokeWidth="3"
          />
          {label(text, cx, cy + 15, 24 + a * 25, { textAnchor: "middle" })}
        </>
      );
      break;
    case "mosaic":
      art = (
        <>
          {many(108, (i) => {
            const xx = 140 + (i % 18) * 40,
              yy = 150 + Math.floor(i / 18) * 48;
            return (
              <g opacity={1 - a * 0.8}>
                <image
                  href={projects[0].cover.src}
                  x={xx}
                  y={yy}
                  width="36"
                  height="44"
                  preserveAspectRatio="xMidYMid slice"
                />
              </g>
            );
          })}
          {label("JONATHAN", 500, 320, 48 + a * 60, {
            textAnchor: "middle",
            fontWeight: 900,
          })}
          {label("WALTHER", 500, 420, 48 + a * 60, {
            textAnchor: "middle",
            fontWeight: 900,
          })}
        </>
      );
      break;
    case "architecture":
    case "suspend":
    case "sentence":
    case "foundry":
    case "anamorphic":
    case "type-landscape":
    case "shadow":
    case "echo":
      art = (
        <>
          {text
            .slice(0, 18)
            .split("")
            .map((c, i) => {
              const xx =
                  500 +
                  (i - (Math.min(18, text.length) - 1) / 2) *
                    Math.min(70, 800 / Math.max(1, text.length)),
                yy = 320 + Math.sin(i * 0.7 + phase) * a * 100;
              return (
                <g
                  key={i}
                  transform={`translate(${xx} ${yy}) rotate(${id === 37 ? (rnd(i) - 0.5) * (1 - a) * 150 : id === 39 ? (1 - a) * 70 : 0}) skewX(${id === 39 ? (1 - a) * 55 : 0})`}
                >
                  {id === 35 && line(0, -300, 0, -60)}
                  {[36, 57].includes(id) && (
                    <text
                      x={(x - 50) * a}
                      y={(y - 50) * a}
                      fontSize="100"
                      fontWeight="900"
                      fill={p.accent}
                      opacity=".55"
                    >
                      {c}
                    </text>
                  )}
                  <text
                    textAnchor="middle"
                    fontSize={id === 32 ? 80 + a * rnd(i) * 100 : 85}
                    fontWeight="900"
                    fill={id === 38 ? "none" : p.ink}
                    stroke={id === 38 ? p.accent : undefined}
                    strokeWidth="3"
                  >
                    {c}
                  </text>
                </g>
              );
            })}
        </>
      );
      break;
    case "city":
      art = many(projects[0].stack.length * 16, (i) => {
        const col = i % 8,
          row = Math.floor(i / 8),
          xx = 480 + (col - row) * 48,
          yy = 130 + (col + row) * 25,
          h = 20 + rnd(i) * a * 160;
        return (
          <>
            <path
              d={`M ${xx} ${yy} l 42 22 v ${h} l -42 -22 Z`}
              fill={p.soft}
              stroke={p.ink}
            />
            <path
              d={`M ${xx + 42} ${yy + 22} l 42 -22 v ${h} l -42 22 Z`}
              fill={p.accent}
              stroke={p.ink}
            />
            <path
              d={`M ${xx} ${yy} l 42 -22 l 42 22 l -42 22 Z`}
              fill={p.background}
              stroke={p.ink}
            />
          </>
        );
      });
      break;
    case "coral":
    case "river":
      art = many(70, (i) => {
        let xx = 500,
          yy = id === 48 ? 60 : 530;
        const segments = [];
        const depth = 2 + Math.floor(a * 6);
        for (let j = 0; j < depth; j++) {
          const nx = xx + (rnd(i * 9 + j) - 0.5) * (120 + j * 32),
            ny = yy + (id === 48 ? 1 : -1) * (25 + j * 7);
          segments.push(`${nx},${ny}`);
          xx = nx;
          yy = ny;
        }
        return (
          <polyline
            points={`500,${id === 48 ? 60 : 530} ${segments.join(" ")}`}
            fill="none"
            stroke={i % 6 ? p.ink : p.accent}
            strokeWidth={1 + rnd(i) * 3}
            opacity=".65"
          />
        );
      });
      break;
    case "reaction":
      art = many(400, (i) => {
        const xx = 100 + (i % 25) * 33,
          yy = 65 + Math.floor(i / 25) * 31;
        const value =
          Math.sin(xx * 0.025 + a * 8) * Math.cos(yy * 0.035 + phase) +
          Math.sin(Math.hypot(xx - cx, yy - cy) * 0.04);
        return node(
          xx,
          yy,
          2 + Math.abs(value) * 5,
          value > 0 ? p.accent : p.ink,
        );
      });
      break;
    case "flock":
      art = many(180, (i) => {
        const angle = rnd(i) * TAU + phase * 0.1,
          r = 30 + rnd(i + 999) * 300,
          xx = cx * 0.5 + 250 + Math.cos(angle) * r,
          yy = cy * 0.5 + 150 + Math.sin(angle) * r * 0.55;
        return (
          <path
            d={`M ${xx - 5} ${yy + 4} l 5 -8 l 5 8`}
            fill="none"
            stroke={i % 5 ? p.ink : p.accent}
            transform={`rotate(${((angle + a) * 180) / Math.PI} ${xx} ${yy})`}
          />
        );
      });
      break;
    case "cells":
      art = cellularWorld(seed, step).map((alive, i) =>
        alive ? (
          <rect
            key={i}
            x={245 + (i % 22) * 23}
            y={48 + Math.floor(i / 22) * 23}
            width="20"
            height="20"
            rx={a * 10}
            fill={i % 4 ? p.ink : p.accent}
          />
        ) : null,
      );
      break;
    case "stained":
      art = many(60, (i) => {
        const xx = 100 + (i % 10) * 80,
          yy = 60 + Math.floor(i / 10) * 80,
          shift = (rnd(i) - 0.5) * a * 60;
        return (
          <path
            d={`M ${xx} ${yy} l ${80} ${shift} l -${rnd(i + 99) * 60} 80 l -${80 - rnd(i + 99) * 60} -${shift} Z`}
            fill={[p.accent, p.soft, p.ink][i % 3]}
            stroke={p.background}
            strokeWidth="3"
          />
        );
      });
      break;
    case "erosion":
    case "caustic":
      art = many(38, (i) => (
        <path
          d={`M 40 ${80 + i * 12} ${Array.from({ length: 35 }, (_, j) => `L ${40 + j * 28} ${80 + i * 12 + Math.sin(j * 0.3 + i * 0.2 + phase) * a * 50 + Math.cos(j * 0.6 - i * 0.3) * a * 30}`).join(" ")}`}
          fill="none"
          stroke={i % 4 ? p.ink : p.accent}
          strokeWidth={id === 54 ? 2 : 1}
          opacity={id === 54 ? 0.2 + i / 70 : 1}
        />
      ));
      break;
    case "ecosystem":
      art = many(12, (i) => (
        <g
          transform={`translate(${80 + (i % 4) * 235 + (rnd(i) - 0.5) * a * 50} ${80 + Math.floor(i / 4) * 170}) rotate(${(rnd(i + 9) - 0.5) * a * 18})`}
        >
          <rect
            width="190"
            height="120"
            rx={5 + a * 20}
            fill={i % 3 ? p.soft : p.accent}
          />
          {line(20, 30, 150, 30, { strokeWidth: 7 })}
          {line(20, 55, 120, 55, { strokeWidth: 4 })}
          <rect
            x="20"
            y="78"
            width="60"
            height="20"
            rx="10"
            fill={p.background}
          />
        </g>
      ));
      break;
    case "only-shadow":
      art = many(8, (i) => (
        <ellipse
          cx={350 + i * 35 + (x - 50) * i * 0.3}
          cy={400 - i * 25 + (y - 50) * i * 0.2}
          rx={80 + a * 70}
          ry={25 + a * 10}
          fill={p.ink}
          opacity={0.06 + i * 0.04}
        />
      ));
      break;
    case "wire":
      art = (
        <>
          {many(18, (i) => (
            <ellipse
              cx="500"
              cy="300"
              rx={190 * Math.sin(((i + 1) / 19) * Math.PI)}
              ry="210"
              fill="none"
              stroke={p.ink}
              transform={`rotate(${a * 80} 500 300)`}
            />
          ))}
          <ellipse
            cx="500"
            cy="300"
            rx="190"
            ry="210"
            fill={p.accent}
            opacity={a}
          />
        </>
      );
      break;
    case "decision":
    case "constraint":
    case "alternate":
    case "negotiate":
      art = (
        <>
          {many(3, (i) => (
            <g transform={`translate(${110 + i * 290} 140)`}>
              <rect
                width="230"
                height={
                  170 +
                  (i === 0 ? 1 - a : i === 1 ? a : Math.sin(a * Math.PI)) * 160
                }
                fill={i === step % 3 ? p.accent : p.soft}
              />
              {label(["CLARITY", "EXPRESSION", "MAINTENANCE"][i], 12, 40, 16)}
              {label(
                `${Math.round((i === 0 ? 1 - a : i === 1 ? a : 0.5) * 100)}`,
                12,
                100,
                52,
              )}
            </g>
          ))}
          {label("EXPLORATION, NOT MEASURED PROJECT METRICS", 500, 550, 16, {
            textAnchor: "middle",
          })}
        </>
      );
      break;
    case "failure":
    case "invisible":
      art = (
        <g transform="translate(190 130)">
          <rect
            width="620"
            height="330"
            rx="12"
            fill={p.background}
            stroke={p.ink}
          />
          {label(
            id === 64
              ? a < 0.5
                ? "A VERY LONG UNBROKEN TITLE"
                : "A title that wraps gracefully"
              : [
                  "LOADING…",
                  "NO RESULTS",
                  "SOMETHING WENT WRONG",
                  "KEYBOARD FOCUS",
                ][step % 4],
            30,
            80,
            id === 64 && a < 0.5 ? 28 : 22,
          )}
          {many(3, (i) => (
            <rect
              x="30"
              y={120 + i * 48}
              width={a < 0.5 ? 550 : Math.max(100, 520 - i * 100)}
              height="24"
              rx="4"
              fill={p.soft}
            />
          ))}
          <rect
            x="30"
            y="270"
            width="170"
            height="40"
            rx="5"
            fill={p.accent}
            stroke={id === 70 && step % 4 === 3 ? p.ink : "none"}
            strokeWidth="5"
          />
          {label("TRY AGAIN", 50, 297, 16)}
        </g>
      );
      break;
    case "history":
    case "ribbon":
    case "transit":
      art = (
        <>
          {line(130, 300, 870, 300, { strokeWidth: 6 })}
          {projects[0].timeline.map((t, i) => (
            <g key={t.date}>
              {node(220 + i * 540, 300, 18 + i * a * 18)}
              {label(t.date, 160 + i * 540, 245, 20)}
              {label(t.title, 160 + i * 540, 370, 17)}
            </g>
          ))}
          {node(150 + a * 700, 300, 11, p.background)}
        </>
      );
      break;
    case "complexity":
    case "depth":
    case "skill":
    case "fingerprint":
      art = (
        <>
          {many(5, (i) => (
            <g
              opacity={a * 5 >= i ? 1 : 0.12}
              transform={`translate(130 ${80 + i * 100})`}
            >
              <circle cx="16" cy="10" r="14" fill={p.accent} />
              {label(
                [
                  "DIRECTION / JONATHAN WALTHER",
                  "IMPLEMENTATION / AI ASSISTED",
                  "VERIFICATION / AUTOMATED CHECKS",
                  "INTERFACE / REACT & SVG",
                  "DELIVERY / NEXT.JS STANDALONE",
                ][i],
                55,
                18,
                21,
              )}
              {line(55, 42, 735, 42, { opacity: 0.2 })}
            </g>
          ))}
        </>
      );
      break;
    case "print":
    case "role":
    case "shortlist":
    case "postcard":
    case "unfinished":
      art = (
        <g transform={`translate(230 75) rotate(${(x - 50) * 0.1} 270 230)`}>
          <rect width="540" height="450" fill={p.background} stroke={p.ink} />
          {label("JONATHAN WALTHER", 35, 55, 24)}
          {line(35, 80, 505, 80)}
          {label(
            id === 87 || id === 83 ? text : "SELECTED WORK",
            35,
            140,
            Math.min(32, (450 / Math.max(text.length, 10)) * 1.5),
          )}
          {ribbon(-35)}
          {label(
            id === 80
              ? "LOCAL SHORTLIST"
              : id === 75
                ? "PORTFOLIO / EVIDENCE EDITION"
                : "PROJECTS / EXPERIMENTS / CV",
            35,
            415,
            14,
          )}
        </g>
      );
      break;
    case "relay":
    case "chain":
    case "accident":
      art = (
        <>
          {many(8, (i) => (
            <g transform={`translate(500 300) rotate(${i * 45 + phase * 30})`}>
              <rect
                x={40 + a * 80}
                y="-30"
                width={160 + rnd(i) * 100}
                height="60"
                rx={a * 30}
                fill={i % 2 ? p.accent : p.soft}
              />
            </g>
          ))}
          {node(500, 300, 35, p.ink)}
        </>
      );
      break;
    case "rhythm":
    case "instrument":
      art = (
        <>
          {many(24, (i) => (
            <g transform={`translate(${80 + i * 36} 300)`}>
              <rect
                y={-15 - rnd(i + step) * a * 160}
                width="24"
                height={30 + rnd(i + step) * a * 320}
                rx="12"
                fill={i % 3 ? p.ink : p.accent}
              />
            </g>
          ))}
          {id === 84 &&
            points.map(([xx, yy], i) => (
              <g key={i}>{node(80 + xx * 8.4, 510 - yy * 2, 5)}</g>
            ))}
          {label(
            id === 94
              ? "SOUND STARTS ONLY WHEN YOU ENABLE IT"
              : "TAP A RHYTHM · PASS IT ON",
            500,
            555,
            16,
            { textAnchor: "middle" },
          )}
        </>
      );
      break;
    case "palette":
      art = many(5, (i) => (
        <g>
          <rect
            x={100 + i * 160}
            y="110"
            width="160"
            height="370"
            fill={`hsl(${(seed + i * 40 + amount) % 360} 60% ${25 + i * 12}%)`}
          />
          {label(String(i + 1).padStart(2, "0"), 120 + i * 160, 525, 22)}
        </g>
      ));
      break;
    case "curate":
      art = many(9, (i) =>
        card(
          130 + (i % 3) * 260,
          60 + Math.floor(i / 3) * 170,
          220,
          135,
          (rnd(i) - 0.5) * a * 8,
          `STUDY ${String(1 + ((seed + i * 11) % 100)).padStart(3, "0")}`,
        ),
      );
      break;
    case "duet":
      art = (
        <>
          {many(40, (i) => {
            const angle = (i / 40) * TAU;
            return node(
              500 + Math.cos(angle) * (80 + x * 2),
              300 + Math.sin(angle) * (30 + y * 2),
              5 + a * 12,
              i % 2 ? p.ink : p.accent,
            );
          })}
          {line(100, 300, 900, 300, { opacity: 0.2 })}
        </>
      );
      break;
    case "reverse":
      art = (
        <g
          transform={`translate(500 300) scale(${Math.max(0.08, Math.abs(Math.cos(a * Math.PI)))} 1)`}
        >
          <rect
            x="-280"
            y="-200"
            width="560"
            height="400"
            fill={a > 0.5 ? p.ink : p.accent}
          />
          <text textAnchor="middle" y="-90" fill={p.background} fontSize="32">
            {a > 0.5 ? "THE REVERSE SIDE" : "PORTFOLIO"}
          </text>
          {[
            a > 0.5 ? "CONTENT → REACT → NEXT.JS" : "JONATHAN WALTHER",
            a > 0.5
              ? "STATIC CONTENT · AI ASSISTED"
              : "PROJECTS / EXPERIMENTS / CV",
          ].map((t, i) => (
            <text
              key={t}
              textAnchor="middle"
              y={i * 60}
              fill={p.background}
              fontSize="18"
            >
              {t}
            </text>
          ))}
        </g>
      );
      break;
    case "illusion":
      art = many(36, (i) => (
        <rect
          x={190 + i * 5}
          y={25 + i * 7}
          width={620 - i * 10}
          height={550 - i * 14}
          fill="none"
          stroke={i % 2 ? p.ink : p.accent}
          strokeWidth="2"
          transform={`rotate(${i * a * 3} 500 300)`}
        />
      ));
      break;
    case "stage":
      art = (
        <>
          <rect x="80" y="70" width="840" height="470" fill={p.ink} />
          <path
            d={`M 500 80 L ${100 + a * 180} 530 H ${900 - a * 180} Z`}
            fill={p.background}
            opacity=".12"
          />
          {ribbon()}
          <rect
            x="80"
            y="70"
            width={280 * (1 - a)}
            height="470"
            fill={p.accent}
          />
          <rect
            x={920 - 280 * (1 - a)}
            y="70"
            width={280 * (1 - a)}
            height="470"
            fill={p.accent}
          />
        </>
      );
      break;
    case "language":
      art = (
        <>
          {many(16, (i) => (
            <g
              transform={`translate(${170 + (i % 4) * 210} ${100 + Math.floor(i / 4) * 135}) rotate(${step * 15 + i * a * 30})`}
            >
              {i % 3 === 0 ? (
                <circle r="35" fill="none" stroke={p.accent} strokeWidth="14" />
              ) : i % 3 === 1 ? (
                <path
                  d="M -35 -35 L 35 35 L 35 -35"
                  fill={p.soft}
                  stroke={p.ink}
                  strokeWidth="2"
                />
              ) : (
                <path
                  d="M -40 20 Q 0 -65 40 20"
                  fill="none"
                  stroke={p.ink}
                  strokeWidth="8"
                />
              )}
            </g>
          ))}
        </>
      );
      break;
    default:
      art = ribbon();
  }
  return (
    <svg
      ref={svgRef}
      className="studio-art"
      viewBox="0 0 1000 600"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${idea.title}: ${idea.description}`}
      style={{ background: p.background }}
    >
      <defs>
        <linearGradient id="studio-metal" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#15171b" />
          <stop offset=".2" stopColor="#747779" />
          <stop offset=".35" stopColor="#f7f3e8" />
          <stop offset=".4" stopColor="#27292c" />
          <stop offset=".7" stopColor="#17191b" />
          <stop offset=".84" stopColor="#e4ded1" />
          <stop offset="1" stopColor="#414345" />
        </linearGradient>
        <radialGradient id="studio-light">
          <stop stopColor={p.background} />
          <stop offset=".35" stopColor={p.soft} stopOpacity=".7" />
          <stop offset="1" stopColor={p.accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="studio-spectrum">
          <stop stopColor="#ff7e9a" />
          <stop offset=".35" stopColor="#82edcf" />
          <stop offset=".65" stopColor="#ac9bff" />
          <stop offset="1" stopColor="#ffc978" />
        </linearGradient>
      </defs>
      <rect width="1000" height="600" fill={p.background} />
      <g
        fontFamily="Arial, Helvetica, sans-serif"
        transform={`translate(${(x - 50) * 0.2} ${(y - 50) * 0.12})`}
      >
        {art}
        {id === 41 &&
          label(projects[0].stack.join(" / "), 500, 560, 17, {
            textAnchor: "middle",
          })}
      </g>
      <text x="32" y="35" fontFamily="monospace" fontSize="12" fill={p.ink}>
        {String(id).padStart(3, "0")} / JONATHAN WALTHER
      </text>
      <text
        x="968"
        y="575"
        textAnchor="end"
        fontFamily="monospace"
        fontSize="11"
        fill={p.ink}
      >
        {idea.title.toUpperCase()}
      </text>
    </svg>
  );
}
