import type { ComponentChildren, FunctionComponent } from "preact";

/** フィーチャーカード */
interface Feature {
  /** アイコン（Lucide コンポーネント） */
  icon?: FunctionComponent<{ size?: number }>;
  /** アイコンの色 */
  iconColor?: string;
  /** タイトル */
  title: string;
  /** 説明 */
  description: string;
}

/** ヘッダーナビ項目 */
interface HeaderNavItem {
  label: string;
  href: string;
  external?: boolean;
}

/** フッターリンク */
interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

/** LandingPage の props */
export interface LandingPageProps {
  /** ブランド名 */
  brand: string;
  /** ヘッダーナビゲーション */
  headerNav?: HeaderNavItem[];
  /** ヒーローのヘッドライン */
  headline: string;
  /** ヒーローのサブヘッド */
  subhead?: string;
  /** ヒーローのアクションボタン */
  heroActions?: ComponentChildren;
  /** フィーチャーカード */
  features?: Feature[];
  /** メインコンテンツ（フィーチャーの後に配置） */
  children?: ComponentChildren;
  /** フッターの著作権表示 */
  copyright?: string;
  /** フッターのリンク */
  footerLinks?: FooterLink[];
}

/** ランディングページのフルページコンポーネント */
export function LandingPage(props: LandingPageProps) {
  const {
    brand,
    headerNav = [],
    headline,
    subhead,
    heroActions,
    features = [],
    children,
    copyright,
    footerLinks = [],
  } = props;

  return (
    <div class="sc-lp-shell">
      {/* ヘッダー */}
      <header class="sc-lp-header">
        <div class="sc-lp-header__inner">
          <span
            class="sc-lp-header__brand"
            style="font-weight:700;letter-spacing:-0.02em;"
          >
            {brand}
          </span>
          {headerNav.length > 0 && (
            <nav class="sc-lp-header__nav">
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

      {/* ヒーロー */}
      <section class="sc-lp-hero">
        <div class="sc-lp-hero__inner">
          <h1 class="sc-lp-hero__headline">{headline}</h1>
          {subhead && <p class="sc-lp-hero__subhead">{subhead}</p>}
          {heroActions && (
            <div class="sc-lp-hero__actions">{heroActions}</div>
          )}
        </div>
      </section>

      {/* フィーチャー */}
      {features.length > 0 && (
        <section class="sc-lp-section">
          <div class="sc-lp-section__inner">
            <div class="sc-lp-features">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div class="sc-lp-features__card" key={i}>
                    {Icon && (
                      <div
                        class="sc-lp-features__card-icon"
                        style={f.iconColor ? `color:${f.iconColor}` : undefined}
                      >
                        <Icon size={28} />
                      </div>
                    )}
                    <h3 class="sc-lp-features__card-title">{f.title}</h3>
                    <p class="sc-lp-features__card-description">
                      {f.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* カスタムコンテンツ */}
      {children}

      {/* フッター */}
      <footer class="sc-lp-footer">
        <div class="sc-lp-footer__inner">
          {copyright && (
            <div class="sc-lp-footer__copyright">{copyright}</div>
          )}
          {footerLinks.length > 0 && (
            <div class="sc-lp-footer__links">
              {footerLinks.map((link, i) => (
                <a
                  href={link.href}
                  key={i}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener" }
                    : {})}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
