import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Process } from "@/components/sections/Process";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — LPA Logistics" },
      {
        name: "description",
        content:
          "Learn about LPA Logistics — a South African transport partner built on professionalism, accountability and customer satisfaction.",
      },
      { property: "og:title", content: "About LPA Logistics" },
      { property: "og:description", content: "Driven by Pride. Delivering in time with Trust." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        <PageHero
          eyebrow="About us"
          title="Driven by pride. Delivered with trust."
          subtitle="A South African transport partner providing reliable freight solutions across the SADC region."
        />
        <WhoWeAre />
        <WhyChoose />
        <Process />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
