import { useId } from "preact/hooks";
import * as slider from "@zag-js/slider";
import { useMachine, normalizeProps } from "@zag-js/preact";

/** Slider の props */
export interface SliderProps {
  /** ラベル */
  label?: string;
  /** 最小値 */
  min?: number;
  /** 最大値 */
  max?: number;
  /** ステップ */
  step?: number;
  /** 値 */
  value?: number[];
  /** 変更コールバック */
  onValueChange?: (values: number[]) => void;
  /** 無効状態 */
  disabled?: boolean;
}

/** スライダーコンポーネント */
export function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  onValueChange,
  disabled,
}: SliderProps) {
  const service = useMachine(slider.machine, {
    id: useId(),
    min,
    max,
    step,
    value,
    disabled,
    onValueChange: (d: { value: number[] }) => onValueChange?.(d.value),
  });
  const api = slider.connect(service, normalizeProps);

  return (
    <div {...api.getRootProps()}>
      {label && (
        <div style="display:flex;justify-content:space-between;">
          <label {...api.getLabelProps()}>{label}</label>
          <output {...api.getValueTextProps()}>{api.value.join(", ")}</output>
        </div>
      )}
      <div {...api.getControlProps()}>
        <div {...api.getTrackProps()}>
          <div {...api.getRangeProps()} />
        </div>
        {api.value.map((_v: number, i: number) => (
          <div key={i} {...api.getThumbProps({ index: i })}>
            <input {...api.getHiddenInputProps({ index: i })} />
          </div>
        ))}
      </div>
    </div>
  );
}
