import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/sections/Services";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Process } from "@/components/sections/Process";
import { Industries } from "@/components/sections/Industries";
import { Coverage } from "@/components/sections/Coverage";
import { CTASection } from "@/components/sections/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LPA Logistics — Driven by Pride. Delivering with Trust." },
      {
        name: "description",
        content:
          "LPA Logistics is a South African transport company providing reliable local and cross-border freight solutions across South Africa and the SADC region.",
      },
      { property: "og:title", content: "LPA Logistics — Transport & Cross-Border Logistics" },
      {
        property: "og:description",
        content: "Reliable freight across South Africa and the SADC region.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="transparent" />
      <main>
        <Hero />
        <WhoWeAre />
        <Services />
        <WhyChoose />
        <Process />
        <Industries />
        <Coverage />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
