import { useId } from "preact/hooks";
import * as collapsible from "@zag-js/collapsible";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

/** Collapsible の props */
export interface CollapsibleProps {
  /** トリガーラベル */
  label: string;
  /** 折りたたむ内容 */
  children: ComponentChildren;
  /** 初期表示状態 */
  open?: boolean;
  /** 無効状態 */
  disabled?: boolean;
}

/** 折りたたみコンポーネント */
export function Collapsible({ label, children, open, disabled }: CollapsibleProps) {
  const service = useMachine(collapsible.machine, {
    id: useId(),
    open,
    disabled,
  });
  const api = collapsible.connect(service, normalizeProps);

  return (
    <div {...api.getRootProps()}>
      <button {...api.getTriggerProps()}>
        {label}
        <span style={`display:inline-block;transform:rotate(${api.open ? "90deg" : "0"});transition:transform 0.2s;`}>
          ▶
        </span>
      </button>
      <div {...api.getContentProps()}>
        {children}
      </div>
    </div>
  );
}
