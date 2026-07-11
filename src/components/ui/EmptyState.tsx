import type { ComponentChildren } from "preact";

/** EmptyState の props */
export interface EmptyStateProps {
  /** アイコン */
  icon?: ComponentChildren;
  /** タイトル */
  title: string;
  /** 説明文 */
  description?: string;
  /** アクションボタン等 */
  action?: ComponentChildren;
}

/** 空状態コンポーネント */
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:64px 24px;text-align:center;">
      {icon && (
        <div style="margin-bottom:16px;color:var(--sc-sys-color-on-surface-variant);opacity:0.5;font-size:3rem;">
          {icon}
        </div>
      )}
      <h3 style="margin:0 0 8px;font-size:1.125rem;font-weight:600;color:var(--sc-sys-color-on-surface);">
        {title}
      </h3>
      {description && (
        <p style="margin:0 0 20px;font-size:0.875rem;color:var(--sc-sys-color-on-surface-variant);max-width:400px;">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
