import { Link } from "@tanstack/react-router";
import { useState } from "react";
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
  const onDark = variant === "transparent";

  return (
    <header
      className={`absolute top-0 inset-x-0 z-50 ${onDark ? "text-white" : "text-navy bg-background border-b border-border"}`}
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
            className="lg:hidden p-2 rounded-md"
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border text-navy">
          <div className="px-6 py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 font-semibold border-b border-border last:border-0"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex justify-center bg-primary text-primary-foreground font-semibold px-5 py-3 rounded-full"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
