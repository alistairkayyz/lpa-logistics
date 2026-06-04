import { CheckCircle2 } from "lucide-react";
import truck from "@/assets/truck-cab.jpg";
import { useReveal } from "@/hooks/use-reveal";

export function WhoWeAre() {
  const root = useReveal<HTMLElement>({ selector: ".wwa-reveal", stagger: 100 });

  return (
    <section ref={root} className="py-24 lg:py-32 bg-secondary/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-card">
            <img
              src={truck}
              alt="LPA Logistics truck cab"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl px-6 py-5 shadow-glow max-w-[220px]">
            <div className="text-xs uppercase tracking-widest opacity-80">Our promise</div>
            <div className="mt-1 font-bold text-lg leading-tight">
              Delivering in time with trust.
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="wwa-reveal text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Who we are
          </div>
          <h2 className="wwa-reveal mt-3 text-4xl lg:text-5xl font-extrabold text-navy text-balance">
            A transport partner built on professionalism and accountability.
          </h2>
          <p className="wwa-reveal mt-6 text-lg text-muted-foreground leading-relaxed">
            We work with businesses that require dependable transportation — from local distribution
            to regional cross-border movement. Our focus is delivering practical, professional
            transport solutions that help your business move products efficiently and confidently.
          </p>

          <div className="wwa-reveal mt-10 grid sm:grid-cols-2 gap-5">
            {[
              {
                t: "Our Vision",
                d: "A trusted logistics partner recognised for reliable transport and customer satisfaction.",
              },
              {
                t: "Our Mission",
                d: "Efficient, dependable transport solutions that support the growth of our clients' businesses.",
              },
            ].map((b) => (
              <div key={b.t} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <CheckCircle2 className="size-5" /> {b.t}
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
