import { useId } from "preact/hooks";
import * as toggleGroup from "@zag-js/toggle-group";
import { useMachine, normalizeProps } from "@zag-js/preact";

export interface ToggleGroupItem {
  value: string;
  label: string;
}

export interface ToggleGroupProps {
  items: ToggleGroupItem[];
  value?: string[];
  onValueChange?: (values: string[]) => void;
  multiple?: boolean;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
}

export function ToggleGroup({ items, value, onValueChange, multiple, orientation = "horizontal", disabled }: ToggleGroupProps) {
  const service = useMachine(toggleGroup.machine, {
    id: useId(),
    value,
    multiple,
    orientation,
    disabled,
    onValueChange: (d: { value: string[] }) => onValueChange?.(d.value),
  });
  const api = toggleGroup.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      {items.map((item) => (
        <button key={item.value} {...api.getItemProps({ value: item.value })}>{item.label}</button>
      ))}
    </div>
  );
}
