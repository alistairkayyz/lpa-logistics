import { MapPin } from "lucide-react";

const countries = [
  "South Africa",
  "Botswana",
  "Zimbabwe",
  "Namibia",
  "Mozambique",
  "Zambia",
  "Lesotho",
  "Eswatini",
];

export function Coverage() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Service coverage
          </div>
          <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-navy text-balance">
            Nationwide reach. Regional capability.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed text-lg">
            Comprehensive coverage across South Africa with regular service to major corridors —
            Johannesburg–Cape Town, Johannesburg–Durban — and cross-border logistics throughout the
            SADC region.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {countries.map((c) => (
              <div
                key={c}
                className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2.5"
              >
                <MapPin className="size-4 text-primary" />
                <span className="text-sm font-semibold text-navy">{c}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-square max-w-lg mx-auto w-full">
          <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-10 blur-3xl" />
          <svg viewBox="0 0 500 500" className="relative w-full h-full">
            <defs>
              <radialGradient id="ocean" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.95 0.02 245)" />
                <stop offset="100%" stopColor="oklch(0.88 0.04 245)" />
              </radialGradient>
            </defs>
            <circle cx="250" cy="250" r="240" fill="url(#ocean)" />
            {/* Simplified southern africa silhouette */}
            <path
              d="M150 120 Q210 90 270 110 Q330 100 370 140 Q410 175 400 230 Q420 285 380 330 Q370 380 310 410 Q250 440 195 415 Q140 395 125 340 Q100 285 115 230 Q120 170 150 120 Z"
              fill="oklch(0.32 0.04 252)"
              opacity="0.92"
            />
            {/* SA highlight */}
            <path
              d="M165 290 Q210 275 260 280 Q310 285 350 305 Q360 350 320 390 Q260 420 205 405 Q160 385 155 340 Z"
              fill="oklch(0.66 0.19 245)"
              opacity="0.95"
            />
            {[
              { x: 285, y: 320, label: "Johannesburg" },
              { x: 215, y: 395, label: "Cape Town" },
              { x: 340, y: 360, label: "Durban" },
              { x: 270, y: 200, label: "Harare" },
              { x: 200, y: 200, label: "Gaborone" },
            ].map((p) => (
              <g key={p.label}>
                <circle cx={p.x} cy={p.y} r="6" fill="white" />
                <circle cx={p.x} cy={p.y} r="12" fill="white" opacity="0.25">
                  <animate attributeName="r" values="6;18;6" dur="2.5s" repeatCount="indefinite" />
                  <animate
                    attributeName="opacity"
                    values="0.5;0;0.5"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text x={p.x + 14} y={p.y + 4} fontSize="12" fill="white" fontWeight="700">
                  {p.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
