import { useId } from "preact/hooks";
import * as floatingPanel from "@zag-js/floating-panel";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

export interface FloatingPanelProps {
  trigger: ComponentChildren;
  title?: string;
  children: ComponentChildren;
}

export function FloatingPanel({ trigger, title, children }: FloatingPanelProps) {
  const service = useMachine(floatingPanel.machine, { id: useId() });
  const api = floatingPanel.connect(service, normalizeProps);
  return (
    <div>
      <button {...api.getTriggerProps()}>{trigger}</button>
      <div {...api.getPositionerProps()}>
        <div {...api.getContentProps()}>
          <div {...api.getDragTriggerProps()}>
            {title && <div {...api.getTitleProps()}>{title}</div>}
          </div>
          <div {...api.getBodyProps()}>{children}</div>
          <div {...api.getResizeTriggerProps({ axis: "se" })} />
        </div>
      </div>
    </div>
  );
}
