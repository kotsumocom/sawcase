import { useId } from "preact/hooks";
import * as dialog from "@zag-js/dialog";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

export interface DrawerProps {
  trigger: ComponentChildren;
  title?: string;
  children: ComponentChildren;
  placement?: "left" | "right" | "top" | "bottom";
}

export function Drawer({ trigger, title, children, placement = "right" }: DrawerProps) {
  const service = useMachine(dialog.machine, { id: useId() });
  const api = dialog.connect(service, normalizeProps);
  return (
    <div>
      <button {...api.getTriggerProps()}>{trigger}</button>
      <div {...api.getBackdropProps()} />
      <div {...api.getPositionerProps()} data-placement={placement}>
        <div {...api.getContentProps()}>
          {title && <h2 {...api.getTitleProps()}>{title}</h2>}
          <div {...api.getDescriptionProps()}>{children}</div>
          <button {...api.getCloseTriggerProps()} aria-label="閉じる">✕</button>
        </div>
      </div>
    </div>
  );
}
