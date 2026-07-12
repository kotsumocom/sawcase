import { useState } from "preact/hooks";
import type { ComponentChildren, FunctionComponent } from "preact";

/** FAB のサブアクション（SpeedDial） */
export interface FabAction {
  /** Lucide アイコン */
  icon: FunctionComponent<{ size?: number | string }>;
  /** ラベル */
  label: string;
  /** クリックハンドラ */
  onClick?: () => void;
  /** リンク先 */
  href?: string;
}

export type FabVariant = "primary" | "secondary" | "tertiary" | "surface";
export type FabSize = "sm" | "md" | "lg";
export type FabPosition = "bottom-right" | "bottom-left" | "bottom-center";

export interface FabProps {
  /** Lucide アイコン */
  icon: FunctionComponent<{ size?: number | string }>;
  /** ラベル（指定時は Extended FAB） */
  label?: string;
  /** クリック */
  onClick?: () => void;
  /** リンク先（指定時は <a>） */
  href?: string;
  /** バリアント（デフォルト: "primary"） */
  variant?: FabVariant;
  /** サイズ（デフォルト: "md"） */
  size?: FabSize;
  /** 位置（デフォルト: "bottom-right"） */
  position?: FabPosition;
  /** 固定位置（デフォルト: true） */
  fixed?: boolean;
  /** SpeedDial サブアクション */
  actions?: FabAction[];
  /** aria-label */
  "aria-label"?: string;
  /** 追加 children */
  children?: ComponentChildren;
}

const ICON_SIZE: Record<FabSize, number> = {
  sm: 20,
  md: 24,
  lg: 28,
};

/**
 * FAB (Floating Action Button) — Material Design 3 準拠。
 *
 * ```tsx
 * // 基本 FAB
 * <Fab icon={Plus} onClick={() => {}} />
 *
 * // Extended FAB
 * <Fab icon={Plus} label="新規作成" />
 *
 * // SpeedDial FAB
 * <Fab
 *   icon={Plus}
 *   actions={[
 *     { icon: Upload, label: "アップロード", onClick: () => {} },
 *     { icon: FileText, label: "テンプレート", onClick: () => {} },
 *   ]}
 * />
 * ```
 */
export function Fab({
  icon: Icon,
  label,
  onClick,
  href,
  variant = "primary",
  size = "md",
  position = "bottom-right",
  fixed = true,
  actions,
  "aria-label": ariaLabel,
}: FabProps) {
  const [open, setOpen] = useState(false);
  const hasActions = actions && actions.length > 0;

  const cls = [
    "sc-fab",
    `sc-fab--${variant}`,
    `sc-fab--${size}`,
    label ? "sc-fab--extended" : "",
    fixed ? `sc-fab--fixed sc-fab--${position}` : "",
  ].filter(Boolean).join(" ");

  const handleClick = () => {
    if (hasActions) {
      setOpen(!open);
    } else {
      onClick?.();
    }
  };

  const Tag = href && !hasActions ? "a" : "button";
  const tagProps = href && !hasActions
    ? { href }
    : { type: "button" as const, onClick: handleClick };

  return (
    <div class={`sc-fab-container${fixed ? ` sc-fab-container--fixed sc-fab-container--${position}` : ""}`}>
      {/* SpeedDial アクション */}
      {hasActions && open && (
        <div class="sc-fab-actions">
          {actions!.map((action, i) => {
            const ActionIcon = action.icon;
            const ActionTag = action.href ? "a" : "button";
            const actionProps = action.href
              ? { href: action.href }
              : { type: "button" as const, onClick: () => { action.onClick?.(); setOpen(false); } };

            return (
              <ActionTag
                key={i}
                class="sc-fab-actions__item"
                {...actionProps}
              >
                <span class="sc-fab-actions__label">{action.label}</span>
                <span class="sc-fab-actions__icon">
                  <ActionIcon size={20} />
                </span>
              </ActionTag>
            );
          })}
        </div>
      )}

      <Tag
        class={cls}
        aria-label={ariaLabel || label}
        {...tagProps}
      >
        <span class={`sc-fab__icon${hasActions && open ? " sc-fab__icon--rotate" : ""}`}>
          <Icon size={ICON_SIZE[size]} />
        </span>
        {label && <span class="sc-fab__label">{label}</span>}
      </Tag>
    </div>
  );
}
