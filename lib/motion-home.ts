import type { Transition, Variants } from "framer-motion";

/** Accueil : entre une fois, repère assez large pour lancer tôt le scroll. */
export const homeViewport = { once: true, amount: 0.2, margin: "-48px" } as const;

export const homeEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function homeTransition(
  delay = 0,
  reduced: boolean,
  duration = 0.55,
): Transition {
  if (reduced) return { duration: 0.01, delay: 0 };
  return { duration, delay, ease: homeEase };
}

export function homeStaggerContainer(reduced: boolean, stagger = 0.09): Variants {
  if (reduced) return { hidden: {}, show: { transition: { staggerChildren: 0 } } };
  return { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: 0.03 } } };
}

export function homeStaggerItem(reduced: boolean, y = 16): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0, transition: { duration: 0 } } };
  }
  return {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: homeEase } },
  };
}
