import { useId } from "preact/hooks";
import * as cascadeSelect from "@zag-js/cascade-select";
import { useMachine, normalizeProps } from "@zag-js/preact";

export interface CascadeItem {
  label: string;
  value: string;
  children?: CascadeItem[];
}

export interface CascadeSelectProps {
  items: CascadeItem[];
  label?: string;
  placeholder?: string;
  onValueChange?: (values: string[]) => void;
  disabled?: boolean;
}

export function CascadeSelect({ items, label, placeholder = "選択してください", onValueChange, disabled }: CascadeSelectProps) {
  // deno-lint-ignore no-explicit-any
  const service = useMachine(cascadeSelect.machine, {
    id: useId(),
    collection: cascadeSelect.collection({
      rootNode: { value: "root", label: "Root", children: items },
      nodeToValue: (node: CascadeItem) => node.value,
      nodeToString: (node: CascadeItem) => node.label,
    }),
    disabled,
    onValueChange: (d: { value: string[] }) => onValueChange?.(d.value),
  } as any);
  const api = cascadeSelect.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      {label && <label {...api.getLabelProps()}>{label}</label>}
      <div {...api.getControlProps()}>
        <button {...api.getTriggerProps()}>
          {api.valueAsString || placeholder}
        </button>
      </div>
      <div {...api.getPositionerProps()}>
        <div {...api.getContentProps()} />
      </div>
    </div>
  );
}
