import { useId } from "preact/hooks";
import * as listbox from "@zag-js/listbox";
import { useMachine, normalizeProps } from "@zag-js/preact";

export interface ListboxItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ListboxProps {
  items: ListboxItem[];
  label?: string;
  value?: string[];
  onValueChange?: (values: string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
}

export function Listbox({ items, label, value, onValueChange, multiple, disabled }: ListboxProps) {
  const collection = listbox.collection({
    items,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });
  const service = useMachine(listbox.machine, {
    id: useId(),
    collection,
    value,
    selectionMode: multiple ? "multiple" : "single",
    disabled,
    onValueChange: (d: { value: string[] }) => onValueChange?.(d.value),
  });
  const api = listbox.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      {label && <label {...api.getLabelProps()}>{label}</label>}
      <div {...api.getContentProps()}>
        {items.map((item) => (
          <div key={item.value} {...api.getItemProps({ item })}>
            <span {...api.getItemTextProps({ item })}>{item.label}</span>
            <span {...api.getItemIndicatorProps({ item })}>✓</span>
          </div>
        ))}
      </div>
    </div>
  );
}
