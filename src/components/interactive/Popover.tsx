import { useId } from "preact/hooks";
import * as popover from "@zag-js/popover";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

/** Popover の props */
export interface PopoverProps {
  /** トリガーボタンの内容 */
  trigger: ComponentChildren;
  /** ポップオーバーの内容 */
  children: ComponentChildren;
  /** タイトル */
  title?: string;
  /** 配置 */
  positioning?: { placement?: "top" | "bottom" | "left" | "right" };
}

/** ポップオーバーコンポーネント */
export function Popover({ trigger, children, title, positioning }: PopoverProps) {
  const service = useMachine(popover.machine, {
    id: useId(),
    positioning,
  });
  const api = popover.connect(service, normalizeProps);

  return (
    <div>
      <button {...api.getTriggerProps()}>{trigger}</button>
      <div {...api.getPositionerProps()}>
        <div {...api.getContentProps()}>
          {title && (
            <div {...api.getTitleProps()}>{title}</div>
          )}
          <div {...api.getDescriptionProps()}>
            {children}
          </div>
          <button {...api.getCloseTriggerProps()} aria-label="閉じる">✕</button>
        </div>
      </div>
    </div>
  );
}
