import type { ComponentChildren } from "preact";

/** ブログのサイドバー項目 */
interface BlogSidebarItem {
  label: string;
  href: string;
  active?: boolean;
}

/** ブログのカテゴリ */
interface BlogCategory {
  label: string;
  items: BlogSidebarItem[];
}

/** BlogLayout の props */
export interface BlogLayoutProps {
  /** ブランド名 */
  brand: string;
  /** ヘッダーナビ */
  headerNav?: { label: string; href: string; external?: boolean }[];
  /** サイドバーのカテゴリ */
  categories?: BlogCategory[];
  /** 最近の記事リスト */
  recentPosts?: BlogSidebarItem[];
  /** メインコンテンツ */
  children: ComponentChildren;
}

/** ブログレイアウトコンポーネント */
export function BlogLayout(props: BlogLayoutProps) {
  const {
    brand,
    headerNav = [],
    categories = [],
    recentPosts = [],
    children,
  } = props;

  return (
    <div class="sc-blog-shell">
      <header class="sc-blog-header">
        <div class="sc-blog-header__inner">
          <a href="/" class="sc-blog-header__brand" style="font-weight:700;letter-spacing:-0.02em;text-decoration:none;color:inherit;">
            {brand}
          </a>
          {headerNav.length > 0 && (
            <nav class="sc-blog-header__nav">
              {headerNav.map((item, i) => (
                <a
                  href={item.href}
                  key={i}
                  {...(item.external ? { target: "_blank", rel: "noopener" } : {})}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      <div class="sc-blog-body">
        <main class="sc-blog-content">
          {children}
        </main>

        {(categories.length > 0 || recentPosts.length > 0) && (
          <aside class="sc-blog-sidebar">
            {categories.map((cat, ci) => (
              <div class="sc-blog-sidebar__group" key={ci}>
                <div class="sc-blog-sidebar__group-label">{cat.label}</div>
                {cat.items.map((item, ii) => (
                  <a
                    href={item.href}
                    key={ii}
                    class={`sc-blog-sidebar__link${item.active ? " sc-blog-sidebar__link--active" : ""}`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
            {recentPosts.length > 0 && (
              <div class="sc-blog-sidebar__group">
                <div class="sc-blog-sidebar__group-label">最近の記事</div>
                {recentPosts.map((post, pi) => (
                  <a href={post.href} key={pi} class="sc-blog-sidebar__link">
                    {post.label}
                  </a>
                ))}
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
