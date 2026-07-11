import { useId } from "preact/hooks";
import * as pinInput from "@zag-js/pin-input";
import { useMachine, normalizeProps } from "@zag-js/preact";

export interface PinInputProps {
  length?: number;
  type?: "numeric" | "alphanumeric" | "alphabetic";
  mask?: boolean;
  placeholder?: string;
  onValueComplete?: (value: string) => void;
  disabled?: boolean;
}

export function PinInput({ length = 4, type = "numeric", mask, placeholder = "○", onValueComplete, disabled }: PinInputProps) {
  const service = useMachine(pinInput.machine, {
    id: useId(),
    type,
    mask,
    placeholder,
    disabled,
    onValueComplete: (d: { valueAsString: string }) => onValueComplete?.(d.valueAsString),
  });
  const api = pinInput.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      {Array.from({ length }).map((_, i) => (
        <input key={i} {...api.getInputProps({ index: i })} />
      ))}
      <input {...api.getHiddenInputProps()} />
    </div>
  );
}
