/**
 * CSS 生成関連の型定義（後方互換用）
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
  /** JS 出力先ファイルパス */
  jsOutput?: string;
  /** sawtooth CSS 設定 */
  sawtooth?: { output: string };
  /** テーマ設定 */
  theme?: {
    colors?: {
      primary?: string;
      secondary?: string;
      tertiary?: string;
      error?: string;
    };
    typography?: { fontFamily?: string };
  };
  /** 含めるレイアウト */
  layouts?: SawcaseLayout[];
}
