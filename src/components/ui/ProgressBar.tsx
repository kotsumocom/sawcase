export interface ProgressBarProps {
  /** ラベル */
  label: string;
  /** 現在値 */
  value: number;
  /** 最大値（デフォルト: 100） */
  max?: number;
  /** この値以上で danger 色になる */
  danger?: number;
  /** 単位表示（例: "GB", "%"） */
  unit?: string;
  /** 値のフォーマット（例: "72 / 100"） */
  formatValue?: (value: number, max: number) => string;
}

/**
 * プログレスバー。リソース使用率やタスク進捗の表示に。
 *
 * ```tsx
 * <ProgressBar label="CPU 使用率" value={72} unit="%" danger={80} />
 * <ProgressBar label="ストレージ" value={45} max={100} unit="GB"
 *   formatValue={(v, m) => `${v} / ${m}`} />
 * ```
 */
export function ProgressBar({
  label,
  value,
  max = 100,
  danger,
  unit = "%",
  formatValue,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const isDanger = danger !== undefined && value >= danger;
  const display = formatValue
    ? formatValue(value, max)
    : `${value}${unit}`;

  return (
    <div class="sc-progress-bar" role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
      <div class="sc-progress-bar__header">
        <span class="sc-progress-bar__label">{label}</span>
        <span class={`sc-progress-bar__value${isDanger ? " sc-progress-bar__value--danger" : ""}`}>
          {display}
        </span>
      </div>
      <div class="sc-progress-bar__track">
        <div
          class={`sc-progress-bar__fill${isDanger ? " sc-progress-bar__fill--danger" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
