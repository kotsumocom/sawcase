import { useId } from "preact/hooks";
import * as colorPicker from "@zag-js/color-picker";
import { useMachine, normalizeProps } from "@zag-js/preact";

export interface ColorPickerProps {
  label?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function ColorPicker({ label, value, onValueChange }: ColorPickerProps) {
  const service = useMachine(colorPicker.machine, {
    id: useId(),
    value: value ? colorPicker.parse(value) : undefined,
    onValueChange: (d: { valueAsString: string }) => onValueChange?.(d.valueAsString),
  });
  const api = colorPicker.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      {label && <label {...api.getLabelProps()}>{label}</label>}
      <div {...api.getControlProps()}>
        <button {...api.getTriggerProps()}>
          <div {...api.getSwatchTriggerProps({ value: api.value }) as Record<string, unknown>}>
            <div {...api.getSwatchProps({ value: api.value })} />
          </div>
        </button>
        <input {...api.getChannelInputProps({ channel: "hex" })} />
      </div>
      <div {...api.getPositionerProps()}>
        <div {...api.getContentProps()}>
          <div {...api.getAreaProps()}>
            <div {...api.getAreaBackgroundProps()} />
            <div {...api.getAreaThumbProps()} />
          </div>
          <div {...api.getChannelSliderProps({ channel: "hue" })}>
            <div {...api.getChannelSliderTrackProps({ channel: "hue" })} />
            <div {...api.getChannelSliderThumbProps({ channel: "hue" })} />
          </div>
          <div {...api.getChannelSliderProps({ channel: "alpha" })}>
            <div {...api.getChannelSliderTrackProps({ channel: "alpha" })}>
              <div {...api.getTransparencyGridProps({ size: "8px" })} />
            </div>
            <div {...api.getChannelSliderThumbProps({ channel: "alpha" })} />
          </div>
        </div>
      </div>
      <input {...api.getHiddenInputProps()} />
    </div>
  );
}
