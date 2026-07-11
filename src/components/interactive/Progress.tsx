import { useId } from "preact/hooks";
import * as progress from "@zag-js/progress";
import { useMachine, normalizeProps } from "@zag-js/preact";

export interface ProgressProps {
  value?: number;
  max?: number;
  label?: string;
}

export function Progress({ value = 0, max = 100, label }: ProgressProps) {
  const service = useMachine(progress.machine, {
    id: useId(),
    value,
    max,
  });
  const api = progress.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      {label && (
        <div style="display:flex;justify-content:space-between;">
          <label {...api.getLabelProps()}>{label}</label>
          <span {...api.getValueTextProps()}>{api.percentAsString}</span>
        </div>
      )}
      <div {...api.getTrackProps()}>
        <div {...api.getRangeProps()} />
      </div>
    </div>
  );
}
