/**
 * HCT 繝吶・繧ｹ縺ｮ繧ｫ繝ｩ繝ｼ繝医・繧ｯ繝ｳ逕滓・
 *
 * @material/material-color-utilities 繧剃ｽｿ逕ｨ縺励※縲・ * MD3 貅匁侠縺ｮ Tonal Palette 縺ｨ System Color Token 繧堤函謌舌☆繧九・ */

import {
  argbFromHex,
  Hct,
  hexFromArgb,
  TonalPalette,
} from "@material/material-color-utilities";

/** 繧ｫ繝ｩ繝ｼ繝・・繝櫁ｨｭ螳・*/
export interface ColorThemeConfig {
  /** Primary 繧ｫ繝ｩ繝ｼ・・EX・・窶・蠢・・*/
  primary: string;
  /** Secondary 繧ｫ繝ｩ繝ｼ・・EX・・窶・逵∫払譎ゅ・ Primary 縺九ｉ閾ｪ蜍慕函謌・*/
  secondary?: string;
  /** Tertiary 繧ｫ繝ｩ繝ｼ・・EX・・窶・逵∫払譎ゅ・ Primary 縺九ｉ閾ｪ蜍慕函謌・*/
  tertiary?: string;
  /** Neutral 繧ｫ繝ｩ繝ｼ・・EX・・窶・逵∫払譎ゅ・ Primary 縺九ｉ閾ｪ蜍慕函謌・*/
  neutral?: string;
  /** Neutral Variant 繧ｫ繝ｩ繝ｼ・・EX・・窶・逵∫払譎ゅ・ Primary 縺九ｉ閾ｪ蜍慕函謌・*/
  neutralVariant?: string;
  /** Error 繧ｫ繝ｩ繝ｼ・・EX・・窶・逵∫払譎ゅ・繝・ヵ繧ｩ繝ｫ繝・#B3261E */
  error?: string;
}

/** Tonal Palette 縺ｮ蜷・ヨ繝ｼ繝ｳ繝ｬ繝吶Ν */
const TONE_LEVELS = [
  0,
  4,
  6,
  10,
  12,
  17,
  20,
  22,
  24,
  30,
  40,
  50,
  60,
  70,
  80,
  87,
  90,
  92,
  94,
  95,
  96,
  98,
  99,
  100,
] as const;

/** System Color Role 縺ｮ繝槭ャ繝斐Φ繧ｰ螳夂ｾｩ */
interface ColorRoleMapping {
  palette:
    | "primary"
    | "secondary"
    | "tertiary"
    | "neutral"
    | "neutralVariant"
    | "error";
  lightTone: number;
  darkTone: number;
}

const SYSTEM_COLOR_ROLES: Record<string, ColorRoleMapping> = {
  "primary": { palette: "primary", lightTone: 40, darkTone: 80 },
  "on-primary": { palette: "primary", lightTone: 100, darkTone: 20 },
  "primary-container": { palette: "primary", lightTone: 90, darkTone: 30 },
  "on-primary-container": { palette: "primary", lightTone: 10, darkTone: 90 },
  "secondary": { palette: "secondary", lightTone: 40, darkTone: 80 },
  "on-secondary": { palette: "secondary", lightTone: 100, darkTone: 20 },
  "secondary-container": { palette: "secondary", lightTone: 90, darkTone: 30 },
  "on-secondary-container": {
    palette: "secondary",
    lightTone: 10,
    darkTone: 90,
  },
  "tertiary": { palette: "tertiary", lightTone: 40, darkTone: 80 },
  "on-tertiary": { palette: "tertiary", lightTone: 100, darkTone: 20 },
  "tertiary-container": { palette: "tertiary", lightTone: 90, darkTone: 30 },
  "on-tertiary-container": { palette: "tertiary", lightTone: 10, darkTone: 90 },
  "error": { palette: "error", lightTone: 40, darkTone: 80 },
  "on-error": { palette: "error", lightTone: 100, darkTone: 20 },
  "error-container": { palette: "error", lightTone: 90, darkTone: 30 },
  "on-error-container": { palette: "error", lightTone: 10, darkTone: 90 },
  "surface": { palette: "neutral", lightTone: 99, darkTone: 10 },
  "on-surface": { palette: "neutral", lightTone: 10, darkTone: 90 },
  "surface-variant": { palette: "neutralVariant", lightTone: 90, darkTone: 30 },
  "on-surface-variant": {
    palette: "neutralVariant",
    lightTone: 30,
    darkTone: 80,
  },
  "surface-container-lowest": {
    palette: "neutral",
    lightTone: 100,
    darkTone: 4,
  },
  "surface-container-low": { palette: "neutral", lightTone: 96, darkTone: 10 },
  "surface-container": { palette: "neutral", lightTone: 94, darkTone: 12 },
  "surface-container-high": { palette: "neutral", lightTone: 92, darkTone: 17 },
  "surface-container-highest": {
    palette: "neutral",
    lightTone: 90,
    darkTone: 22,
  },
  "outline": { palette: "neutralVariant", lightTone: 50, darkTone: 60 },
  "outline-variant": { palette: "neutralVariant", lightTone: 80, darkTone: 30 },
  "inverse-surface": { palette: "neutral", lightTone: 20, darkTone: 90 },
  "inverse-on-surface": { palette: "neutral", lightTone: 95, darkTone: 20 },
};

/** 逕滓・縺輔ｌ縺・Tonal Palette 繧ｻ繝・ヨ */
export interface TonalPaletteSet {
  primary: TonalPalette;
  secondary: TonalPalette;
  tertiary: TonalPalette;
  neutral: TonalPalette;
  neutralVariant: TonalPalette;
  error: TonalPalette;
}

/**
 * Primary 繧ｫ繝ｩ繝ｼ縺九ｉ Secondary / Tertiary / Neutral 繧定・蜍慕函謌舌☆繧九・ * SchemeTonalSpot 逶ｸ蠖薙・繝ｭ繧ｸ繝・け:
 * - Secondary: 蜷後§ Hue縲，hroma 繧・16 縺ｫ謚大宛
 * - Tertiary: Hue 繧・+60ﾂｰ 蝗櫁ｻ｢縲，hroma 繧・24
 * - Neutral: 蜷後§ Hue縲，hroma 繧・4
 * - Neutral Variant: 蜷後§ Hue縲，hroma 繧・8
 */
function derivePalettes(config: ColorThemeConfig): TonalPaletteSet {
  const primaryArgb = argbFromHex(config.primary);
  const primaryHct = Hct.fromInt(primaryArgb);

  const primary = TonalPalette.fromInt(primaryArgb);

  const secondary = config.secondary
    ? TonalPalette.fromInt(argbFromHex(config.secondary))
    : TonalPalette.fromHueAndChroma(primaryHct.hue, 16);

  const tertiary = config.tertiary
    ? TonalPalette.fromInt(argbFromHex(config.tertiary))
    : TonalPalette.fromHueAndChroma(primaryHct.hue + 60, 24);

  const neutral = config.neutral
    ? TonalPalette.fromInt(argbFromHex(config.neutral))
    : TonalPalette.fromHueAndChroma(primaryHct.hue, 4);

  const neutralVariant = config.neutralVariant
    ? TonalPalette.fromInt(argbFromHex(config.neutralVariant))
    : TonalPalette.fromHueAndChroma(primaryHct.hue, 8);

  const error = config.error
    ? TonalPalette.fromInt(argbFromHex(config.error))
    : TonalPalette.fromInt(argbFromHex("#B3261E"));

  return { primary, secondary, tertiary, neutral, neutralVariant, error };
}

/**
 * Reference Token 縺ｮ CSS Custom Properties 繧堤函謌舌☆繧九・ * 萓・ --sc-ref-primary-40: #6750A4;
 */
function generateRefTokens(palettes: TonalPaletteSet): string {
  const lines: string[] = [];
  const paletteNames = [
    "primary",
    "secondary",
    "tertiary",
    "neutral",
    "neutral-variant",
    "error",
  ] as const;
  const paletteKeys: (keyof TonalPaletteSet)[] = [
    "primary",
    "secondary",
    "tertiary",
    "neutral",
    "neutralVariant",
    "error",
  ];

  for (let i = 0; i < paletteNames.length; i++) {
    const name = paletteNames[i];
    const palette = palettes[paletteKeys[i]];
    lines.push(`  /* ${name} tonal palette */`);
    for (const tone of TONE_LEVELS) {
      const hex = hexFromArgb(palette.tone(tone));
      lines.push(`  --sc-ref-${name}-${tone}: ${hex};`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * System Color Token 縺ｮ CSS Custom Properties 繧堤函謌舌☆繧九・ */
function generateSysColorTokens(
  palettes: TonalPaletteSet,
  mode: "light" | "dark",
): string {
  const lines: string[] = [];

  for (const [role, mapping] of Object.entries(SYSTEM_COLOR_ROLES)) {
    const palette = palettes[mapping.palette];
    const tone = mode === "light" ? mapping.lightTone : mapping.darkTone;
    const hex = hexFromArgb(palette.tone(tone));
    lines.push(`  --sc-sys-color-${role}: ${hex};`);
  }

  return lines.join("\n");
}

/**
 * 繧ｫ繝ｩ繝ｼ繝医・繧ｯ繝ｳ CSS 蜈ｨ菴薙ｒ逕滓・縺吶ｋ縲・ */
export function generateColorCSS(config: ColorThemeConfig): string {
  const palettes = derivePalettes(config);

  const refTokens = generateRefTokens(palettes);
  const lightSysTokens = generateSysColorTokens(palettes, "light");
  const darkSysTokens = generateSysColorTokens(palettes, "dark");

  return `/* ==========================================================
 * Sawtooth CSS 窶・Color Tokens
 * Generated from primary: ${config.primary}
 * HCT color space via @material/material-color-utilities
 * ========================================================== */

/* --- Reference Tokens (Tonal Palette) --- */
:root {
${refTokens}
}

/* --- System Color Tokens (Light Theme 窶・Default) --- */
:root {
${lightSysTokens}
}

/* --- System Color Tokens (Dark Theme) --- */
[data-theme="dark"] {
${darkSysTokens}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${darkSysTokens.split("\n").map((l) => "  " + l).join("\n")}
  }
}
`;
}

/** MD3 Baseline 縺ｮ繝・ヵ繧ｩ繝ｫ繝医き繝ｩ繝ｼ險ｭ螳・*/
export const DEFAULT_COLOR_CONFIG: ColorThemeConfig = {
  primary: "#6750A4",
};

// 繝代Ξ繝・ヨ豢ｾ逕滄未謨ｰ繧ゅお繧ｯ繧ｹ繝昴・繝茨ｼ医ユ繧ｹ繝育畑・・export { derivePalettes, SYSTEM_COLOR_ROLES, TONE_LEVELS };
