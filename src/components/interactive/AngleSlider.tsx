import { useId } from "preact/hooks";
import * as angleSlider from "@zag-js/angle-slider";
import { useMachine, normalizeProps } from "@zag-js/preact";

export interface AngleSliderProps {
  label?: string;
  value?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
}

export function AngleSlider({ label, value, onValueChange, disabled }: AngleSliderProps) {
  const service = useMachine(angleSlider.machine, {
    id: useId(),
    value,
    disabled,
    onValueChange: (d: { value: number }) => onValueChange?.(d.value),
  });
  const api = angleSlider.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      {label && <label {...api.getLabelProps()}>{label}</label>}
      <div {...api.getControlProps()}>
        <div {...api.getThumbProps()} />
        <div {...api.getMarkerGroupProps()}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((v) => (
            <div key={v} {...api.getMarkerProps({ value: v })} />
          ))}
        </div>
      </div>
      <div {...api.getValueTextProps()}>{api.value}°</div>
      <input {...api.getHiddenInputProps()} />
    </div>
  );
}
