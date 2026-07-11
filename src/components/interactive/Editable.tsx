import { useId } from "preact/hooks";
import * as editable from "@zag-js/editable";
import { useMachine, normalizeProps } from "@zag-js/preact";

export interface EditableProps {
  value?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export function Editable({ value, placeholder = "クリックして編集", onValueChange, disabled }: EditableProps) {
  const service = useMachine(editable.machine, {
    id: useId(),
    value,
    placeholder,
    disabled,
    onValueChange: (d: { value: string }) => onValueChange?.(d.value),
  });
  const api = editable.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      <div {...api.getAreaProps()}>
        <input {...api.getInputProps()} />
        <span {...api.getPreviewProps()} />
      </div>
      <div {...api.getControlProps()}>
        {api.editing ? (
          <>
            <button {...api.getSubmitTriggerProps()}>✓</button>
            <button {...api.getCancelTriggerProps()}>✕</button>
          </>
        ) : (
          <button {...api.getEditTriggerProps()}>✎</button>
        )}
      </div>
    </div>
  );
}
