import type { ComponentChildren, FunctionComponent } from "preact";

/** AuthCard の props */
export interface AuthCardProps {
  /** カードタイトル */
  title: string;
  /** サブタイトル */
  subtitle?: string;
  /** ロゴ（Lucide アイコンコンポーネントまたは JSX） */
  logo?: ComponentChildren;
  /** フォーム等のメインコンテンツ */
  children: ComponentChildren;
  /** フッター（「アカウントをお持ちですか？」等） */
  footer?: ComponentChildren;
}

/** 認証画面の中央配置カードコンポーネント */
export function AuthCard(props: AuthCardProps) {
  const { title, subtitle, logo, children, footer } = props;

  return (
    <div class="sc-auth">
      <div class="sc-auth__card">
        <div class="sc-auth__header">
          {logo && <div class="sc-auth__logo">{logo}</div>}
          <h1 class="sc-auth__title">{title}</h1>
          {subtitle && <p class="sc-auth__subtitle">{subtitle}</p>}
        </div>

        <div class="sc-auth__body">
          {children}
        </div>

        {footer && (
          <div class="sc-auth__footer">{footer}</div>
        )}
      </div>
    </div>
  );
}
