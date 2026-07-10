import type { ComponentChildren, FunctionComponent } from "preact";
import { AdminNav, type NavGroup } from "./AdminNav.tsx";
import { Menu } from "lucide-preact";

/** ナビゲーション項目 */
export interface NavItem {
  /** Lucide アイコンコンポーネント */
  icon?: FunctionComponent<{ size?: number }>;
  /** 表示ラベル */
  label: string;
  /** リンク先 */
  href: string;
  /** アクティブ状態 */
  active?: boolean;
}

/** AdminShell の props */
export interface AdminShellProps {
  /** アプリ名 */
  brand: string;
  /** ロゴ URL（省略時はテキストのみ） */
  logo?: string;
  /** パンくずテキスト */
  breadcrumb?: string;
  /** ナビゲーション項目（フラットリスト） */
  nav?: NavItem[];
  /** ナビゲーション（グループ分け） */
  navGroups?: NavGroup[];
  /** ヘッダー右端のアクション */
  headerActions?: ComponentChildren;
  /** メインコンテンツ */
  children: ComponentChildren;
}

export { type NavGroup };

/**
 * 管理画面のシェルレイアウト。
 * ヘッダー + サイドナビ + メインコンテンツの3ペイン構造。
 */
export function AdminShell(props: AdminShellProps) {
  const {
    brand,
    logo,
    breadcrumb,
    nav,
    navGroups,
    headerActions,
    children,
  } = props;

  // nav を navGroups に変換
  const groups: NavGroup[] = navGroups ?? (nav
    ? [{ items: nav }]
    : []);

  return (
    <div class="sc-admin-shell">
      <header class="sc-admin-header">
        <button
          class="sc-admin-header__menu-btn"
          type="button"
          aria-label="メニューを開く"
          data-sc-admin-menu-toggle
        >
          <Menu size={20} />
        </button>

        <div class="sc-admin-header__brand">
          {logo && (
            <img src={logo} alt="" class="sc-admin-header__logo" />
          )}
          <span class="sc-admin-header__app-name">{brand}</span>
        </div>

        {breadcrumb && (
          <div class="sc-admin-header__breadcrumb">{breadcrumb}</div>
        )}

        {headerActions && (
          <div class="sc-admin-header__actions">{headerActions}</div>
        )}
      </header>

      <div class="sc-admin-body">
        <AdminNav groups={groups} />

        {/* モバイルオーバーレイ */}
        <div class="sc-admin-overlay" id="admin-overlay" />

        <main class="sc-admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
