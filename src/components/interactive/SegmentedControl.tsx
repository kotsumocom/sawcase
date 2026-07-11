import { useId } from "preact/hooks";
import * as radioGroup from "@zag-js/radio-group";
import { useMachine, normalizeProps } from "@zag-js/preact";

/** セグメントアイテム */
export interface SegmentItem {
  label: string;
  value: string;
  disabled?: boolean;
}

/** SegmentedControl の props */
export interface SegmentedControlProps {
  items: SegmentItem[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

/** セグメントコントロールコンポーネント（RadioGroup ベース） */
export function SegmentedControl({ items, value, onValueChange, disabled }: SegmentedControlProps) {
  const service = useMachine(radioGroup.machine, {
    id: useId(),
    value,
    orientation: "horizontal",
    disabled,
    onValueChange: (d: { value: string | null }) => { if (d.value) onValueChange?.(d.value); },
  });
  const api = radioGroup.connect(service, normalizeProps);

  return (
    <div {...api.getRootProps()} data-scope="segmented-control">
      <div {...api.getIndicatorProps()} />
      {items.map((item) => (
        <label key={item.value} {...api.getItemProps({ value: item.value })}>
          <span {...api.getItemTextProps({ value: item.value })}>{item.label}</span>
          <input {...api.getItemHiddenInputProps({ value: item.value })} />
        </label>
      ))}
    </div>
  );
}
