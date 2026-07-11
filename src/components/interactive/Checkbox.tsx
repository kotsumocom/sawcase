import { useId } from "preact/hooks";
import * as checkbox from "@zag-js/checkbox";
import { useMachine, normalizeProps } from "@zag-js/preact";

/** Checkbox の props */
export interface CheckboxProps {
  /** ラベル */
  label: string;
  /** チェック状態 */
  checked?: boolean;
  /** 変更コールバック */
  onCheckedChange?: (checked: boolean) => void;
  /** 無効状態 */
  disabled?: boolean;
}

/** チェックボックスコンポーネント */
export function Checkbox({ label, checked, onCheckedChange, disabled }: CheckboxProps) {
  const service = useMachine(checkbox.machine, {
    id: useId(),
    checked,
    disabled,
    onCheckedChange: (d: { checked: boolean | string }) => onCheckedChange?.(d.checked === true),
  });
  const api = checkbox.connect(service, normalizeProps);

  return (
    <label {...api.getRootProps()}>
      <div {...api.getControlProps()}>
        {api.checked && (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <span {...api.getLabelProps()}>{label}</span>
      <input {...api.getHiddenInputProps()} />
    </label>
  );
}
