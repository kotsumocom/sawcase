import { useId } from "preact/hooks";
import * as toggle from "@zag-js/toggle";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

export interface ToggleProps {
  label?: string;
  children?: ComponentChildren;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ label, children, pressed, onPressedChange, disabled }: ToggleProps) {
  // deno-lint-ignore no-explicit-any
  const service = useMachine(toggle.machine, {
    id: useId(),
    pressed,
    disabled,
    onPressedChange: (pressed: boolean) => onPressedChange?.(pressed),
  } as any);
  const api = toggle.connect(service, normalizeProps);
  return (
    <button {...api.getIndicatorProps()} aria-label={label}>
      {children || label}
    </button>
  );
}
