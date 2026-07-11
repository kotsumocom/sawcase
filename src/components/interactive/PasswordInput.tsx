import { useId } from "preact/hooks";
import * as passwordInput from "@zag-js/password-input";
import { useMachine, normalizeProps } from "@zag-js/preact";

export interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export function PasswordInput({ label, placeholder = "パスワード", value, onValueChange, disabled }: PasswordInputProps) {
  // deno-lint-ignore no-explicit-any
  const service = useMachine(passwordInput.machine, {
    id: useId(),
    value,
    disabled,
    onValueChange: (d: { value: string }) => onValueChange?.(d.value),
  } as any);
  const api = passwordInput.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      {label && <label {...api.getLabelProps()}>{label}</label>}
      <div {...api.getControlProps()}>
        <input {...api.getInputProps()} placeholder={placeholder} />
        <button {...api.getVisibilityTriggerProps()}>
          {api.visible ? "🙈" : "👁"}
        </button>
      </div>
    </div>
  );
}
