/**
 * @module
 * Sawcase デフォルト CSS のパスを提供するモジュール。
 *
 * Fresh 2 (Vite) では、CSS ファイルを直接 import できます:
 *
 * ```tsx
 * // routes/_app.tsx — Vite が自動バンドル
 * import "@kotsumo/sawcase/styles.css";
 * ```
 *
 * または、dist/sawcase.css をコピーして static/ に配置:
 *
 * ```html
 * <link rel="stylesheet" href="/sawcase.css" />
 * ```
 */

// このモジュール自体は CSS パスの参照用。
// 実際の CSS は dist/sawcase.css にあります。
export const SAWCASE_CSS_PATH = new URL("./dist/sawcase.css", import.meta.url)
  .href;
