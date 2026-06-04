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
