/**
 * @module
 * Sawcase — sawtooth-css の上に載るレイアウト CSS + 軽量 JS ライブラリ
 *
 * 管理画面・ドキュメントページ・LP の骨格を CSS クラスと
 * 最小限の JS として提供する。
 *
 * @example
 * ```ts
 * import type { SawcaseGenerateOptions } from "@kotsumo/sawcase";
 *
 * const options: SawcaseGenerateOptions = {
 *   output: "./static/sawcase.css",
 *   jsOutput: "./static/sawcase.js",
 *   sawtooth: { output: "./static/sawtooth.css" },
 *   theme: { colors: { primary: "#6750A4" } },
 * };
 * ```
 */

export type {
  GenerateOptions as SawtoothGenerateOptions,
  SawtoothTheme,
} from "@kotsumo/sawtooth-css";

/** sawcase が提供するレイアウトカテゴリ */
export type SawcaseLayout = "admin" | "docs" | "common" | "landing";

/** sawcase CSS + JS 生成オプション */
export interface SawcaseGenerateOptions {
  /** CSS 出力先ファイルパス */
  output: string;
  /** JS 出力先ファイルパス（省略時は CSS と同ディレクトリに sawcase.js） */
  jsOutput?: string;
  /** sawtooth CSS も同時に生成する場合の設定 */
  sawtooth?: {
    /** sawtooth CSS の出力先 */
    output: string;
  };
  /** sawtooth テーマ設定 */
  theme?: {
    colors?: {
      primary?: string;
      secondary?: string;
      tertiary?: string;
      error?: string;
    };
    typography?: {
      fontFamily?: string;
    };
  };
  /** 含めるレイアウト（省略時は全レイアウト） */
  layouts?: SawcaseLayout[];
}
