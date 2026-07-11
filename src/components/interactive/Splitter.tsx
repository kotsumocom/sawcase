import { useId } from "preact/hooks";
import * as splitter from "@zag-js/splitter";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

export interface SplitterPanel {
  id: string;
  content: ComponentChildren;
  min?: number;
  max?: number;
}

export interface SplitterProps {
  panels: SplitterPanel[];
  orientation?: "horizontal" | "vertical";
}

export function Splitter({ panels, orientation = "horizontal" }: SplitterProps) {
  const service = useMachine(splitter.machine, {
    id: useId(),
    orientation,
    // deno-lint-ignore no-explicit-any
    size: panels.map((p) => ({ id: p.id, size: 100 / panels.length, ...(p.min != null && { minSize: p.min }), ...(p.max != null && { maxSize: p.max }) })) as any,
  });
  const api = splitter.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      {panels.map((panel, i) => (
        <div key={panel.id}>
          <div {...api.getPanelProps({ id: panel.id })}>{panel.content}</div>
          {i < panels.length - 1 && (
            <div {...api.getResizeTriggerProps({ id: `${panel.id}:${panels[i + 1].id}` })} />
          )}
        </div>
      ))}
    </div>
  );
}
