import { useId } from "preact/hooks";
import * as numberInput from "@zag-js/number-input";
import { useMachine, normalizeProps } from "@zag-js/preact";

/** NumberInput の props */
export interface NumberInputProps {
  /** ラベル */
  label?: string;
  /** 最小値 */
  min?: number;
  /** 最大値 */
  max?: number;
  /** ステップ */
  step?: number;
  /** 値 */
  value?: string;
  /** 変更コールバック */
  onValueChange?: (value: number, valueAsString: string) => void;
  /** 無効状態 */
  disabled?: boolean;
}

/** 数値入力コンポーネント */
export function NumberInput({
  label,
  min,
  max,
  step = 1,
  value,
  onValueChange,
  disabled,
}: NumberInputProps) {
  const service = useMachine(numberInput.machine, {
    id: useId(),
    min,
    max,
    step,
    value,
    disabled,
    onValueChange: (d: { value: string; valueAsString?: string }) =>
      onValueChange?.(parseFloat(d.value) || 0, d.valueAsString ?? d.value),
  });
  const api = numberInput.connect(service, normalizeProps);

  return (
    <div {...api.getRootProps()}>
      {label && <label {...api.getLabelProps()}>{label}</label>}
      <div style="display:flex;">
        <button {...api.getDecrementTriggerProps()}>−</button>
        <input {...api.getInputProps()} />
        <button {...api.getIncrementTriggerProps()}>+</button>
      </div>
    </div>
  );
}
