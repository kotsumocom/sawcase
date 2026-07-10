import { useId } from "preact/hooks";
import * as tooltip from "@zag-js/tooltip";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

/** Tooltip の props */
export interface TooltipProps {
  /** ツールチップのテキスト */
  content: string;
  /** トリガー要素 */
  children: ComponentChildren;
  /** 表示位置 */
  placement?: "top" | "bottom" | "left" | "right";
}

/** Zag.js ベースのツールチップ */
export function Tooltip({ content, children, placement = "top" }: TooltipProps) {
  const service = useMachine(tooltip.machine, {
    id: useId(),
    positioning: { placement },
  });
  const api = tooltip.connect(service, normalizeProps);

  return (
    <>
      <span {...api.getTriggerProps()}>{children}</span>
      {api.open && (
        <div {...api.getPositionerProps()}>
          <div {...api.getContentProps()} class="sc-tooltip">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
