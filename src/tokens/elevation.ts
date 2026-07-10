/**
 * MD3 Elevation 繝医・繧ｯ繝ｳ逕滓・
 * box-shadow 縺ｧ5谿ｵ髫弱・繧ｨ繝ｬ繝吶・繧ｷ繝ｧ繝ｳ繧貞ｮ夂ｾｩ
 */

/**
 * MD3 Elevation 繝ｬ繝吶Ν
 * Level 0: 蠖ｱ縺ｪ縺・ * Level 1: 菴弱＞ 窶・繧ｫ繝ｼ繝峨√せ繧､繝・メ遲・ * Level 2: 窶・FAB縲√Γ繝九Η繝ｼ遲・ * Level 3: 窶・繝翫ン繧ｲ繝ｼ繧ｷ繝ｧ繝ｳ繝舌・遲・ * Level 4: 窶・譛ｪ菴ｿ逕ｨ・井ｺ育ｴ・ｼ・ * Level 5: 鬮倥＞ 窶・繝｢繝ｼ繝繝ｫ遲・ */
const ELEVATION_LEVELS: Record<string, string> = {
  "level0": "none",
  "level1": "0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)",
  "level2": "0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 2px 6px 2px rgba(0, 0, 0, 0.15)",
  "level3": "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 4px 8px 3px rgba(0, 0, 0, 0.15)",
  "level4":
    "0 2px 3px 0 rgba(0, 0, 0, 0.3), 0 6px 10px 4px rgba(0, 0, 0, 0.15)",
  "level5":
    "0 4px 4px 0 rgba(0, 0, 0, 0.3), 0 8px 12px 6px rgba(0, 0, 0, 0.15)",
};

/**
 * 繧ｨ繝ｬ繝吶・繧ｷ繝ｧ繝ｳ繝医・繧ｯ繝ｳ CSS 繧堤函謌舌☆繧九・ */
export function generateElevationCSS(): string {
  const lines: string[] = [];

  for (const [key, value] of Object.entries(ELEVATION_LEVELS)) {
    lines.push(`  --sc-sys-elevation-${key}: ${value};`);
  }

  return `/* ==========================================================
 * Sawtooth CSS 窶・Elevation Tokens
 * MD3 5-level elevation system
 * ========================================================== */

:root {
${lines.join("\n")}
}
`;
}

export { ELEVATION_LEVELS };
