import { useId } from "preact/hooks";
import * as qrCode from "@zag-js/qr-code";
import { useMachine, normalizeProps } from "@zag-js/preact";

export interface QrCodeProps {
  value: string;
}

export function QrCode({ value }: QrCodeProps) {
  const service = useMachine(qrCode.machine, { id: useId(), value });
  const api = qrCode.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      <svg {...api.getFrameProps()}>
        <path {...api.getPatternProps()} />
      </svg>
    </div>
  );
}
