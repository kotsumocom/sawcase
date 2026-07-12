import { Switch } from "../interactive/Switch.tsx";

export interface ToggleSwitchProps {
  /** ラベル */
  label: string;
  /** 説明文 */
  description?: string;
  /** チェック状態 */
  checked?: boolean;
  /** 変更コールバック */
  onChange?: (checked: boolean) => void;
  /** 無効状態 */
  disabled?: boolean;
}

/**
 * トグルスイッチ。ラベル + 説明 + Zag.js Switch を組み合わせたリストアイテム。
 *
 * ```tsx
 * <ToggleSwitch
 *   label="二要素認証"
 *   description="ログイン時に認証コードを要求"
 *   checked={true}
 *   onChange={(v) => console.log(v)}
 * />
 * ```
 */
export function ToggleSwitch({
  label,
  description,
  checked,
  onChange,
  disabled,
}: ToggleSwitchProps) {
  return (
    <div class="sc-toggle-list__item">
      <div>
        <div class="sc-toggle-list__label">{label}</div>
        {description && <div class="sc-toggle-list__desc">{description}</div>}
      </div>
      <Switch
        label={label}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
