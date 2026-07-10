import type { ComponentChildren } from "preact";

/** サイドバー項目 */
export interface DocsSidebarItem {
  /** 表示ラベル */
  label: string;
  /** リンク先 */
  href: string;
  /** アクティブ状態 */
  active?: boolean;
}

/** サイドバーグループ */
export interface DocsSidebarGroup {
  /** グループラベル */
  label: string;
  /** グループ内の項目 */
  items: DocsSidebarItem[];
}

/** ヘッダーナビ項目 */
interface DocsHeaderNavItem {
  label: string;
  href: string;
  external?: boolean;
}

/** DocsLayout の props */
export interface DocsLayoutProps {
  /** ブランド名 */
  brand: string;
  /** ヘッダーナビゲーション */
  headerNav?: DocsHeaderNavItem[];
  /** サイドバー項目（フラットリスト） */
  sidebar?: DocsSidebarItem[];
  /** サイドバー（グループ分け） */
  sidebarGroups?: DocsSidebarGroup[];
  /** メインコンテンツ */
  children: ComponentChildren;
}

/** ドキュメントサイトのレイアウトコンポーネント */
export function DocsLayout(props: DocsLayoutProps) {
  const {
    brand,
    headerNav = [],
    sidebar,
    sidebarGroups,
    children,
  } = props;

  const groups: DocsSidebarGroup[] = sidebarGroups ?? (sidebar
    ? [{ label: "", items: sidebar }]
    : []);

  return (
    <div class="sc-docs-shell">
      <header class="sc-docs-header">
        <div class="sc-docs-header__inner">
          <span
            class="sc-docs-header__brand"
            style="font-weight:700;letter-spacing:-0.02em;"
          >
            {brand}
          </span>
          {headerNav.length > 0 && (
            <nav class="sc-docs-header__nav">
              {headerNav.map((item, i) => (
                <a
                  href={item.href}
                  key={i}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener" }
                    : {})}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      <div class="sc-docs-body">
        {groups.length > 0 && (
          <aside class="sc-docs-sidebar">
            {groups.map((group, gi) => (
              <div class="sc-docs-sidebar__group" key={gi}>
                {group.label && (
                  <div class="sc-docs-sidebar__group-label">
                    {group.label}
                  </div>
                )}
                {group.items.map((item, ii) => (
                  <a
                    href={item.href}
                    class={`sc-docs-sidebar__link${item.active ? " sc-docs-sidebar__link--active" : ""}`}
                    key={ii}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </aside>
        )}

        <main class="sc-docs-content">
          {children}
        </main>
      </div>
    </div>
  );
}
