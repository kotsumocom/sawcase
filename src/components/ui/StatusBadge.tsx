import type { ComponentChildren } from "preact";

export type BadgeVariant = "success" | "warning" | "error" | "info" | "neutral";

export interface StatusBadgeProps {
  /** バリアント */
  variant?: BadgeVariant;
  /** テキスト */
  children: ComponentChildren;
  /** 小さいサイズ */
  small?: boolean;
}

/**
 * ステータスバッジ。色付きラベルで状態を表示。
 *
 * ```tsx
 * <StatusBadge variant="success">アクティブ</StatusBadge>
 * <StatusBadge variant="error" small>エラー</StatusBadge>
 * ```
 */
export function StatusBadge({
  variant = "neutral",
  children,
  small,
}: StatusBadgeProps) {
  return (
    <span
      class={`sc-badge sc-badge--${variant}${small ? " sc-badge--sm" : ""}`}
      role="status"
    >
      {children}
    </span>
  );
}
