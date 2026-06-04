export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative bg-gradient-hero text-white py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -top-32 -right-32 size-[500px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">{eyebrow}</div>
        <h1 className="mt-4 text-5xl lg:text-6xl font-extrabold text-balance max-w-3xl leading-[1.05]">
          {title}
        </h1>
        {subtitle && <p className="mt-6 text-lg text-white/75 max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}
