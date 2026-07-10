/**
 * MD3 Motion 繝医・繧ｯ繝ｳ逕滓・
 * 繝医Λ繝ｳ繧ｸ繧ｷ繝ｧ繝ｳ duration 縺ｨ easing
 */

const MOTION_TOKENS: Record<string, string> = {
  /* Duration */
  "duration-short1": "50ms",
  "duration-short2": "100ms",
  "duration-short3": "150ms",
  "duration-short4": "200ms",
  "duration-medium1": "250ms",
  "duration-medium2": "300ms",
  "duration-medium3": "350ms",
  "duration-medium4": "400ms",
  "duration-long1": "450ms",
  "duration-long2": "500ms",
  "duration-long3": "550ms",
  "duration-long4": "600ms",
  "duration-extra-long1": "700ms",
  "duration-extra-long2": "800ms",
  "duration-extra-long3": "900ms",
  "duration-extra-long4": "1000ms",

  /* Easing */
  "easing-standard": "cubic-bezier(0.2, 0, 0, 1)",
  "easing-standard-decelerate": "cubic-bezier(0, 0, 0, 1)",
  "easing-standard-accelerate": "cubic-bezier(0.3, 0, 1, 1)",
  "easing-emphasized": "cubic-bezier(0.2, 0, 0, 1)",
  "easing-emphasized-decelerate": "cubic-bezier(0.05, 0.7, 0.1, 1)",
  "easing-emphasized-accelerate": "cubic-bezier(0.3, 0, 0.8, 0.15)",
};

/**
 * 繝｢繝ｼ繧ｷ繝ｧ繝ｳ繝医・繧ｯ繝ｳ CSS 繧堤函謌舌☆繧九・ */
export function generateMotionCSS(): string {
  const lines: string[] = [];

  for (const [key, value] of Object.entries(MOTION_TOKENS)) {
    lines.push(`  --sc-sys-motion-${key}: ${value};`);
  }

  return `/* ==========================================================
 * Sawtooth CSS 窶・Motion Tokens
 * MD3 Duration & Easing
 * ========================================================== */

:root {
${lines.join("\n")}
}
`;
}

export { MOTION_TOKENS };
