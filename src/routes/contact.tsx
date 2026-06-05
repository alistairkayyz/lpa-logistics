import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Phone, Mail, Building2, Send, Check, AlertCircle } from "lucide-react";

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

const fieldDelay = (i: number) => ({ "--anim-delay": `${i * 70}ms` }) as CSSProperties;

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

function validate(form: HTMLFormElement): FormErrors {
  const data = new FormData(form);
  const errs: FormErrors = {};

  const name = (data.get("name") as string)?.trim() ?? "";
  const email = (data.get("email") as string)?.trim() ?? "";
  const phone = (data.get("phone") as string)?.trim() ?? "";
  const message = (data.get("message") as string)?.trim() ?? "";

  if (!name) errs.name = "Full name is required.";
  else if (name.length < 2) errs.name = "Please enter your full name.";

  if (!email) errs.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errs.email = "Enter a valid email address.";

  if (phone && !/^[\+\d][\d\s\-\(\)]{6,18}$/.test(phone))
    errs.phone = "Enter a valid phone number (e.g. +27 82 123 4567).";

  if (!message) errs.message = "Please tell us how we can help.";
  else if (message.length < 10)
    errs.message = "Please provide a bit more detail (at least 10 characters).";

  return errs;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive">
      <AlertCircle className="size-3.5 shrink-0" />
      {msg}
    </p>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  function inputClass(hasError?: boolean) {
    return [
      "mt-2 w-full rounded-xl border bg-background px-4 py-3 outline-none transition-all",
      "placeholder:text-muted-foreground/55",
      "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15",
      hasError
        ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/15"
        : "border-border",
    ].join(" ");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(e.currentTarget);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Focus first error field
      const first = e.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setErrors({});
    setSent(true);
  }

  function clearError(field: keyof FormErrors) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

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
            {/* Contact info cards */}
            <div className="lg:col-span-2 space-y-5">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+27 73 668 6252",
                  href: "tel:+27736686252",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "info@lpalogistics.co.za",
                  href: "mailto:info@lpalogistics.co.za",
                },
                {
                  icon: Building2,
                  label: "Address",
                  value:
                    "Proton Industrial Park, Proton Street, Chloorkop, Gauteng 1624, South Africa",
                },
              ].map((c) => {
                const content = (
                  <>
                    <div className="size-12 shrink-0 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center shadow-glow">
                      <c.icon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        {c.label}
                      </div>
                      <div className="font-bold text-navy mt-0.5 wrap-break-word">{c.value}</div>
                    </div>
                  </>
                );
                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    className="flex items-start gap-4 bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-card transition-all"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={c.label}
                    className="flex items-start gap-4 bg-card border border-border rounded-2xl p-5"
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            {/* Enquiry form */}
            <div className="lg:col-span-3 bg-card border border-border rounded-3xl p-8 lg:p-10 shadow-card">
              {sent ? (
                <div className="flex flex-col items-center text-center py-10">
                  <div className="size-16 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                    <Check className="size-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-navy">Message sent</h3>
                  <p className="mt-2 text-muted-foreground">
                    Thank you for reaching out. We'll be in touch shortly.
                  </p>
                  <button
                    onClick={() => { setSent(false); setErrors({}); }}
                    className="mt-6 text-sm text-primary font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="anim-rise" style={fieldDelay(0)}>
                      <label htmlFor="name" className="text-sm font-semibold text-navy">
                        Full name <span className="text-destructive" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        maxLength={80}
                        placeholder="Enter your full name"
                        className={inputClass(!!errors.name)}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        onChange={() => clearError("name")}
                      />
                      <FieldError msg={errors.name} />
                    </div>
                    <div className="anim-rise" style={fieldDelay(1)}>
                      <label htmlFor="company" className="text-sm font-semibold text-navy">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        maxLength={100}
                        placeholder="Your company name"
                        className={inputClass()}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="anim-rise" style={fieldDelay(2)}>
                      <label htmlFor="email" className="text-sm font-semibold text-navy">
                        Email address <span className="text-destructive" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        maxLength={150}
                        placeholder="yourname@example.com"
                        className={inputClass(!!errors.email)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        onChange={() => clearError("email")}
                      />
                      <FieldError msg={errors.email} />
                    </div>
                    <div className="anim-rise" style={fieldDelay(3)}>
                      <label htmlFor="phone" className="text-sm font-semibold text-navy">
                        Phone number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        maxLength={20}
                        placeholder="+27 82 123 4567"
                        className={inputClass(!!errors.phone)}
                        aria-invalid={!!errors.phone || undefined}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        onChange={() => clearError("phone")}
                      />
                      <FieldError msg={errors.phone} />
                    </div>
                  </div>

                  <div className="anim-rise" style={fieldDelay(4)}>
                    <label htmlFor="service" className="text-sm font-semibold text-navy">
                      Service of interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      defaultValue=""
                      className={inputClass()}
                    >
                      <option value="" disabled>
                        Select a service…
                      </option>
                      <option value="local">Local Transportation</option>
                      <option value="cross-border">Cross-Border Logistics</option>
                      <option value="freight">Freight Coordination</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="anim-rise" style={fieldDelay(5)}>
                    <label htmlFor="message" className="text-sm font-semibold text-navy">
                      How can we help? <span className="text-destructive" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      maxLength={2000}
                      placeholder="Tell us about your freight requirements — origin, destination, cargo type, frequency…"
                      className={`${inputClass(!!errors.message)} resize-none`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      onChange={() => clearError("message")}
                    />
                    <FieldError msg={errors.message} />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Fields marked <span className="text-destructive font-semibold">*</span> are required.
                  </p>

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
