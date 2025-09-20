// lib/motion.ts
import type { Variants, Transition } from "framer-motion";

// expo-out 느낌의 베지어 (원하는 커브로 바꿔도 됨)
export const easeOutExpo: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};
