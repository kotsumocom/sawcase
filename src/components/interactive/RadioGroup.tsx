import { useId } from "preact/hooks";
import * as radioGroup from "@zag-js/radio-group";
import { useMachine, normalizeProps } from "@zag-js/preact";

/** ラジオアイテム */
export interface RadioItem {
  label: string;
  value: string;
  disabled?: boolean;
}

/** RadioGroup の props */
export interface RadioGroupProps {
  /** 選択肢 */
  items: RadioItem[];
  /** 選択値 */
  value?: string;
  /** 変更コールバック */
  onValueChange?: (value: string) => void;
  /** ラベル */
  label?: string;
  /** 方向 */
  orientation?: "horizontal" | "vertical";
  /** 無効状態 */
  disabled?: boolean;
}

/** ラジオボタングループコンポーネント */
export function RadioGroup({
  items,
  value,
  onValueChange,
  label,
  orientation = "vertical",
  disabled,
}: RadioGroupProps) {
  const service = useMachine(radioGroup.machine, {
    id: useId(),
    value,
    orientation,
    disabled,
    onValueChange: (d: { value: string | null }) => { if (d.value) onValueChange?.(d.value); },
  });
  const api = radioGroup.connect(service, normalizeProps);

  return (
    <div {...api.getRootProps()}>
      {label && <h3 {...api.getLabelProps()}>{label}</h3>}
      <div {...api.getIndicatorProps()} />
      {items.map((item) => (
        <label key={item.value} {...api.getItemProps({ value: item.value })}>
          <div {...api.getItemControlProps({ value: item.value })} />
          <span {...api.getItemTextProps({ value: item.value })}>{item.label}</span>
          <input {...api.getItemHiddenInputProps({ value: item.value })} />
        </label>
      ))}
    </div>
  );
}
