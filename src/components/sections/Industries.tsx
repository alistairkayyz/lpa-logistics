import { Factory, ShoppingCart, Package, Wheat, Ship, Wrench } from "lucide-react";

const items = [
  { icon: Factory, t: "Manufacturing distribution" },
  { icon: ShoppingCart, t: "Retail supply chains" },
  { icon: Package, t: "Wholesale & FMCG" },
  { icon: Wheat, t: "Agricultural products" },
  { icon: Ship, t: "Import & export" },
  { icon: Wrench, t: "Industrial suppliers" },
];

export function Industries() {
  return (
    <section className="py-24 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Industries
          </div>
          <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-navy text-balance">
            Trusted by businesses across sectors.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((i) => (
            <div
              key={i.t}
              className="group bg-card border border-border rounded-xl p-6 text-center hover:bg-navy hover:text-white hover:border-navy transition-all"
            >
              <i.icon className="size-8 mx-auto text-primary group-hover:scale-110 transition-transform" />
              <div className="mt-3 text-sm font-semibold">{i.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
