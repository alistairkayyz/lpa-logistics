import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Truck } from "lucide-react";
import truck from "@/assets/truck-weighbridge.jpg";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.6 })
        .from(".hero-line", { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.12 }, "-=0.3")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from(".hero-stat", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.3")
        .from(".hero-img", { scale: 1.1, opacity: 0, duration: 1.4, ease: "power2.out" }, 0.2);

      // subtle floating motion
      gsap.to(".hero-img-inner", {
        y: -14,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-gradient-hero text-white pt-32 pb-24 lg:pt-40 lg:pb-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      <div className="absolute -top-40 -right-40 size-[600px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 size-[500px] rounded-full bg-primary/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <div className="hero-eyebrow inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold tracking-wider uppercase border border-white/15">
            <Truck className="size-3.5 text-primary" />
            South Africa · SADC Region
          </div>

          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.95] tracking-tight">
            <span className="block overflow-hidden">
              <span className="hero-line block">Moving cargo.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">
                Driven by <span className="text-primary">pride.</span>
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">Delivered with trust.</span>
            </span>
          </h1>

          <p className="hero-sub mt-7 max-w-xl text-lg text-white/75 leading-relaxed text-balance">
            LPA Logistics is a transport partner providing dependable local and cross-border freight
            solutions across South Africa and the Southern African region.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="hero-cta group inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-7 py-4 rounded-full hover:scale-[1.04] hover:shadow-glow transition-all duration-300"
            >
              Request a Quote
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="hero-cta inline-flex items-center gap-2 border border-white/25 hover:bg-white/10 font-semibold px-7 py-4 rounded-full transition-colors"
            >
              Explore Services
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { v: "7+", l: "SADC countries" },
              { v: "24/7", l: "Coordination" },
              { v: "100%", l: "Fleet uptime focus" },
            ].map((s) => (
              <div key={s.l} className="hero-stat">
                <div className="text-3xl sm:text-4xl font-extrabold text-primary">{s.v}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative hero-img">
          <div className="hero-img-inner relative rounded-3xl overflow-hidden shadow-glow ring-1 ring-white/10">
            <img
              src={truck}
              alt="LPA Logistics Volvo FH 440 with curtain-side trailer"
              className="w-full h-[500px] lg:h-[640px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-primary font-semibold">
                  Modern fleet
                </div>
                <div className="text-white font-bold text-xl mt-1">Volvo FH 440 · Curtain-side</div>
              </div>
              <div className="rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-xs font-semibold border border-white/15">
                MN 52 NS GP
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
