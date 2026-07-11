import { useId } from "preact/hooks";
import * as scrollArea from "@zag-js/scroll-area";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

export interface ScrollAreaProps {
  children: ComponentChildren;
  type?: "auto" | "always" | "scroll" | "hover";
}

export function ScrollArea({ children, type = "auto" }: ScrollAreaProps) {
  // deno-lint-ignore no-explicit-any
  const service = useMachine(scrollArea.machine, {
    id: useId(),
    type,
  } as any);
  const api = scrollArea.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      <div {...api.getViewportProps()}>
        {children}
      </div>
      <div {...api.getScrollbarProps({ orientation: "vertical" })}>
        <div {...api.getThumbProps({ orientation: "vertical" })} />
      </div>
      <div {...api.getScrollbarProps({ orientation: "horizontal" })}>
        <div {...api.getThumbProps({ orientation: "horizontal" })} />
      </div>
    </div>
  );
}
