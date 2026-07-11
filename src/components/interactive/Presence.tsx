import * as presence from "@zag-js/presence";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

export interface PresenceProps {
  present: boolean;
  children: ComponentChildren;
  onExitComplete?: () => void;
}

export function Presence({ present, children, onExitComplete }: PresenceProps) {
  // deno-lint-ignore no-explicit-any
  const service = useMachine(presence.machine, {
    present,
    onExitComplete,
  } as any);
  const api = presence.connect(service, normalizeProps);

  if (!api.present) return null;

  return (
    <div ref={api.setNode} data-state={present ? "open" : "closed"}>
      {children}
    </div>
  );
}
