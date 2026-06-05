import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/lpa-logo.png";
import icon from "@/assets/lpa-icon.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/coverage", label: "Coverage" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ variant = "light" }: { variant?: "light" | "transparent" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection — only meaningful for the transparent (homepage) variant.
  // Inner-page headers are always fixed with a solid background.
  useEffect(() => {
    if (variant !== "transparent") return;
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  // Close mobile menu on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Transparent variant: overlay the hero at top, transition to solid on scroll.
  // Light variant: always fixed with a solid background.
  const isFixed = variant === "light" || scrolled;
  const onDark = variant === "transparent" && !scrolled;

  return (
    <header
      className={[
        isFixed ? "fixed" : "absolute",
        "top-0 inset-x-0 z-50 transition-all duration-300",
        onDark
          ? "text-white"
          : "text-navy bg-background/95 backdrop-blur-sm border-b border-border shadow-sm",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={onDark ? icon : logo}
            alt="LPA Logistics"
            className={onDark ? "h-10 w-auto" : "h-9 w-auto"}
          />
          {onDark && (
            <span className="font-bold text-lg tracking-tight hidden sm:inline">
              LPA <span className="text-primary">Logistics</span>
            </span>
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors hover:text-primary ${
                onDark ? "text-white/90" : "text-navy"
              }`}
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+27736686252"
            className={`hidden md:inline-flex items-center gap-2 text-sm font-semibold ${onDark ? "text-white/90" : "text-navy"} hover:text-primary transition-colors`}
          >
            <Phone className="size-4" />
            +27 73 668 6252
          </a>
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-full text-sm hover:scale-[1.03] hover:shadow-glow transition-all"
          >
            Get a Quote
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md hover:bg-black/5 transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <>
          {/* Backdrop — closes menu when tapping outside */}
          <div
            className="fixed inset-0 -z-10 bg-black/20 lg:hidden"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-nav"
            className="lg:hidden bg-background border-t border-border text-navy"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="py-3 font-semibold border-b border-border last:border-0 hover:text-primary transition-colors"
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <a
                href="tel:+27736686252"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center gap-2 py-3 font-semibold text-navy hover:text-primary transition-colors border-b border-border"
              >
                <Phone className="size-4" />
                +27 73 668 6252
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex justify-center bg-primary text-primary-foreground font-semibold px-5 py-3 rounded-full hover:shadow-glow transition-all"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
