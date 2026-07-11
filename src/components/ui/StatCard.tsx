import type { ComponentChildren } from "preact";

/** StatCard の props */
export interface StatCardProps {
  /** ラベル */
  label: string;
  /** 値 */
  value: string | number;
  /** トレンド表示（例: "+12.5%"） */
  trend?: string;
  /** トレンドが上向きか */
  trendUp?: boolean;
  /** アイコン */
  icon?: ComponentChildren;
  /** 説明 */
  description?: string;
}

/** KPI / 統計カードコンポーネント */
export function StatCard({
  label,
  value,
  trend,
  trendUp,
  icon,
  description,
}: StatCardProps) {
  return (
    <div class="sc-admin-stats__card" title={description}>
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div class="sc-admin-stats__label">{label}</div>
        {icon && (
          <div style="color:var(--sc-sys-color-on-surface-variant);opacity:0.6;">
            {icon}
          </div>
        )}
      </div>
      <div class="sc-admin-stats__value">{value}</div>
      {trend && (
        <div
          class={`sc-admin-stats__trend sc-admin-stats__trend--${trendUp ? "up" : "down"}`}
        >
          {trend}
        </div>
      )}
    </div>
  );
}
