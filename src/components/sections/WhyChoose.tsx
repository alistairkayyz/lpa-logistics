import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  MessageCircle,
  ShieldAlert,
  Globe2,
  UserCheck,
  Handshake,
} from "lucide-react";
import { Counter } from "@/components/Counter";

const items = [
  {
    icon: ShieldCheck,
    t: "Reliable Delivery",
    d: "We meet agreed schedules and deliver cargo safely, every time.",
  },
  {
    icon: MessageCircle,
    t: "Professional Service",
    d: "Clear communication and responsive support across every shipment.",
  },
  {
    icon: ShieldAlert,
    t: "Safety Focus",
    d: "Cargo, drivers and stakeholders are prioritised at every stage.",
  },
  {
    icon: Globe2,
    t: "Regional Capability",
    d: "Domestic and SADC cross-border solutions under one roof.",
  },
  {
    icon: UserCheck,
    t: "Customer-Centred",
    d: "Services tailored to your unique transport requirements.",
  },
  {
    icon: Handshake,
    t: "Dependable Partnership",
    d: "Long-term relationships built on trust and consistent performance.",
  },
];

export function WhyChoose() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".why-card", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".why-grid", start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Why choose LPA
            </div>
            <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-navy text-balance">
              Six reasons businesses trust us with their freight.
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-8 lg:gap-12">
            {[
              { v: 7, s: "+", l: "SADC routes" },
              { v: 100, s: "%", l: "Safety focus" },
              { v: 24, s: "/7", l: "Coordination" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-3xl lg:text-4xl font-extrabold text-navy">
                  <Counter to={s.v} suffix={s.s} />
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="why-grid mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((i) => (
            <div
              key={i.t}
              className="why-card group bg-card border border-border rounded-2xl p-7 hover:border-primary/40 hover:shadow-card transition-all"
            >
              <div className="inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <i.icon className="size-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-navy">{i.t}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed text-sm">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
