import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import icon from "@/assets/lpa-icon.png";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={icon} alt="" className="h-10 w-auto" />
            <div>
              <div className="font-extrabold text-xl tracking-tight">
                LPA <span className="text-primary">Logistics</span>
              </div>
              <div className="text-xs text-white/60">
                Driven by Pride. Delivering in time with Trust.
              </div>
            </div>
          </div>
          <p className="mt-5 text-white/70 max-w-md text-sm leading-relaxed">
            Reliable freight solutions across South Africa and the SADC region. Built on
            professionalism, accountability and customer satisfaction.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/90">Company</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link to="/about" className="hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary">
                Services
              </Link>
            </li>
            <li>
              <Link to="/coverage" className="hover:text-primary">
                Coverage
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/90">
            Get in touch
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <Phone className="size-4 mt-0.5 text-primary" /> +27 73 668 6252
            </li>
            <li className="flex items-start gap-2">
              <Mail className="size-4 mt-0.5 text-primary" /> info@lpalogistics.co.za
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="size-4 mt-0.5 text-primary" /> Proton Industrial Park, Chloorkop,
              Gauteng 1624
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 text-xs text-white/50 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} LPA Logistics. All rights reserved.</span>
          <span>Part of the Niraida Logistics Group of Companies</span>
        </div>
      </div>
    </footer>
  );
}
