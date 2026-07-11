import { useId } from "preact/hooks";
import * as sw from "@zag-js/switch";
import { useMachine, normalizeProps } from "@zag-js/preact";

/** Switch の props */
export interface SwitchProps {
  /** ラベル */
  label: string;
  /** チェック状態 */
  checked?: boolean;
  /** 変更コールバック */
  onCheckedChange?: (checked: boolean) => void;
  /** 無効状態 */
  disabled?: boolean;
}

/** トグルスイッチコンポーネント */
export function Switch({ label, checked, onCheckedChange, disabled }: SwitchProps) {
  const service = useMachine(sw.machine, {
    id: useId(),
    checked,
    disabled,
    onCheckedChange: (d: { checked: boolean }) => onCheckedChange?.(d.checked),
  });
  const api = sw.connect(service, normalizeProps);

  return (
    <label {...api.getRootProps()}>
      <input {...api.getHiddenInputProps()} />
      <span {...api.getControlProps()}>
        <span {...api.getThumbProps()} />
      </span>
      <span {...api.getLabelProps()}>{label}</span>
    </label>
  );
}
