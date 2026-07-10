import type { ComponentChildren } from "preact";

/** AdminPage の props */
export interface AdminPageProps {
  /** ページタイトル */
  title: string;
  /** ページの説明 */
  description?: string;
  /** ページヘッダー右側のアクション */
  actions?: ComponentChildren;
  /** ページコンテンツ */
  children: ComponentChildren;
}

/** 管理画面のページコンテナ */
export function AdminPage({ title, description, actions, children }: AdminPageProps) {
  return (
    <div class="sc-admin-page">
      <div class="sc-admin-page__header">
        <div>
          <h1 class="sc-admin-page__title">{title}</h1>
          {description && (
            <p class="sc-admin-page__description">{description}</p>
          )}
        </div>
        {actions && (
          <div class="sc-admin-page__actions">{actions}</div>
        )}
      </div>
      <div class="sc-admin-page__body">
        {children}
      </div>
    </div>
  );
}
