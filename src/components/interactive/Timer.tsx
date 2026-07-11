import { useId } from "preact/hooks";
import * as timer from "@zag-js/timer";
import { useMachine, normalizeProps } from "@zag-js/preact";

export interface TimerProps {
  countdown?: boolean;
  startMs?: number;
  targetMs?: number;
  autoStart?: boolean;
  onComplete?: () => void;
}

export function Timer({ countdown, startMs, targetMs, autoStart, onComplete }: TimerProps) {
  const service = useMachine(timer.machine, {
    id: useId(),
    countdown,
    startMs,
    targetMs,
    autoStart,
    onComplete,
  });
  const api = timer.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      <div {...api.getAreaProps()}>
        <span {...api.getItemProps({ type: "hours" })}>{api.formattedTime.hours}</span>:
        <span {...api.getItemProps({ type: "minutes" })}>{api.formattedTime.minutes}</span>:
        <span {...api.getItemProps({ type: "seconds" })}>{api.formattedTime.seconds}</span>
      </div>
      <div>
        <button {...api.getActionTriggerProps({ action: "start" })}>開始</button>
        <button {...api.getActionTriggerProps({ action: "pause" })}>一時停止</button>
        <button {...api.getActionTriggerProps({ action: "resume" })}>再開</button>
        <button {...api.getActionTriggerProps({ action: "reset" })}>リセット</button>
      </div>
    </div>
  );
}
