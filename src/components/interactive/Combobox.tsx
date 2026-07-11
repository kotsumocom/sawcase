import { useId } from "preact/hooks";
import * as combobox from "@zag-js/combobox";
import { useMachine, normalizeProps } from "@zag-js/preact";
import { useState } from "preact/hooks";

/** Combobox のアイテム */
export interface ComboboxItem {
  label: string;
  value: string;
  disabled?: boolean;
}

/** Combobox の props */
export interface ComboboxProps {
  /** 選択肢 */
  items: ComboboxItem[];
  /** プレースホルダー */
  placeholder?: string;
  /** ラベル */
  label?: string;
  /** 変更コールバック */
  onValueChange?: (values: string[]) => void;
  /** 無効状態 */
  disabled?: boolean;
}

/** オートコンプリート検索コンポーネント */
export function Combobox({
  items,
  placeholder = "検索...",
  label,
  onValueChange,
  disabled,
}: ComboboxProps) {
  const [filteredItems, setFilteredItems] = useState(items);

  const collection = combobox.collection({
    items: filteredItems,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  const service = useMachine(combobox.machine, {
    id: useId(),
    collection,
    disabled,
    onInputValueChange: ({ inputValue }: { inputValue: string }) => {
      const filtered = items.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredItems(filtered.length > 0 ? filtered : items);
    },
    onValueChange: (d: { value: string[] }) => onValueChange?.(d.value),
  });
  const api = combobox.connect(service, normalizeProps);

  return (
    <div {...api.getRootProps()}>
      {label && <label {...api.getLabelProps()}>{label}</label>}
      <div {...api.getControlProps()}>
        <input {...api.getInputProps()} placeholder={placeholder} />
        <button {...api.getTriggerProps()}>▼</button>
      </div>
      <div {...api.getPositionerProps()}>
        <ul {...api.getContentProps()}>
          {filteredItems.map((item) => (
            <li key={item.value} {...api.getItemProps({ item })}>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
