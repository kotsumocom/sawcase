import { useId } from "preact/hooks";
import * as steps from "@zag-js/steps";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

/** Steps のアイテム */
export interface StepItem {
  /** ステップタイトル */
  title: string;
  /** ステップの内容 */
  content: ComponentChildren;
  /** 説明（省略可） */
  description?: string;
}

/** Steps の props */
export interface StepsProps {
  /** ステップ一覧 */
  items: StepItem[];
  /** 現在のステップ（0 始まり） */
  step?: number;
  /** ステップ変更コールバック */
  onStepChange?: (step: number) => void;
  /** 方向 */
  orientation?: "horizontal" | "vertical";
}

/** ステップウィザードコンポーネント */
export function Steps({
  items,
  step,
  onStepChange,
  orientation = "horizontal",
}: StepsProps) {
  const service = useMachine(steps.machine, {
    id: useId(),
    count: items.length,
    step,
    orientation,
    onStepChange: (d: { step: number }) => onStepChange?.(d.step),
  });
  const api = steps.connect(service, normalizeProps);

  return (
    <div {...api.getRootProps()}>
      <div {...api.getListProps()}>
        {items.map((item, i) => (
          <div key={i} {...api.getItemProps({ index: i })}>
            <button {...api.getTriggerProps({ index: i })}>
              <span {...api.getIndicatorProps({ index: i })}>{i + 1}</span>
              <span>{item.title}</span>
            </button>
            <div {...api.getSeparatorProps({ index: i })} />
          </div>
        ))}
      </div>
      {items.map((item, i) => (
        <div key={i} {...api.getContentProps({ index: i })}>
          {item.content}
        </div>
      ))}
      <div style="display:flex;gap:8px;margin-top:16px;">
        {api.hasPrevStep && (
          <button {...api.getPrevTriggerProps()}>前へ</button>
        )}
        {api.hasNextStep && (
          <button {...api.getNextTriggerProps()}>次へ</button>
        )}
      </div>
    </div>
  );
}
