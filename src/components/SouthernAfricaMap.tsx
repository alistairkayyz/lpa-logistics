import { useEffect, useRef } from "react";

// City markers with approximate SVG coordinate positions
// viewBox is 0 0 800 720 — coordinates mapped from approximate lat/lng of southern Africa
// Longitude range ~12°E (Namibia west) to ~36°E (Mozambique east) → x: 0–800
// Latitude range ~-35°S (Cape Town) to ~-8°S (Zambia) → y: 0–720
const cities = [
  { id: "johannesburg", label: "Johannesburg", x: 508, y: 430, primary: true },
  { id: "capetown",     label: "Cape Town",    x: 390, y: 618, primary: true },
  { id: "durban",       label: "Durban",       x: 582, y: 505, primary: true },
  { id: "gaborone",     label: "Gaborone",     x: 476, y: 380, primary: false },
  { id: "harare",       label: "Harare",       x: 567, y: 265, primary: false },
  { id: "windhoek",     label: "Windhoek",     x: 262, y: 318, primary: false },
  { id: "maputo",       label: "Maputo",       x: 590, y: 460, primary: false },
  { id: "lusaka",       label: "Lusaka",       x: 490, y: 188, primary: false },
  { id: "maseru",       label: "Lesotho",      x: 530, y: 520, primary: false },
];

// Simplified but geographically-faithful country paths
// All paths in viewBox 0 0 800 720
const countries: { id: string; path: string; label: string; highlight?: boolean }[] = [
  {
    id: "south-africa",
    label: "South Africa",
    highlight: true,
    path: `
      M 390 618
      L 345 595 L 305 570 L 270 540 L 248 505 L 240 465
      L 252 430 L 268 400 L 285 375 L 310 360 L 340 350
      L 370 345 L 400 342 L 430 346 L 460 355 L 490 368
      L 520 382 L 548 400 L 568 420 L 578 445
      L 572 468 L 560 490 L 548 508 L 530 522 L 542 535
      L 560 548 L 555 568 L 538 582 L 515 595 L 490 608
      L 460 616 L 430 620 L 400 620 Z
    `,
  },
  {
    id: "lesotho",
    label: "Lesotho",
    path: `
      M 520 492 L 530 485 L 542 488 L 548 498
      L 544 510 L 532 515 L 520 510 L 516 500 Z
    `,
  },
  {
    id: "eswatini",
    label: "Eswatini",
    path: `
      M 572 466 L 580 460 L 590 462 L 594 472
      L 588 480 L 578 480 L 570 474 Z
    `,
  },
  {
    id: "botswana",
    label: "Botswana",
    path: `
      M 340 350 L 310 360 L 290 350 L 272 330 L 260 305
      L 255 275 L 260 248 L 275 232 L 300 225 L 330 228
      L 360 235 L 385 248 L 400 265 L 408 285 L 408 308
      L 400 330 L 385 342 L 370 345 Z
    `,
  },
  {
    id: "namibia",
    label: "Namibia",
    path: `
      M 248 505 L 215 490 L 185 465 L 162 432 L 148 400
      L 140 365 L 140 330 L 148 295 L 162 265 L 178 242
      L 195 225 L 218 215 L 242 218 L 255 225 L 260 248
      L 255 275 L 260 305 L 272 330 L 290 350 L 310 360
      L 285 375 L 268 400 L 252 430 L 240 465 Z
    `,
  },
  {
    id: "zimbabwe",
    label: "Zimbabwe",
    path: `
      M 408 285 L 408 265 L 418 248 L 435 235 L 460 225
      L 490 218 L 518 222 L 542 235 L 560 250 L 568 268
      L 565 290 L 555 308 L 540 320 L 520 328 L 498 330
      L 475 328 L 455 320 L 435 310 L 420 298 Z
    `,
  },
  {
    id: "mozambique",
    label: "Mozambique",
    path: `
      M 568 268 L 580 255 L 598 248 L 618 248 L 635 258
      L 648 275 L 652 298 L 645 322 L 632 342 L 618 358
      L 608 378 L 602 402 L 598 428 L 592 452 L 580 465
      L 570 474 L 572 466 L 578 448 L 568 420 L 548 400
      L 520 382 L 490 368 L 498 330 L 520 328 L 540 320
      L 555 308 L 565 290 Z
    `,
  },
  {
    id: "zambia",
    label: "Zambia",
    path: `
      M 300 225 L 290 208 L 285 188 L 290 168 L 305 152
      L 325 142 L 350 138 L 378 140 L 405 148 L 428 162
      L 448 178 L 462 196 L 468 215 L 460 225 L 435 235
      L 418 248 L 408 265 L 408 285 L 400 265 L 385 248
      L 360 235 L 330 228 Z
    `,
  },
];

function PulseMarker({
  x,
  y,
  label,
  primary,
  delay,
}: {
  x: number;
  y: number;
  label: string;
  primary: boolean;
  delay: number;
}) {
  const dotR = primary ? 5 : 3.5;
  const pulseR1 = primary ? 10 : 7;
  const pulseR2 = primary ? 18 : 13;
  const dur = primary ? "2.2s" : "2.8s";

  // Determine label anchor direction based on x position
  const anchor = x > 560 ? "end" : "start";
  const labelX = x > 560 ? x - 10 : x + 10;

  return (
    <g className="map-marker">
      {/* Outer pulse ring */}
      <circle cx={x} cy={y} r={pulseR1} fill="none" stroke="white" strokeWidth="1.5" opacity="0">
        <animate
          attributeName="r"
          values={`${pulseR1};${pulseR2};${pulseR2}`}
          dur={dur}
          begin={`${delay}s`}
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
        />
        <animate
          attributeName="opacity"
          values="0.7;0;0"
          dur={dur}
          begin={`${delay}s`}
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
        />
      </circle>
      {/* Inner pulse ring */}
      <circle cx={x} cy={y} r={dotR + 2} fill="none" stroke="white" strokeWidth="1" opacity="0">
        <animate
          attributeName="r"
          values={`${dotR + 2};${pulseR1 + 2};${pulseR1 + 2}`}
          dur={dur}
          begin={`${delay + 0.1}s`}
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
        />
        <animate
          attributeName="opacity"
          values="0.5;0;0"
          dur={dur}
          begin={`${delay + 0.1}s`}
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
        />
      </circle>
      {/* Dot */}
      <circle
        cx={x}
        cy={y}
        r={dotR}
        fill={primary ? "oklch(0.66 0.19 245)" : "white"}
        stroke="white"
        strokeWidth={primary ? 2 : 1.5}
      />
      {/* Label */}
      <text
        x={labelX}
        y={y + 4}
        fontSize={primary ? "11" : "9.5"}
        fontWeight={primary ? "700" : "500"}
        fill="white"
        textAnchor={anchor}
        style={{ fontFamily: "Blinker, system-ui, sans-serif" }}
      >
        {label}
      </text>
    </g>
  );
}

export function SouthernAfricaMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  // Stagger in the country fills on mount via CSS animation
  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll(".country-path");
    paths?.forEach((p, i) => {
      (p as SVGElement).style.animationDelay = `${i * 0.06}s`;
    });
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.66 0.19 245)" }}
      />

      <svg
        ref={svgRef}
        viewBox="100 120 700 560"
        className="relative w-full h-full"
        aria-label="Map of Southern Africa showing LPA Logistics service coverage"
      >
        <defs>
          {/* Ocean background gradient */}
          <radialGradient id="ocean-bg" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="oklch(0.88 0.04 245)" />
            <stop offset="100%" stopColor="oklch(0.82 0.05 248)" />
          </radialGradient>

          {/* SA highlight fill */}
          <linearGradient id="sa-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.68 0.20 245)" />
            <stop offset="100%" stopColor="oklch(0.58 0.18 248)" />
          </linearGradient>

          {/* Country base fill */}
          <linearGradient id="country-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.30 0.05 252)" />
            <stop offset="100%" stopColor="oklch(0.26 0.04 252)" />
          </linearGradient>

          {/* Drop shadow filter */}
          <filter id="country-shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="oklch(0.15 0.05 252)" floodOpacity="0.4" />
          </filter>

          <style>{`
            .country-path {
              opacity: 0;
              animation: country-in 0.5s ease-out forwards;
            }
            @keyframes country-in {
              from { opacity: 0; transform: scale(0.97); transform-origin: center; }
              to   { opacity: 1; transform: scale(1);    transform-origin: center; }
            }
            @media (prefers-reduced-motion: reduce) {
              .country-path { opacity: 1; animation: none; }
            }
          `}</style>
        </defs>

        {/* Ocean circle background */}
        <circle cx="450" cy="420" r="310" fill="url(#ocean-bg)" />

        {/* Country fills — non-SA first so SA overlaps cleanly */}
        {countries
          .filter((c) => !c.highlight)
          .map((c) => (
            <path
              key={c.id}
              d={c.path}
              fill="url(#country-fill)"
              stroke="oklch(0.45 0.06 252)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              filter="url(#country-shadow)"
              className="country-path"
            />
          ))}

        {/* South Africa — highlighted */}
        <path
          d={countries.find((c) => c.highlight)!.path}
          fill="url(#sa-fill)"
          stroke="oklch(0.75 0.18 245)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          filter="url(#country-shadow)"
          className="country-path"
        />

        {/* Lesotho cutout (inside SA) */}
        <path
          d={countries.find((c) => c.id === "lesotho")!.path}
          fill="url(#country-fill)"
          stroke="oklch(0.45 0.06 252)"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* City markers */}
        {cities.map((city, i) => (
          <PulseMarker
            key={city.id}
            x={city.x}
            y={city.y}
            label={city.label}
            primary={city.primary}
            delay={0.6 + i * 0.15}
          />
        ))}

        {/* Subtle grid lines for geographic context */}
        <g opacity="0.06" stroke="white" strokeWidth="0.5">
          {/* Lat lines */}
          {[180, 240, 300, 360, 420, 480, 540, 600].map((y) => (
            <line key={`lat-${y}`} x1="100" y1={y} x2="800" y2={y} />
          ))}
          {/* Lon lines */}
          {[160, 220, 280, 340, 400, 460, 520, 580, 640, 700, 760].map((x) => (
            <line key={`lon-${x}`} x1={x} y1="120" x2={x} y2="680" />
          ))}
        </g>
      </svg>
    </div>
  );
}
