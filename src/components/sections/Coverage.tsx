import { MapPin } from "lucide-react";
import { SouthernAfricaMap } from "@/components/SouthernAfricaMap";

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
          <p className="mt-5 text-muted-foreground leading-relaxed text-lg max-w-[60ch]">
            Comprehensive coverage across South Africa with regular service on major corridors:
            Johannesburg to Cape Town, Johannesburg to Durban, and cross-border logistics
            throughout the SADC region.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {countries.map((c) => (
              <div
                key={c}
                className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2.5"
              >
                <MapPin className="size-4 text-primary shrink-0" />
                <span className="text-sm font-semibold text-navy">{c}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-square max-w-lg mx-auto w-full">
          <SouthernAfricaMap />
        </div>
      </div>
    </section>
  );
}
