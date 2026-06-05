# Progress Tracker

## Current Phase

In progress — foundational site complete, polish and enhancements ongoing.

## Current Goal

Context files populated and kept in sync with the current codebase state.

## Completed

- Project scaffold configured (removed Lovable, switched to npm, updated all deps to latest)
- Vercel SSR deployment wired up via Nitro `vercel` preset and Build Output API
- Hero section built with entrance animation (GSAP) and CTA buttons that appear immediately on load
- All local image/logo assets replaced (no CDN placeholders)
- Five routes implemented: `/`, `/about`, `/services`, `/coverage`, `/contact`
- Responsive `SiteHeader` (transparent on homepage, light on inner pages) with mobile hamburger menu
- `SiteFooter` implemented
- Homepage sections: Hero, Who We Are, Services, Why Choose Us, Process, Industries, Coverage, CTA
- `/services` page: PageHero + Services cards + Local/Cross-Border detail sections with images + Industries + CTA
- `/coverage` page: PageHero + Coverage section + Major Corridors cards + CTA
- `/contact` page: PageHero + contact info cards + enquiry form with GSAP field animation and confirmation state
- `context/` files populated with accurate project, architecture, UI, code, and workflow documentation

## In Progress

- Nothing currently in progress.

## Recently Completed

- **Full UI/UX audit pass** (impeccable audit) — 7 files changed:
  - `PRODUCT.md` — created; captures register (brand), users, personality, design principles
  - `SiteHeader.tsx` — header now `fixed` on inner pages (was `absolute`, scrolled off screen); transparent/homepage variant scrolls with the hero then transitions to a solid fixed bar on scroll; `aria-expanded` added to hamburger; ESC key closes mobile menu; backdrop overlay closes mobile menu on outside tap; phone number added to mobile menu; active states on mobile links
  - `contact.tsx` — address icon swapped from `MapPin` to `Building2` (visual weight parity with Phone/Mail); all form inputs now have `id`/`htmlFor` associations; meaningful placeholders on every field; `type="tel"` on phone; `maxLength` on all text fields; service select gets a disabled default "Select a service…" option; client-side validation with inline error messages on submit; `aria-invalid` / `aria-describedby` wired; `noValidate` + React validation owns the flow; success state gains "Send another message" reset; `AlertCircle` error icon in field error messages
  - `styles.css` — `--muted-foreground` bumped from `oklch(0.5 …)` to `oklch(0.44 …)` for WCAG AA 4.5:1 on white; global `::placeholder` rule set to 60% opacity of muted-foreground; global `:focus-visible` outline ring for keyboard nav; inputs/textareas suppressed from the global rule (they use border + ring utilities)
  - `sections/Industries.tsx` — `group-hover:text-white` added to icon so it matches card text on the navy hover state (was blue icon on navy bg = poor contrast)
  - `Hero.tsx` — hero image height is now responsive: `h-80 sm:h-100 md:h-115 lg:h-160` (was fixed `h-[500px]` at all breakpoints, taking ~150% of mobile viewport height)
  - `sections/WhoWeAre.tsx` — "Our promise" overlay card uses `right-0 sm:-right-6` instead of `-right-6` at all widths, preventing it from clipping outside the section's `overflow-hidden` boundary at narrow viewports; canonical Tailwind v4 class names applied (`aspect-4/5`, `bg-linear-to-t`, `max-w-55`)

- Replaced static SVG blob map in `Coverage` section with a proper Southern Africa SVG map
  - New `SouthernAfricaMap` component (`src/components/SouthernAfricaMap.tsx`) renders geographically-faithful simplified paths for South Africa (highlighted in brand blue), Botswana, Zimbabwe, Namibia, Mozambique, Zambia, Lesotho, and Eswatini
  - Animated pulsing city markers (SVG SMIL) for Johannesburg, Cape Town, Durban (primary/large) and Gaborone, Harare, Windhoek, Maputo, Lusaka, Lesotho (secondary/small)
  - Country path entrance animations via CSS keyframes with staggered delays; `prefers-reduced-motion` respected
  - Ocean background, geographic grid lines for context, drop shadows per country

## Next Up

- Wire up the contact form to a real backend (email delivery via a server function or third-party service)
- `/about` page content (currently likely a placeholder — verify)
- SEO: Open Graph image (`og:image` meta tag)
- Accessibility audit (focus states, ARIA labels, color contrast)

## Open Questions

- Contact form backend: which delivery method? (Resend / SendGrid server function, Formspree, Netlify Forms, etc.)
- Should the `/about` page reuse any homepage sections (e.g. Who We Are)?
- Is a sitemap / `robots.txt` needed for SEO?

## Architecture Decisions

- **Nitro vercel preset over vercel.json**: Chose Nitro Build Output API approach because `vercel.json` routing/headers are ignored once a Build Output API directory exists. Security headers are baked into `vite.config.ts` via `routeRules`.
- **Local assets over CDN**: All images are imported from `src/assets/` to avoid CDN placeholder failures and broken builds.
- **Native form elements**: Contact form uses plain HTML inputs rather than shadcn/ui form components because the form is simple and avoids unnecessary dependency weight.

## Session Notes

- The contact form `onSubmit` currently only sets `sent = true` client-side — no actual email is sent. This is a known gap.
- `src/routeTree.gen.ts` is auto-generated; never edit it manually.
- Run `npm run dev` (port 8080) for local development. Build with `npm run build`.
