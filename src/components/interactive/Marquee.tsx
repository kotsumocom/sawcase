import { useId } from "preact/hooks";
import * as marquee from "@zag-js/marquee";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

export interface MarqueeProps {
  children: ComponentChildren;
  speed?: number;
  pauseOnHover?: boolean;
}

export function Marquee({ children, speed, pauseOnHover = true }: MarqueeProps) {
  // deno-lint-ignore no-explicit-any
  const service = useMachine(marquee.machine, {
    id: useId(),
    speed,
    pauseOnHover,
  } as any);
  const api = marquee.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      <div {...api.getContentProps({ index: 0 })}>
        {children}
      </div>
    </div>
  );
}
