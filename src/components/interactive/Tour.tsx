import { useId } from "preact/hooks";
import * as tour from "@zag-js/tour";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

export interface TourStep {
  id: string;
  target?: () => HTMLElement | null;
  title: ComponentChildren;
  description: ComponentChildren;
  placement?: "top" | "bottom" | "left" | "right";
}

export interface TourProps {
  steps: TourStep[];
}

export function Tour({ steps }: TourProps) {
  const service = useMachine(tour.machine, {
    id: useId(),
    steps: steps.map((s) => ({
      id: s.id,
      target: s.target,
      title: s.title,
      description: s.description,
      placement: s.placement || "bottom",
    })),
  });
  // deno-lint-ignore no-explicit-any
  const api = tour.connect(service, normalizeProps) as any;
  const step = api.step;

  return (
    <div>
      {api.open && step && (
        <div {...api.getPositionerProps()}>
          <div {...api.getContentProps()}>
            <div {...api.getArrowProps()}><div {...api.getArrowTipProps()} /></div>
            <div {...api.getTitleProps()}>{step.title}</div>
            <div {...api.getDescriptionProps()}>{step.description}</div>
            <div style="display:flex;gap:8px;margin-top:12px;">
              {!api.firstStep && (
                <button onClick={() => api.setStep(api.stepIndex - 1)}>前へ</button>
              )}
              {!api.lastStep ? (
                <button onClick={() => api.setStep(api.stepIndex + 1)}>次へ</button>
              ) : (
                <button {...api.getCloseTriggerProps()}>完了</button>
              )}
            </div>
            <div>
              {api.stepIndex + 1} / {steps.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
