import { useReveal } from "@/hooks/use-reveal";

const steps = [
  { n: "01", t: "Understand", d: "We learn your business, supply chain and transport needs." },
  { n: "02", t: "Plan", d: "Routes, schedules and resources aligned to your requirements." },
  { n: "03", t: "Execute", d: "Professional, accountable transport operations." },
  { n: "04", t: "Communicate", d: "Clear updates throughout the journey." },
  { n: "05", t: "Improve", d: "We listen, learn and continuously improve service." },
];

export function Process() {
  const root = useReveal<HTMLElement>({ selector: ".step" });

  return (
    <section ref={root} className="py-24 lg:py-32 bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Our approach
          </div>
          <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-balance">
            A clear process behind every shipment.
          </h2>
        </div>

        <div className="mt-16 relative">
          <div className="step-line absolute top-9 left-0 right-0 h-px bg-gradient-to-r from-primary via-primary/40 to-transparent hidden md:block" />
          <div className="grid md:grid-cols-5 gap-8 relative">
            {steps.map((s) => (
              <div key={s.n} className="step">
                <div className="size-18 size-[72px] rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-extrabold text-lg backdrop-blur">
                  {s.n}
                </div>
                <h3 className="mt-5 text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
