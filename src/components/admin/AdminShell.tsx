import type { ComponentChildren, FunctionComponent } from "preact";
import { AdminNav, type NavGroup } from "./AdminNav.tsx";
import { AdminIconRail, type IconRailItem } from "./AdminIconRail.tsx";
import { Menu } from "lucide-preact";

/** ナビゲーション項目 */
export interface NavItem {
  /** Lucide アイコンコンポーネント */
  icon?: FunctionComponent<{ size?: number | string }>;
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
  /** パンくず（文字列 or AdminBreadcrumb 等のコンポーネント） */
  breadcrumb?: string | ComponentChildren;
  /** ナビゲーション項目（フラットリスト） */
  nav?: NavItem[];
  /** ナビゲーション（グループ分け） */
  navGroups?: NavGroup[];
  /** ヘッダー右端のアクション */
  headerActions?: ComponentChildren;
  /** メインコンテンツ */
  children: ComponentChildren;

  // --- 2 ペインナビ（アイコンレール）---

  /** アイコンレールのアイテム */
  rail?: IconRailItem[];
  /** アイコンレールの表示モード */
  railMode?: "expanded" | "collapsed" | "hover-expand";
  /** アイコンレール下部のアイテム */
  railBottomItems?: IconRailItem[];
  /** アイコンレールのブランドアイコン */
  railBrandIcon?: ComponentChildren;
  /** Island として差し込むカスタムレール（rail prop より優先） */
  railSlot?: ComponentChildren;
}

export { type NavGroup };

/**
 * 管理画面のシェルレイアウト。
 * ヘッダー + サイドナビ（+ オプションのアイコンレール）+ メインコンテンツ。
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
    rail,
    railMode,
    railBottomItems,
    railBrandIcon,
    railSlot,
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
          <div class="sc-admin-header__breadcrumb">
            {typeof breadcrumb === "string" ? breadcrumb : breadcrumb}
          </div>
        )}

        {headerActions && (
          <div class="sc-admin-header__actions">{headerActions}</div>
        )}
      </header>

      <div class="sc-admin-body">
        {railSlot ? railSlot : rail && (
          <AdminIconRail
            items={rail}
            mode={railMode}
            bottomItems={railBottomItems}
            brandIcon={railBrandIcon}
          />
        )}

        {groups.length > 0 && <AdminNav groups={groups} />}

        {/* モバイルオーバーレイ */}
        <div class="sc-admin-overlay" id="admin-overlay" />

        <main class="sc-admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
