import { useId } from "preact/hooks";
import * as select from "@zag-js/select";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

/** Select のアイテム */
export interface SelectItem {
  label: string;
  value: string;
  disabled?: boolean;
}

/** Select の props */
export interface SelectProps {
  /** 選択肢 */
  items: SelectItem[];
  /** プレースホルダー */
  placeholder?: string;
  /** 選択値 */
  value?: string[];
  /** 変更コールバック */
  onValueChange?: (values: string[]) => void;
  /** 無効状態 */
  disabled?: boolean;
  /** ラベル */
  label?: string;
  /** カスタムトリガー */
  children?: ComponentChildren;
}

/** ドロップダウン選択コンポーネント */
export function Select({
  items,
  placeholder = "選択してください",
  value,
  onValueChange,
  disabled,
  label,
}: SelectProps) {
  const collection = select.collection({ items, itemToString: (item) => item.label, itemToValue: (item) => item.value });
  const service = useMachine(select.machine, {
    id: useId(),
    collection,
    value,
    disabled,
    onValueChange: (d: { value: string[] }) => onValueChange?.(d.value),
  });
  const api = select.connect(service, normalizeProps);

  return (
    <div {...api.getRootProps()}>
      {label && <label {...api.getLabelProps()}>{label}</label>}
      <div {...api.getControlProps()}>
        <button {...api.getTriggerProps()}>
          {api.valueAsString || placeholder}
        </button>
      </div>
      <div {...api.getPositionerProps()}>
        <ul {...api.getContentProps()}>
          {items.map((item) => (
            <li key={item.value} {...api.getItemProps({ item })}>
              <span {...api.getItemTextProps({ item })}>{item.label}</span>
              <span {...api.getItemIndicatorProps({ item })}>✓</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
