import type { ComponentChildren, FunctionComponent } from "preact";

/** 料金プラン */
export interface PricingPlan {
  /** プラン名 */
  name: string;
  /** 料金表示（例: "¥980/月"） */
  price: string;
  /** サブ説明（例: "年払い ¥9,800"） */
  priceNote?: string;
  /** 説明 */
  description?: string;
  /** 機能リスト */
  features: string[];
  /** CTA ボタンのラベル */
  ctaLabel?: string;
  /** CTA ボタンの href */
  ctaHref?: string;
  /** 推奨プランかどうか */
  recommended?: boolean;
  /** アイコン */
  icon?: FunctionComponent<{ size?: number }>;
}

/** PricingPage の props */
export interface PricingPageProps {
  /** ブランド名 */
  brand: string;
  /** ページタイトル */
  title?: string;
  /** サブタイトル */
  subtitle?: string;
  /** 料金プラン */
  plans: PricingPlan[];
  /** プランの下に表示するコンテンツ */
  children?: ComponentChildren;
  /** フッターの著作権表示 */
  copyright?: string;
}

/** 料金ページのコンポーネント */
export function PricingPage(props: PricingPageProps) {
  const {
    brand,
    title = "料金プラン",
    subtitle,
    plans,
    children,
    copyright,
  } = props;

  return (
    <div class="sc-pricing-shell">
      <header class="sc-pricing-header">
        <div class="sc-pricing-header__inner">
          <a href="/" class="sc-pricing-header__brand" style="font-weight:700;letter-spacing:-0.02em;text-decoration:none;color:inherit;">
            {brand}
          </a>
        </div>
      </header>

      <main class="sc-pricing-content">
        <div class="sc-pricing-content__inner">
          <h1 class="sc-pricing-title">{title}</h1>
          {subtitle && <p class="sc-pricing-subtitle">{subtitle}</p>}

          <div class="sc-pricing-grid">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <div
                  class={`sc-pricing-card${plan.recommended ? " sc-pricing-card--recommended" : ""}`}
                  key={i}
                >
                  {plan.recommended && (
                    <div class="sc-pricing-card__badge">おすすめ</div>
                  )}
                  {Icon && (
                    <div class="sc-pricing-card__icon">
                      <Icon size={28} />
                    </div>
                  )}
                  <h3 class="sc-pricing-card__name">{plan.name}</h3>
                  <div class="sc-pricing-card__price">{plan.price}</div>
                  {plan.priceNote && (
                    <div class="sc-pricing-card__price-note">{plan.priceNote}</div>
                  )}
                  {plan.description && (
                    <p class="sc-pricing-card__description">{plan.description}</p>
                  )}
                  <ul class="sc-pricing-card__features">
                    {plan.features.map((f, fi) => (
                      <li key={fi}>{f}</li>
                    ))}
                  </ul>
                  {plan.ctaHref && (
                    <a
                      href={plan.ctaHref}
                      class={`st-button ${plan.recommended ? "st-button--filled" : "st-button--outlined"}`}
                      style="display:block;text-align:center;"
                    >
                      {plan.ctaLabel ?? "はじめる"}
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {children}
        </div>
      </main>

      {copyright && (
        <footer class="sc-pricing-footer">
          <div class="sc-pricing-footer__inner">{copyright}</div>
        </footer>
      )}
    </div>
  );
}
