import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Coverage } from "@/components/sections/Coverage";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/coverage")({
  head: () => ({
    meta: [
      { title: "Coverage — LPA Logistics" },
      {
        name: "description",
        content:
          "Nationwide South African coverage and cross-border service across the SADC region.",
      },
      { property: "og:title", content: "Service Coverage — LPA Logistics" },
      { property: "og:description", content: "South Africa & SADC region freight coverage." },
    ],
  }),
  component: CoveragePage,
});

const corridors = [
  {
    t: "Johannesburg ↔ Cape Town",
    d: "Regular long-haul service on South Africa's busiest corridor.",
  },
  { t: "Johannesburg ↔ Durban", d: "Reliable freight to and from the port and KZN region." },
  { t: "Gauteng ↔ SADC", d: "Cross-border routes to Botswana, Zimbabwe, Mozambique and beyond." },
];

function CoveragePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        <PageHero
          eyebrow="Coverage"
          title="Nationwide reach. Regional capability."
          subtitle="Comprehensive coverage across South Africa and the Southern African region."
        />
        <Coverage />
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-navy">Major corridors</h2>
            <div className="mt-10 grid md:grid-cols-3 gap-5">
              {corridors.map((c) => (
                <div
                  key={c.t}
                  className="bg-card border border-border rounded-2xl p-7 hover:border-primary/40 hover:shadow-card transition-all"
                >
                  <div className="text-primary font-bold">{c.t}</div>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
