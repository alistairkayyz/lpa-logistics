# UI Context

## Theme

Light by default. Dark mode is supported via a `.dark` class (custom variant via `@custom-variant dark`). The visual language is clean and professional — white backgrounds, a navy brand color for headings and body text, and a bold blue primary accent for interactive elements and highlights.

## Colors

All colors are defined as CSS custom properties in `src/styles.css`. Use these tokens — no hardcoded hex or oklch values in components.

| Role                 | CSS Variable              | Light value (approx)          | Dark value (approx)          |
| -------------------- | ------------------------- | ----------------------------- | ----------------------------- |
| Page background      | `--background`            | White                         | Dark navy `#1e2233`          |
| Surface / card       | `--card`                  | White                         | Slightly lighter navy         |
| Primary text / navy  | `--navy`                  | `#2D425C`                     | White                        |
| Muted text           | `--muted-foreground`      | Medium grey                   | Light grey                   |
| Primary accent       | `--primary`               | `#0691FF` (blue)              | Lighter blue                 |
| Primary on accent    | `--primary-foreground`    | White                         | Dark navy                    |
| Border               | `--border`                | Light grey                    | White/10%                    |
| Input border         | `--input`                 | Light grey                    | White/15%                    |
| Destructive / error  | `--destructive`           | Red-orange                    | —                            |

### Gradients and shadows (utilities)

| Utility              | Variable                  | Usage                                              |
| -------------------- | ------------------------- | -------------------------------------------------- |
| `bg-gradient-hero`   | `--gradient-hero`         | Hero section background (dark navy → blue)         |
| `bg-gradient-primary`| `--gradient-primary`      | Accent icons and CTA badges                        |
| `shadow-glow`        | `--shadow-glow`           | Glowing shadow on primary buttons and badges       |
| `shadow-card`        | `--shadow-card`           | Soft shadow on cards                               |

## Typography

| Role             | Font           | CSS Variable        |
| ---------------- | -------------- | ------------------- |
| All UI text      | Blinker        | `--font-sans`       |
| Display headings | Blinker        | `--font-display`    |

Blinker is loaded via `@font-face` in `src/styles.css` (weights 300, 400, 600, 700, 800) from Google Fonts CDN with `font-display: swap`. Headings use `font-weight: 700`, `letter-spacing: -0.02em`.

## Border Radius

Base radius variable is `--radius: 0.75rem`.

| Context               | Class / value                        |
| --------------------- | ------------------------------------ |
| Inline / small UI     | `rounded-md` (`--radius-md`)         |
| Inputs, tags          | `rounded-xl`                         |
| Cards / panels        | `rounded-2xl`                        |
| Large cards / sections| `rounded-3xl`                        |
| Pill buttons / badges | `rounded-full`                       |

## Component Library

shadcn/ui on top of Tailwind v4 and Radix UI primitives. Components live in `src/components/ui/`. Use the shadcn CLI to add new components — do not hand-edit files in that directory.

## Layout Patterns

- **Max content width**: `max-w-7xl mx-auto px-6 lg:px-10`
- **Section vertical padding**: `py-20 lg:py-24`
- **Hero**: Full-viewport dark gradient (`bg-gradient-hero`) with `bg-grid` overlay. Uses absolute-positioned `SiteHeader` with `variant="transparent"`.
- **Inner pages**: `SiteHeader` with default `variant="light"` (white bar, border-bottom). `main` has `pt-20` to clear the fixed header.
- **Cards**: `bg-card border border-border rounded-2xl p-7` with `hover:border-primary/40 hover:shadow-card transition-all`
- **CTA buttons**: `rounded-full` pill shape, `hover:scale-[1.03] hover:shadow-glow transition-all`
- **Two-column detail sections**: `grid lg:grid-cols-2 gap-12 items-center` with optional `reverse` for image/text swap.

## Icons

Lucide React (`lucide-react`). Stroke-based icons only.

- Inline / label: `size-4` (16 px)
- Buttons: `size-4` or `size-5`
- Feature icons / badges: `size-5`
- Success / large state: `size-8`

## Animations

GSAP 3 with `@gsap/react`. Usage:

- Hero CTA buttons: entrance animation on mount
- Contact form fields: staggered `y: 20, opacity: 0` entrance via `useGSAP` scoped to the form container
- Input focus/blur: `gsap.to` border color transition (use `oklch(0.66 0.19 245)` for focus, `oklch(0.92 0.01 252)` for blur)
