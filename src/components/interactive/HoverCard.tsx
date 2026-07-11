import { useId } from "preact/hooks";
import * as hoverCard from "@zag-js/hover-card";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

/** HoverCard の props */
export interface HoverCardProps {
  /** トリガー要素 */
  trigger: ComponentChildren;
  /** ホバー時に表示する内容 */
  children: ComponentChildren;
  /** 開くまでの遅延（ms） */
  openDelay?: number;
  /** 閉じるまでの遅延（ms） */
  closeDelay?: number;
}

/** ホバーカードコンポーネント */
export function HoverCard({ trigger, children, openDelay = 700, closeDelay = 300 }: HoverCardProps) {
  const service = useMachine(hoverCard.machine, {
    id: useId(),
    openDelay,
    closeDelay,
  });
  const api = hoverCard.connect(service, normalizeProps);

  return (
    <div>
      <a {...api.getTriggerProps()}>{trigger}</a>
      <div {...api.getPositionerProps()}>
        <div {...api.getContentProps()}>
          {children}
        </div>
      </div>
    </div>
  );
}
