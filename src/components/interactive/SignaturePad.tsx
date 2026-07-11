import { useId } from "preact/hooks";
import * as signaturePad from "@zag-js/signature-pad";
import { useMachine, normalizeProps } from "@zag-js/preact";

export interface SignaturePadProps {
  label?: string;
  onDrawEnd?: (url: string) => void;
  disabled?: boolean;
}

export function SignaturePad({ label, onDrawEnd, disabled }: SignaturePadProps) {
  const service = useMachine(signaturePad.machine, {
    id: useId(),
    disabled,
    // deno-lint-ignore no-explicit-any
    onDrawEnd: (d: any) => {
      d.getDataUrl("image/png").then((url: string) => onDrawEnd?.(url));
    },
  });
  const api = signaturePad.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      {label && <label {...api.getLabelProps()}>{label}</label>}
      <div {...api.getControlProps()}>
        <svg {...api.getSegmentProps()}>
          {api.paths.map((path: string, i: number) => (
            <path key={i} {...api.getSegmentPathProps({ path })} />
          ))}
          {api.currentPath && <path {...api.getSegmentPathProps({ path: api.currentPath })} />}
        </svg>
      </div>
      <button {...api.getClearTriggerProps()}>クリア</button>
    </div>
  );
}
