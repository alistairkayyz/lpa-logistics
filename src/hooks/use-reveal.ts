import { useEffect, useRef } from "react";

type RevealOptions = {
  /** CSS selector for the children to reveal. Defaults to `.reveal`. */
  selector?: string;
  /** Per-item stagger, in milliseconds. */
  stagger?: number;
  /** IntersectionObserver threshold. */
  threshold?: number;
  /** IntersectionObserver rootMargin (reveal slightly before fully in view). */
  rootMargin?: string;
};

/**
 * Scroll-reveal via IntersectionObserver. Progressive enhancement only:
 *
 * - Content is rendered visible by default (SSR / no-JS / crawler safe).
 * - On mount (JS present) the target children are "armed" (hidden via CSS),
 *   then revealed as they enter the viewport — staggered.
 * - If IntersectionObserver is unavailable or the user prefers reduced motion,
 *   nothing is armed and everything stays visible.
 *
 * Attach the returned ref to a container and add the `reveal` class to the
 * children you want to animate in.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options: RevealOptions = {}) {
  const {
    selector = ".reveal",
    stagger = 80,
    threshold = 0.15,
    rootMargin = "0px 0px -8% 0px",
  } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (items.length === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion or no IO support: leave everything visible, do nothing.
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") return;

    items.forEach((el) => el.classList.add("reveal-armed"));

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const index = items.indexOf(el);
          el.style.setProperty("--reveal-delay", `${Math.max(0, index) * stagger}ms`);
          el.classList.add("is-visible");
          obs.unobserve(el);
          // Once revealed, drop the reveal classes so the element returns to its
          // natural styling (e.g. Tailwind hover transitions are no longer
          // overridden by the reveal transition).
          el.addEventListener(
            "transitionend",
            () => {
              el.classList.remove("reveal-armed", "is-visible");
              el.style.removeProperty("--reveal-delay");
            },
            { once: true },
          );
        }
      },
      { threshold, rootMargin },
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, stagger, threshold, rootMargin]);

  return ref;
}
