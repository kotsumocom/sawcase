/**
 * @module
 * Sawcase — 統合 CSS + JS ジェネレータ
 *
 * テーマ設定に基づいてデザイントークン + レイアウト CSS + UI コンポーネント CSS
 * + 軽量 JS を 1 ファイルに生成する。
 *
 * @example
 * ```ts
 * import { generateSawcaseCSS } from "@kotsumo/sawcase/generate";
 *
 * await generateSawcaseCSS({
 *   output: "./static/sawcase.css",
 *   theme: { colors: { primary: "#2563eb" } },
 * });
 * ```
 */

import * as path from "@std/path";
import type { SawcaseConfig } from "./mod.ts";
import {
  type ColorThemeConfig,
  generateColorCSS,
} from "./src/tokens/colors.ts";
import { generateTypographyCSS } from "./src/tokens/typography.ts";
import { generateSpacingCSS } from "./src/tokens/spacing.ts";
import { generateShapeCSS } from "./src/tokens/shape.ts";
import { generateElevationCSS } from "./src/tokens/elevation.ts";
import { generateMotionCSS } from "./src/tokens/motion.ts";

/** 利用可能なレイアウト名 */
type LayoutName =
  | "admin"
  | "docs"
  | "common"
  | "landing"
  | "legal"
  | "error"
  | "pricing"
  | "blog";

/** レイアウトカテゴリごとの CSS ファイル */
const LAYOUT_FILES: Record<LayoutName, string[]> = {
  admin: [
    "admin/_shell.css",
    "admin/_header.css",
    "admin/_nav.css",
    "admin/_page.css",
    "admin/_stats.css",
    "admin/_overlay.css",
  ],
  docs: [
    "docs/_shell.css",
    "docs/_header.css",
    "docs/_sidebar.css",
    "docs/_article.css",
    "docs/_toc.css",
  ],
  common: [
    "common/_auth.css",
    "common/_empty.css",
    "common/_loading.css",
    "common/_interactive.css",
  ],
  landing: [
    "landing/_header.css",
    "landing/_hero.css",
    "landing/_section.css",
    "landing/_features.css",
    "landing/_footer.css",
  ],
  legal: ["legal/_legal.css"],
  error: ["error/_error.css"],
  pricing: ["pricing/_pricing.css"],
  blog: ["blog/_blog.css"],
};

/** 利用可能な UI コンポーネント名 → CSS ファイル */
const COMPONENT_FILES: Record<string, string> = {
  "button": "_button.css",
  "input": "_input.css",
  "textarea": "_textarea.css",
  "select": "_select.css",
  "card": "_card.css",
  "dialog": "_dialog.css",
  "menu": "_menu.css",
  "tabs": "_tabs.css",
  "alert": "_alert.css",
  "badge": "_badge.css",
  "checkbox": "_checkbox.css",
  "switch": "_switch.css",
  "radio-group": "_radio-group.css",
  "toggle": "_toggle.css",
  "toggle-group": "_toggle-group.css",
  "slider": "_slider.css",
  "number-input": "_number-input.css",
  "pin-input": "_pin-input.css",
  "password-input": "_password-input.css",
  "tags-input": "_tags-input.css",
  "tooltip": "_tooltip.css",
  "popover": "_popover.css",
  "hover-card": "_hover-card.css",
  "toast": "_toast.css",
  "drawer": "_drawer.css",
  "progress": "_progress.css",
  "progress-circular": "_progress-circular.css",
  "clipboard": "_clipboard.css",
  "presence": "_presence.css",
  "qr-code": "_qr-code.css",
  "accordion": "_accordion.css",
  "collapsible": "_collapsible.css",
  "navigation-menu": "_navigation-menu.css",
  "pagination": "_pagination.css",
  "steps": "_steps.css",
  "segmented-control": "_segmented-control.css",
  "splitter": "_splitter.css",
  "scroll-area": "_scroll-area.css",
  "combobox": "_combobox.css",
  "listbox": "_listbox.css",
  "cascade-select": "_cascade-select.css",
  "date-picker": "_date-picker.css",
  "date-input": "_date-input.css",
  "color-picker": "_color-picker.css",
  "file-upload": "_file-upload.css",
  "editable": "_editable.css",
  "rating-group": "_rating-group.css",
  "signature-pad": "_signature-pad.css",
  "avatar": "_avatar.css",
  "carousel": "_carousel.css",
  "floating-panel": "_floating-panel.css",
  "image-cropper": "_image-cropper.css",
  "marquee": "_marquee.css",
  "timer": "_timer.css",
  "tour": "_tour.css",
  "tree-view": "_tree-view.css",
  "angle-slider": "_angle-slider.css",
};

/** JS ファイル（レイアウトカテゴリ別） */
const JS_FILES: Partial<Record<LayoutName, string[]>> = {
  admin: ["js/admin-nav.ts"],
  docs: ["js/docs-toc.ts"],
};

/**
 * TypeScript ソースから型注釈を除去してブラウザ向け JS に変換する。
 */
function stripTypeAnnotations(ts: string): string {
  return ts
    .replace(/export\s+/g, "")
    .replace(
      /(\w+)\s*:\s*[\w<>\[\]|&\s]+?((?:\s*=\s*[^,)]+)?)/g,
      "$1$2",
    )
    .replace(/\)\s*:\s*[\w<>\[\]|&\s]+?\s*\{/g, ") {")
    .replace(/\s+as\s+\w+/g, "")
    .replace(/^(?:export\s+)?(?:type|interface)\s+[\s\S]*?(?:;\n|\}\n)/gm, "")
    .trim();
}

/**
 * テーマ設定に基づいて統合 CSS + JS を生成し、指定パスに書き出す。
 *
 * 出力順:
 * 1. デザイントークン（HCT カラー, タイポグラフィ, スペーシング等）
 * 2. ベーススタイル（リセット, グローバル）
 * 3. レイアウト CSS（admin, docs, landing 等）
 * 4. UI コンポーネント CSS（Zag.js 対応）
 * 5. ユーティリティ
 */
export async function generateSawcaseCSS(
  options: SawcaseConfig,
): Promise<void> {
  const startTime = performance.now();
  const moduleDir = path.dirname(path.fromFileUrl(import.meta.url));
  const srcDir = path.join(moduleDir, "src");
  const cssDir = path.join(srcDir, "css");

  const sections: string[] = [];

  // --- 1. デザイントークン ---
  const colorConfig: ColorThemeConfig = {
    primary: options.theme?.colors?.primary ?? "#6750A4",
    secondary: options.theme?.colors?.secondary,
    tertiary: options.theme?.colors?.tertiary,
    error: options.theme?.colors?.error,
  };

  sections.push(generateColorCSS(colorConfig));
  sections.push(generateTypographyCSS(
    options.theme?.typography
      ? { fontFamily: options.theme.typography.fontFamily }
      : undefined,
  ));
  sections.push(generateSpacingCSS());
  sections.push(generateShapeCSS());
  sections.push(generateElevationCSS());
  sections.push(generateMotionCSS());

  // --- 2. ベーススタイル ---
  sections.push(
    await Deno.readTextFile(path.join(cssDir, "base", "_reset.css")),
  );
  sections.push(
    await Deno.readTextFile(path.join(cssDir, "base", "_global.css")),
  );

  // --- 3. レイアウト変数 ---
  sections.push(
    await Deno.readTextFile(path.join(cssDir, "_variables.css")),
  );

  // --- 4. レイアウト CSS ---
  const layouts = (options.layouts ??
    Object.keys(LAYOUT_FILES)) as LayoutName[];

  for (const layout of layouts) {
    const files = LAYOUT_FILES[layout];
    if (!files) {
      console.warn(`⚠️  不明なレイアウト: "${layout}"（スキップ）`);
      continue;
    }
    for (const file of files) {
      const filePath = path.join(cssDir, "layouts", file);
      try {
        sections.push(await Deno.readTextFile(filePath));
      } catch {
        console.warn(`⚠️  CSS ファイルが見つかりません: ${filePath}`);
      }
    }
  }

  // --- 5. UI コンポーネント ---
  const componentNames = options.components ?? Object.keys(COMPONENT_FILES);

  for (const name of componentNames) {
    const fileName = COMPONENT_FILES[name];
    if (!fileName) {
      console.warn(`⚠️  不明なコンポーネント: "${name}"（スキップ）`);
      continue;
    }
    const filePath = path.join(cssDir, "components", fileName);
    try {
      sections.push(await Deno.readTextFile(filePath));
    } catch {
      console.warn(`⚠️  コンポーネントファイルが見つかりません: ${filePath}`);
    }
  }

  // --- 6. ユーティリティ ---
  sections.push(
    await Deno.readTextFile(path.join(cssDir, "utilities", "_layout.css")),
  );

  // --- 7. CSS 出力 ---
  const cssResult = sections.join("\n\n");
  const absOutput = path.resolve(options.output);
  await Deno.mkdir(path.dirname(absOutput), { recursive: true });
  await Deno.writeTextFile(absOutput, cssResult);

  // --- 8. JS 生成 ---
  const jsSections: string[] = [];
  jsSections.push("// Sawcase JS — 自動生成ファイル（編集しないでください）");
  jsSections.push('"use strict";');
  jsSections.push("(function(global) {");

  for (const layout of layouts) {
    const jsFiles = JS_FILES[layout];
    if (!jsFiles) continue;
    for (const file of jsFiles) {
      const filePath = path.join(srcDir, file);
      try {
        const tsContent = await Deno.readTextFile(filePath);
        jsSections.push(stripTypeAnnotations(tsContent));
      } catch {
        console.warn(`⚠️  JS ファイルが見つかりません: ${filePath}`);
      }
    }
  }

  jsSections.push("  // グローバルに公開");
  jsSections.push("  global.sawcase = { initAdminNav, initDocsToc };");
  jsSections.push("})(typeof window !== 'undefined' ? window : globalThis);");

  const jsResult = jsSections.join("\n");
  const jsOutputPath = path.join(path.dirname(absOutput), "sawcase.js");
  const absJsOutput = path.resolve(jsOutputPath);
  await Deno.writeTextFile(absJsOutput, jsResult);

  // --- 9. 完了ログ ---
  const elapsed = (performance.now() - startTime).toFixed(0);
  const cssSizeKB =
    (new TextEncoder().encode(cssResult).length / 1024).toFixed(1);
  const jsSizeKB =
    (new TextEncoder().encode(jsResult).length / 1024).toFixed(1);

  console.log(`✅ Sawcase CSS 生成完了 (${elapsed}ms)`);
  console.log(`   📄 CSS: ${cssSizeKB} KB → ${options.output}`);
  console.log(`   📄 JS:  ${jsSizeKB} KB → ${jsOutputPath}`);
}
