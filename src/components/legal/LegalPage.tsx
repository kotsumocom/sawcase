import type { ComponentChildren } from "preact";
import { Markdown } from "../docs/Markdown.tsx";

/** LegalPage の props */
export interface LegalPageProps {
  /** ブランド名 */
  brand: string;
  /** ページタイトル（「利用規約」「プライバシーポリシー」等） */
  title: string;
  /** 最終更新日 */
  lastUpdated?: string;
  /** 規約の Markdown テキスト */
  content?: string;
  /** 規約の HTML コンテンツ（Markdown の代わりに使用） */
  children?: ComponentChildren;
  /** ナビゲーション項目（他の規約ページへのリンク） */
  nav?: { label: string; href: string; active?: boolean }[];
  /** フッターの著作権表示 */
  copyright?: string;
}

/** 規約ページのレイアウトコンポーネント */
export function LegalPage(props: LegalPageProps) {
  const {
    brand,
    title,
    lastUpdated,
    content,
    children,
    nav = [],
    copyright,
  } = props;

  return (
    <div class="sc-legal-shell">
      <header class="sc-legal-header">
        <div class="sc-legal-header__inner">
          <span
            class="sc-legal-header__brand"
            style="font-weight:700;letter-spacing:-0.02em;"
          >
            {brand}
          </span>
          {nav.length > 0 && (
            <nav class="sc-legal-header__nav">
              {nav.map((item, i) => (
                <a
                  href={item.href}
                  key={i}
                  class={item.active ? "sc-legal-header__link--active" : ""}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main class="sc-legal-content">
        <article class="sc-legal-article">
          <h1 class="sc-legal-article__title">{title}</h1>
          {lastUpdated && (
            <p class="sc-legal-article__date">
              最終更新日: {lastUpdated}
            </p>
          )}

          {content ? <Markdown content={content} /> : children}
        </article>
      </main>

      {copyright && (
        <footer class="sc-legal-footer">
          <div class="sc-legal-footer__inner">{copyright}</div>
        </footer>
      )}
    </div>
  );
}
