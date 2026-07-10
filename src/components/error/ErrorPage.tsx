import type { ComponentChildren, FunctionComponent } from "preact";

/** ErrorPage の props */
export interface ErrorPageProps {
  /** HTTP ステータスコード */
  code: number;
  /** エラータイトル */
  title: string;
  /** エラーメッセージ */
  message?: string;
  /** アイコン（Lucide コンポーネント） */
  icon?: FunctionComponent<{ size?: number }>;
  /** 戻るリンクのテキスト */
  backLabel?: string;
  /** 戻るリンクの href */
  backHref?: string;
  /** 追加のアクション */
  children?: ComponentChildren;
}

/** エラーページコンポーネント */
export function ErrorPage(props: ErrorPageProps) {
  const {
    code,
    title,
    message,
    icon: Icon,
    backLabel = "トップページに戻る",
    backHref = "/",
    children,
  } = props;

  return (
    <div class="sc-error-shell">
      <div class="sc-error-card">
        {Icon && (
          <div class="sc-error-card__icon">
            <Icon size={48} />
          </div>
        )}
        <div class="sc-error-card__code">{code}</div>
        <h1 class="sc-error-card__title">{title}</h1>
        {message && (
          <p class="sc-error-card__message">{message}</p>
        )}
        <div class="sc-error-card__actions">
          <a href={backHref} class="st-button st-button--filled">
            {backLabel}
          </a>
          {children}
        </div>
      </div>
    </div>
  );
}
