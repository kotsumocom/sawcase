/**
 * @module
 * Sawcase — CSS + JS ジェネレータ
 *
 * テーマ設定に基づいてレイアウト CSS と軽量 JS を生成する。
 * Deno Fresh の dev.ts に組み込んで使用する。
 *
 * @example
 * ```ts
 * import { generateSawcaseCSS } from "@kotsumo/sawcase/generate";
 *
 * await generateSawcaseCSS({
 *   output: "./static/sawcase.css",
 *   jsOutput: "./static/sawcase.js",
 *   sawtooth: { output: "./static/sawtooth.css" },
 *   theme: { colors: { primary: "#6750A4" } },
 * });
 * ```
 */

import * as path from "@std/path";
import type { SawcaseGenerateOptions, SawcaseLayout } from "./mod.ts";
import { generateSawtoothCSS } from "@kotsumo/sawtooth-css/generate";

/** レイアウトカテゴリごとの CSS ファイル */
const LAYOUT_FILES: Record<SawcaseLayout, string[]> = {
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
  ],
  landing: [
    "landing/_header.css",
    "landing/_hero.css",
    "landing/_section.css",
    "landing/_features.css",
    "landing/_footer.css",
  ],
};

/** JS ファイル（レイアウトカテゴリ別） */
const JS_FILES: Partial<Record<SawcaseLayout, string[]>> = {
  admin: ["js/admin-nav.ts"],
  docs: ["js/docs-toc.ts"],
};

/**
 * TypeScript ソースから型注釈を除去してブラウザ向け JS に変換する。
 * シンプルな DOM 操作コードのみを想定した軽量変換。
 */
function stripTypeAnnotations(ts: string): string {
  return ts
    // export function foo(x: string, y: number): void { → function foo(x, y) {
    .replace(/export\s+/g, "")
    // 引数の型注釈を除去: (x: Type) → (x) / (x: Type = val) → (x = val)
    .replace(
      /(\w+)\s*:\s*[\w<>[\]|&\s]+?((?:\s*=\s*[^,)]+)?)/g,
      "$1$2",
    )
    // 戻り値の型注釈を除去: ): void { → ) {
    .replace(/\)\s*:\s*[\w<>[\]|&\s]+?\s*\{/g, ") {")
    // as Type キャストを除去
    .replace(/\s+as\s+\w+/g, "")
    // type/interface 宣言を除去
    .replace(/^(?:export\s+)?(?:type|interface)\s+[\s\S]*?(?:;\n|\}\n)/gm, "")
    .trim();
}

/**
 * テーマ設定に基づいてレイアウト CSS と軽量 JS を生成し、指定パスに書き出す。
 */
export async function generateSawcaseCSS(
  options: SawcaseGenerateOptions,
): Promise<void> {
  const startTime = performance.now();
  const moduleDir = path.dirname(path.fromFileUrl(import.meta.url));
  const srcDir = path.join(moduleDir, "src");
  const cssDir = path.join(srcDir, "css");

  // --- 0. sawtooth CSS を同時生成（オプション） ---
  if (options.sawtooth) {
    await generateSawtoothCSS({
      output: options.sawtooth.output,
      theme: options.theme,
    });
  }

  // --- 1. CSS セクションを構築 ---
  const sections: string[] = [];

  // 変数
  sections.push(await Deno.readTextFile(path.join(cssDir, "_variables.css")));

  // レイアウト CSS
  const layouts = options.layouts ??
    (Object.keys(LAYOUT_FILES) as SawcaseLayout[]);

  for (const layout of layouts) {
    const files = LAYOUT_FILES[layout];
    if (!files) {
      console.warn(`⚠️  不明なレイアウト: "${layout}"（スキップ）`);
      continue;
    }
    for (const file of files) {
      const filePath = path.join(cssDir, file);
      try {
        sections.push(await Deno.readTextFile(filePath));
      } catch {
        console.warn(`⚠️  CSS ファイルが見つかりません: ${filePath}`);
      }
    }
  }

  // --- 2. CSS 出力 ---
  const cssResult = sections.join("\n\n");
  const absOutput = path.resolve(options.output);
  await Deno.mkdir(path.dirname(absOutput), { recursive: true });
  await Deno.writeTextFile(absOutput, cssResult);

  // --- 3. JS 生成 ---
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
  const jsOutputPath = options.jsOutput ??
    path.join(path.dirname(absOutput), "sawcase.js");
  const absJsOutput = path.resolve(jsOutputPath);
  await Deno.writeTextFile(absJsOutput, jsResult);

  // --- 4. 完了ログ ---
  const elapsed = (performance.now() - startTime).toFixed(0);
  const cssSizeKB =
    (new TextEncoder().encode(cssResult).length / 1024).toFixed(1);
  const jsSizeKB =
    (new TextEncoder().encode(jsResult).length / 1024).toFixed(1);

  console.log(`✅ Sawcase 生成完了 (${elapsed}ms)`);
  console.log(`   📄 CSS: ${cssSizeKB} KB → ${options.output}`);
  console.log(`   📄 JS:  ${jsSizeKB} KB → ${jsOutputPath}`);
}
