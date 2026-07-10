/**
 * @module
 * Sawcase — Deno Fresh 専用 SaaS スターターキット
 *
 * 管理画面・ドキュメント・LP・認証画面の骨格を Preact コンポーネントとして提供。
 * sawtooth-css, @deno/gfm, Zag.js, lucide-preact は依存として自動解決。
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

// CSS 生成（後方互換）
export type { SawcaseGenerateOptions } from "./mod_types.ts";
