/**
 * @module
 * Sawcase — Deno Fresh 専用 SaaS スターターキット
 *
 * テーマ設定 → デザイントークン → レイアウト → UI コンポーネント → Preact コンポーネント
 * の流れで、管理画面・ドキュメント・LP・認証画面を簡単に構築。
 *
 * @example
 * ```tsx
 * import { AdminShell, AdminPage } from "@kotsumo/sawcase/components";
 * import { LayoutDashboard } from "lucide-preact";
 *
 * export default function Dashboard() {
 *   return (
 *     <AdminShell brand="My SaaS" nav={[
 *       { icon: LayoutDashboard, label: "ダッシュボード", href: "/admin" },
 *     ]}>
 *       <AdminPage title="ダッシュボード">
 *         <p>コンテンツ</p>
 *       </AdminPage>
 *     </AdminShell>
 *   );
 * }
 * ```
 */

// レイアウトコンポーネントの再エクスポート
export {
  AdminShell,
  AdminNav,
  AdminPage,
  DocsLayout,
  Markdown,
  AuthCard,
  LandingPage,
  LegalPage,
  ErrorPage,
  PricingPage,
  BlogLayout,
} from "./src/components/mod.ts";

// Zag.js コンポーネントの再エクスポート
export {
  Clipboard,
  Dialog,
  Tabs,
  Toast,
  Menu,
  Tooltip,
  Accordion,
} from "./src/components/mod.ts";

// 型定義の再エクスポート
export type {
  AdminShellProps,
  NavItem,
  NavGroup,
  AdminPageProps,
  DocsLayoutProps,
  DocsSidebarItem,
  DocsSidebarGroup,
  MarkdownProps,
  AuthCardProps,
  LandingPageProps,
  LegalPageProps,
  ErrorPageProps,
  PricingPageProps,
  PricingPlan,
  BlogLayoutProps,
  ToastItem,
} from "./src/components/mod.ts";

// --- テーマ設定の型定義 ---

export type { ColorThemeConfig } from "./src/tokens/colors.ts";
export type { TypographyConfig } from "./src/tokens/typography.ts";

/** Sawcase テーマ設定 */
export interface SawcaseTheme {
  /** カラー設定 */
  colors?: {
    /** Primary カラー (HEX) */
    primary?: string;
    /** Secondary カラー (HEX) — 省略時は Primary から自動生成 */
    secondary?: string;
    /** Tertiary カラー (HEX) — 省略時は Primary から自動生成 */
    tertiary?: string;
    /** Error カラー (HEX) — デフォルト: #B3261E */
    error?: string;
  };
  /** タイポグラフィ設定 */
  typography?: {
    /** フォントファミリ */
    fontFamily?: string;
  };
}

/** Sawcase 設定ファイルの型 */
export interface SawcaseConfig {
  /** テーマ設定 */
  theme?: SawcaseTheme;
  /** 含める UI コンポーネント（省略時は全コンポーネント） */
  components?: string[];
  /** 含めるレイアウト（省略時は全レイアウト） */
  layouts?: string[];
  /** 出力先ファイルパス */
  output: string;
}
