/**
 * Sawcase ビルドスクリプト
 *
 * 1. デザイントークン生成（HCT カラー等）
 * 2. CSS: @import 解決 → 1ファイルに結合 → dist/sawcase.css
 * 3. JS: src/js/*.ts を結合 → dist/sawcase.js
 * 4. ミニファイ版を出力
 */

import * as path from "@std/path";
import { generateColorCSS } from "./tokens/colors.ts";
import { generateTypographyCSS } from "./tokens/typography.ts";
import { generateSpacingCSS } from "./tokens/spacing.ts";
import { generateShapeCSS } from "./tokens/shape.ts";
import { generateElevationCSS } from "./tokens/elevation.ts";
import { generateMotionCSS } from "./tokens/motion.ts";

const ROOT_DIR = path.dirname(path.dirname(path.fromFileUrl(import.meta.url)));
const SRC_DIR = path.join(ROOT_DIR, "src");
const CSS_DIR = path.join(SRC_DIR, "css");
const JS_DIR = path.join(SRC_DIR, "js");
const DIST_DIR = path.join(ROOT_DIR, "dist");

/** JS ファイルの読み込み順 */
const JS_FILES = [
  "admin-nav.ts",
  "docs-toc.ts",
];

/**
 * CSS ファイルの @import を再帰的に解決して1つのファイルに結合する
 */
async function resolveImports(
  filePath: string,
  seen: Set<string> = new Set(),
): Promise<string> {
  const absolutePath = path.resolve(filePath);

  if (seen.has(absolutePath)) {
    return `/* [circular import skipped: ${path.basename(absolutePath)}] */\n`;
  }
  seen.add(absolutePath);

  const content = await Deno.readTextFile(absolutePath);
  const dir = path.dirname(absolutePath);
  const lines = content.split("\n");
  const result: string[] = [];

  for (const line of lines) {
    const importMatch = line.match(/^@import\s+["'](.+?)["']\s*;/);
    if (importMatch) {
      const importPath = path.resolve(dir, importMatch[1]);
      const importedContent = await resolveImports(importPath, seen);
      result.push(importedContent);
    } else {
      result.push(line);
    }
  }

  return result.join("\n");
}

/**
 * TypeScript ソースから型注釈を除去してブラウザ向け JS に変換する。
 * Deno の transpile API を使用。
 */
async function stripTypeAnnotations(ts: string): Promise<string> {
  // Deno.emit が使えないので、手動で安全に型除去
  let result = ts;

  // 1. export 除去
  result = result.replace(/^export\s+/gm, "");

  // 2. type / interface 宣言全体を除去
  result = result.replace(/^(?:export\s+)?(?:type|interface)\s+\w+[\s\S]*?(?:;\n|\}\n)/gm, "");

  // 3. 関数引数の型注釈を除去: (arg: Type, arg2: Type = val) → (arg, arg2 = val)
  // パラメータ型注釈: 識別子: 型 の後に , や ) が来る
  result = result.replace(/(\w+)\s*:\s*(?:readonly\s+)?[\w<>\[\]|&\s.]+?(?=\s*[,)=])/g, "$1");

  // 4. 戻り値型注釈: ): Type { → ) {
  result = result.replace(/\)\s*:\s*[\w<>\[\]|&\s.]+?\s*\{/g, ") {");

  // 5. as キャスト除去
  result = result.replace(/\s+as\s+\w+/g, "");

  // 6. non-null assertion (!) 除去 — プロパティアクセスの前のみ
  result = result.replace(/(\w+)!\./g, "$1.");
  result = result.replace(/(\w+)!\[/g, "$1[");

  return result.trim();
}

/**
 * CSS をミニファイする（コメント除去 + 空白圧縮）
 */
function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\n\s*\n/g, "\n")
    .replace(/^\s+/gm, "")
    .replace(/\s*{\s*/g, "{")
    .replace(/\s*}\s*/g, "}")
    .replace(/\s*;\s*/g, ";")
    .replace(/\s*:\s*/g, ":")
    .replace(/\s*,\s*/g, ",")
    .trim();
}

/**
 * JS をミニファイする（コメント除去 + 空白圧縮）
 */
function minifyJS(js: string): string {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "")
    .replace(/\n\s*\n/g, "\n")
    .replace(/^\s+/gm, "")
    .trim();
}

/**
 * JS をバンドル
 */
async function bundleJS(): Promise<string> {
  const sections: string[] = [];
  sections.push("// Sawcase JS — 自動生成ファイル（編集しないでください）");
  sections.push('"use strict";');
  sections.push("(function(global) {");

  for (const file of JS_FILES) {
    const filePath = path.join(JS_DIR, file);
    try {
      const tsContent = await Deno.readTextFile(filePath);
      sections.push("");
      sections.push(`/* --- ${file} --- */`);
      sections.push(await stripTypeAnnotations(tsContent));
    } catch {
      console.warn(`⚠️  JS ファイルが見つかりません: ${filePath}`);
    }
  }

  sections.push("");
  sections.push("  // グローバルに公開");
  sections.push("  global.sawcase = { initAdminNav, initDocsToc };");
  sections.push("})(typeof window !== 'undefined' ? window : globalThis);");

  return sections.join("\n");
}

/**
 * メインビルド処理
 */
async function build(): Promise<void> {
  const startTime = performance.now();

  // 1. デザイントークン生成（デフォルトテーマ: #6750A4）
  const tokensSections = [
    generateColorCSS({ primary: "#6750A4" }),
    generateTypographyCSS(),
    generateSpacingCSS(),
    generateShapeCSS(),
    generateElevationCSS(),
    generateMotionCSS(),
  ];
  const tokensCSS = tokensSections.join("\n\n");

  // 2. CSS: @import 解決 + 結合
  const mainCSSPath = path.join(CSS_DIR, "main.css");
  const layoutCSS = await resolveImports(mainCSSPath);

  // 3. トークン + レイアウト + コンポーネントを結合
  const bundledCSS = tokensCSS + "\n\n" + layoutCSS;

  // 2. JS バンドル
  const bundledJS = await bundleJS();

  // 3. dist/ ディレクトリ作成
  await Deno.mkdir(DIST_DIR, { recursive: true });

  // 4. CSS 出力
  const cssPath = path.join(DIST_DIR, "sawcase.css");
  await Deno.writeTextFile(cssPath, bundledCSS);

  const cssMinPath = path.join(DIST_DIR, "sawcase.min.css");
  await Deno.writeTextFile(cssMinPath, minifyCSS(bundledCSS));

  // 5. JS 出力
  const jsPath = path.join(DIST_DIR, "sawcase.js");
  await Deno.writeTextFile(jsPath, bundledJS);

  const jsMinPath = path.join(DIST_DIR, "sawcase.min.js");
  await Deno.writeTextFile(jsMinPath, minifyJS(bundledJS));

  // 6. 完了ログ
  const elapsed = (performance.now() - startTime).toFixed(0);
  const cssSizeKB =
    (new TextEncoder().encode(bundledCSS).length / 1024).toFixed(1);
  const cssMinSizeKB =
    (new TextEncoder().encode(minifyCSS(bundledCSS)).length / 1024).toFixed(1);
  const jsSizeKB =
    (new TextEncoder().encode(bundledJS).length / 1024).toFixed(1);
  const jsMinSizeKB =
    (new TextEncoder().encode(minifyJS(bundledJS)).length / 1024).toFixed(1);

  console.log(`✅ ビルド完了 (${elapsed}ms)`);
  console.log(`   📄 dist/sawcase.css     — ${cssSizeKB} KB`);
  console.log(`   📄 dist/sawcase.min.css — ${cssMinSizeKB} KB`);
  console.log(`   📄 dist/sawcase.js      — ${jsSizeKB} KB`);
  console.log(`   📄 dist/sawcase.min.js  — ${jsMinSizeKB} KB`);
}

// --watch フラグ対応
if (Deno.args.includes("--watch")) {
  console.log("👀 ファイル変更を監視中...");
  await build();

  const watcher = Deno.watchFs(SRC_DIR, { recursive: true });
  let debounceTimer: number | undefined;

  for await (const event of watcher) {
    if (event.kind === "modify" || event.kind === "create") {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        console.log("\n🔄 変更検出、リビルド中...");
        try {
          await build();
        } catch (e) {
          console.error("❌ ビルドエラー:", e);
        }
      }, 200);
    }
  }
} else {
  await build();
}
