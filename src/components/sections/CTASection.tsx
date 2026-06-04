import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Mail } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 lg:p-16 text-white shadow-glow">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute -top-32 -right-32 size-96 rounded-full bg-primary/40 blur-[120px]" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-balance">
                Let's move your business <span className="text-primary">forward.</span>
              </h2>
              <p className="mt-5 text-white/75 text-lg leading-relaxed max-w-lg">
                Tell us about your freight requirements and we'll get back to you with a tailored
                transport solution.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-7 py-4 rounded-full hover:scale-[1.04] hover:shadow-glow transition-all"
                >
                  Get a Quote{" "}
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:+27736686252"
                  className="inline-flex items-center gap-2 border border-white/25 hover:bg-white/10 font-semibold px-7 py-4 rounded-full transition-colors"
                >
                  <Phone className="size-4" /> Call us
                </a>
              </div>
            </div>
            <div className="grid gap-4">
              {[
                { i: Phone, l: "Phone", v: "+27 73 668 6252", h: "tel:+27736686252" },
                {
                  i: Mail,
                  l: "Email",
                  v: "info@lpalogistics.co.za",
                  h: "mailto:info@lpalogistics.co.za",
                },
              ].map((c) => (
                <a
                  key={c.l}
                  href={c.h}
                  className="flex items-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-5 transition-colors"
                >
                  <div className="size-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                    <c.i className="size-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/60">{c.l}</div>
                    <div className="font-bold text-lg">{c.v}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
