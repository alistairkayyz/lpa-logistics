import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "@tanstack/react-router";
import { Truck, Globe2, Route, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Local Transportation",
    desc: "Reliable freight movement across South Africa — distribution, retail supply, scheduled collections and express delivery.",
    points: ["Supplier ↔ warehouse", "Retail distribution", "Scheduled & express"],
  },
  {
    icon: Globe2,
    title: "Cross-Border Logistics",
    desc: "Regional transport across SADC borders — Botswana, Zimbabwe, Namibia, Mozambique, Zambia, Lesotho, Eswatini.",
    points: ["Border coordination", "Customs liaison", "End-to-end visibility"],
  },
  {
    icon: Route,
    title: "Freight Coordination",
    desc: "Route planning, shipment scheduling and real-time communication keep your supply chain moving with confidence.",
    points: ["Route optimization", "Live updates", "Dedicated coordinator"],
  },
];

export function Services() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".svc-card");
      cards.forEach((card) => {
        const icon = card.querySelector(".svc-icon");
        const arrow = card.querySelector(".svc-arrow");
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, duration: 0.4, ease: "power2.out" });
          gsap.to(icon, { rotate: -8, scale: 1.1, duration: 0.4, ease: "back.out(2)" });
          gsap.to(arrow, { x: 6, y: -6, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.4, ease: "power2.out" });
          gsap.to(icon, { rotate: 0, scale: 1, duration: 0.4, ease: "power2.out" });
          gsap.to(arrow, { x: 0, y: 0, duration: 0.3 });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            What we do
          </div>
          <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-navy text-balance">
            Practical transport solutions, tailored to your operation.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link
              key={s.title}
              to="/services"
              className="svc-card group relative bg-card border border-border rounded-2xl p-8 shadow-card overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 size-40 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
              <div className="relative">
                <div className="svc-icon inline-flex size-14 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-glow">
                  <s.icon className="size-7" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-navy">{s.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                <ul className="mt-5 space-y-1.5 text-sm text-navy/80">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary">Learn more</span>
                  <ArrowUpRight className="svc-arrow size-5 text-primary" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
