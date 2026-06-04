import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/PageHero";
import { Check } from "lucide-react";
import truckSide from "@/assets/truck-side.jpg.asset.json";
import truckCab from "@/assets/truck-cab.jpg.asset.json";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — LPA Logistics" },
      {
        name: "description",
        content:
          "Local transportation, cross-border logistics and freight coordination across South Africa and the SADC region.",
      },
      { property: "og:title", content: "Services — LPA Logistics" },
      {
        property: "og:description",
        content: "Local & cross-border freight, route planning and coordination.",
      },
    ],
  }),
  component: ServicesPage,
});

const local = [
  "Transportation between suppliers, warehouses and distribution centres",
  "Distribution to retail locations and customer delivery points",
  "Scheduled transport solutions for regular freight movement",
  "Urgent and express freight delivery",
];
const cross = [
  "Botswana",
  "Zimbabwe",
  "Namibia",
  "Mozambique",
  "Zambia",
  "Lesotho",
  "Eswatini",
  "Other SADC destinations",
];

function Detail({
  image,
  eyebrow,
  title,
  desc,
  points,
  reverse,
}: {
  image: string;
  eyebrow: string;
  title: string;
  desc: string;
  points: string[];
  reverse?: boolean;
}) {
  return (
    <section className="py-20 lg:py-24">
      <div
        className={`max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}
      >
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-card">
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</div>
          <h2 className="mt-3 text-3xl lg:text-4xl font-extrabold text-navy text-balance">
            {title}
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed text-lg">{desc}</p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-navy">
                <span className="mt-1 size-5 rounded-full bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                  <Check className="size-3" />
                </span>
                <span className="font-medium">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        <PageHero
          eyebrow="Our services"
          title="Transport solutions, tailored to your business."
          subtitle="Three core service areas — local transportation, cross-border logistics and freight coordination."
        />
        <Services />
        <Detail
          image={truckCab.url}
          eyebrow="Local"
          title="Local transportation across South Africa"
          desc="Flexible, reliable transport for businesses moving goods nationwide. Whether you need single shipments or regular scheduled collections, we deliver consistent, professional service."
          points={local}
        />
        <Detail
          image={truckSide.url}
          eyebrow="Cross-Border"
          title="Cross-border logistics across the SADC region"
          desc="We coordinate the transport requirements, manage border logistics and ensure goods reach their destination safely and on time."
          points={cross}
          reverse
        />
        <Industries />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
