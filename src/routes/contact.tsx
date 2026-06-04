import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Phone, Mail, MapPin, Send, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — LPA Logistics" },
      {
        name: "description",
        content:
          "Get in touch with LPA Logistics for transport and cross-border freight enquiries.",
      },
      { property: "og:title", content: "Contact LPA Logistics" },
      { property: "og:description", content: "Let's move your business forward." },
    ],
  }),
  component: ContactPage,
});

// Staggered CSS entrance delay for the form fields.
const fieldDelay = (i: number) => ({ "--anim-delay": `${i * 70}ms` }) as CSSProperties;

const inputClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary";

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        <PageHero
          eyebrow="Contact"
          title="Let's move your business forward."
          subtitle="Tell us about your freight requirements and we'll come back to you with a tailored solution."
        />

        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-5">
              {[
                { i: Phone, l: "Phone", v: "+27 73 668 6252", h: "tel:+27736686252" },
                {
                  i: Mail,
                  l: "Email",
                  v: "info@lpalogistics.co.za",
                  h: "mailto:info@lpalogistics.co.za",
                },
                {
                  i: MapPin,
                  l: "Address",
                  v: "Proton Industrial Park, Proton Street, Chloorkop, Gauteng 1624, South Africa",
                },
              ].map((c) => {
                const Content = (
                  <>
                    <div className="size-12 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center shadow-glow">
                      <c.i className="size-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        {c.l}
                      </div>
                      <div className="font-bold text-navy mt-0.5">{c.v}</div>
                    </div>
                  </>
                );
                return c.h ? (
                  <a
                    key={c.l}
                    href={c.h}
                    className="flex items-start gap-4 bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-card transition-all"
                  >
                    {Content}
                  </a>
                ) : (
                  <div
                    key={c.l}
                    className="flex items-start gap-4 bg-card border border-border rounded-2xl p-5"
                  >
                    {Content}
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-3 bg-card border border-border rounded-3xl p-8 lg:p-10 shadow-card">
              {sent ? (
                <div className="flex flex-col items-center text-center py-10">
                  <div className="size-16 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                    <Check className="size-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-navy">Message sent</h3>
                  <p className="mt-2 text-muted-foreground">We'll be in touch shortly.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-5"
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="anim-rise" style={fieldDelay(0)}>
                      <label className="text-sm font-semibold text-navy">Name</label>
                      <input required className={inputClass} />
                    </div>
                    <div className="anim-rise" style={fieldDelay(1)}>
                      <label className="text-sm font-semibold text-navy">Company</label>
                      <input className={inputClass} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="anim-rise" style={fieldDelay(2)}>
                      <label className="text-sm font-semibold text-navy">Email</label>
                      <input required type="email" className={inputClass} />
                    </div>
                    <div className="anim-rise" style={fieldDelay(3)}>
                      <label className="text-sm font-semibold text-navy">Phone</label>
                      <input className={inputClass} />
                    </div>
                  </div>
                  <div className="anim-rise" style={fieldDelay(4)}>
                    <label className="text-sm font-semibold text-navy">Service of interest</label>
                    <select className={inputClass}>
                      <option>Local Transportation</option>
                      <option>Cross-Border Logistics</option>
                      <option>Freight Coordination</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="anim-rise" style={fieldDelay(5)}>
                    <label className="text-sm font-semibold text-navy">How can we help?</label>
                    <textarea required rows={5} className={`${inputClass} resize-none`} />
                  </div>
                  <button
                    type="submit"
                    className="anim-rise group inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-7 py-4 rounded-full hover:scale-[1.03] hover:shadow-glow transition-all"
                    style={fieldDelay(6)}
                  >
                    Send message
                    <Send className="size-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
