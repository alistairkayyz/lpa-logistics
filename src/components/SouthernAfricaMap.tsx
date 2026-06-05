import { useEffect, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO numeric codes for the countries we want to render
const SADC_COUNTRIES = new Set([
  "710", // South Africa
  "716", // Zimbabwe
  "894", // Zambia
  "072", // Botswana
  "516", // Namibia
  "508", // Mozambique
  "426", // Lesotho
  "748", // Eswatini
  "024", // Angola
  "454", // Malawi
  "834", // Tanzania
  "180", // DRC
]);

// ISO numeric code for South Africa (highlighted)
const SA_CODE = "710";

// City markers
const cities = [
  { id: "johannesburg", label: "Johannesburg", coords: [28.0473, -26.2041] as [number, number], primary: true },
  { id: "capetown",     label: "Cape Town",    coords: [18.4241, -33.9249] as [number, number], primary: true },
  { id: "durban",       label: "Durban",       coords: [31.0218, -29.8587] as [number, number], primary: true },
  { id: "gaborone",     label: "Gaborone",     coords: [25.9213, -24.6282] as [number, number], primary: false },
  { id: "harare",       label: "Harare",       coords: [31.0522, -17.8292] as [number, number], primary: false },
  { id: "windhoek",     label: "Windhoek",     coords: [17.0658, -22.5597] as [number, number], primary: false },
  { id: "maputo",       label: "Maputo",       coords: [32.5832, -25.9692] as [number, number], primary: false },
  { id: "lusaka",       label: "Lusaka",       coords: [28.3228, -15.4166] as [number, number], primary: false },
];

// Projection config: center on southern Africa, zoom in
const projectionConfig = {
  center: [25, -20] as [number, number],
  scale: 680,
};

function PulseMarker({
  coords,
  label,
  primary,
  delay,
}: {
  coords: [number, number];
  label: string;
  primary: boolean;
  delay: number;
}) {
  const dotR = primary ? 5 : 3.5;
  const dur = primary ? "2.2s" : "2.8s";

  return (
    <Marker coordinates={coords}>
      {/* Outer pulse ring */}
      <circle r={dotR + 4} fill="none" stroke="white" strokeWidth="1.5" opacity="0">
        <animate
          attributeName="r"
          values={`${dotR + 4};${dotR + 16};${dotR + 16}`}
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
      <circle r={dotR + 1} fill="none" stroke="white" strokeWidth="1" opacity="0">
        <animate
          attributeName="r"
          values={`${dotR + 1};${dotR + 9};${dotR + 9}`}
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
        r={dotR}
        fill={primary ? "oklch(0.66 0.19 245)" : "white"}
        stroke="white"
        strokeWidth={primary ? 2 : 1.5}
      />
      {/* Label */}
      <text
        x={dotR + 7}
        y={4}
        fontSize={primary ? 11 : 9.5}
        fontWeight={primary ? "700" : "500"}
        fill="white"
        style={{ fontFamily: "Blinker, system-ui, sans-serif" }}
      >
        {label}
      </text>
    </Marker>
  );
}

export function SouthernAfricaMap() {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger entrance animation after first render
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.66 0.19 245)" }}
      />

      {/* Ocean background circle */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{ background: "radial-gradient(circle at 50% 50%, oklch(0.88 0.04 245) 0%, oklch(0.80 0.05 248) 100%)" }}
      />

      <div
        className="relative w-full h-full transition-opacity duration-700"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={projectionConfig}
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <filter id="drop-shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="oklch(0.12 0.05 252)" floodOpacity="0.45" />
            </filter>
          </defs>

          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies
                .filter((geo) => SADC_COUNTRIES.has(geo.id))
                .map((geo) => {
                  const isSA = geo.id === SA_CODE;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: isSA ? "oklch(0.62 0.18 245)" : "oklch(0.30 0.05 252)",
                          stroke: isSA ? "oklch(0.75 0.18 245)" : "oklch(0.44 0.06 252)",
                          strokeWidth: 0.8,
                          outline: "none",
                          filter: "url(#drop-shadow)",
                        },
                        hover: {
                          fill: isSA ? "oklch(0.66 0.20 245)" : "oklch(0.36 0.06 252)",
                          stroke: isSA ? "oklch(0.78 0.18 245)" : "oklch(0.50 0.07 252)",
                          strokeWidth: 0.8,
                          outline: "none",
                        },
                        pressed: {
                          fill: isSA ? "oklch(0.58 0.16 245)" : "oklch(0.28 0.04 252)",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
            }
          </Geographies>

          {cities.map((city, i) => (
            <PulseMarker
              key={city.id}
              coords={city.coords}
              label={city.label}
              primary={city.primary}
              delay={0.8 + i * 0.15}
            />
          ))}
        </ComposableMap>
      </div>
    </div>
  );
}
