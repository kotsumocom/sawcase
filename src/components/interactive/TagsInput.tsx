import { useId } from "preact/hooks";
import * as tagsInput from "@zag-js/tags-input";
import { useMachine, normalizeProps } from "@zag-js/preact";

/** TagsInput の props */
export interface TagsInputProps {
  /** ラベル */
  label?: string;
  /** プレースホルダー */
  placeholder?: string;
  /** 値 */
  value?: string[];
  /** 変更コールバック */
  onValueChange?: (values: string[]) => void;
  /** 最大タグ数 */
  max?: number;
  /** 無効状態 */
  disabled?: boolean;
}

/** タグ入力コンポーネント */
export function TagsInput({
  label,
  placeholder = "タグを追加...",
  value,
  onValueChange,
  max,
  disabled,
}: TagsInputProps) {
  const service = useMachine(tagsInput.machine, {
    id: useId(),
    value,
    max,
    disabled,
    onValueChange: (d: { value: string[] }) => onValueChange?.(d.value),
  });
  const api = tagsInput.connect(service, normalizeProps);

  return (
    <div {...api.getRootProps()}>
      {label && <label {...api.getLabelProps()}>{label}</label>}
      <div {...api.getControlProps()}>
        {api.value.map((v: string, i: number) => {
          const itemState = { index: i, value: v };
          return (
            <span key={`${v}-${i}`} {...api.getItemProps(itemState)}>
              <span {...api.getItemTextProps(itemState)}>{v}</span>
              <button {...api.getItemDeleteTriggerProps(itemState)}>✕</button>
              <input {...api.getItemInputProps(itemState)} />
            </span>
          );
        })}
        <input {...api.getInputProps()} placeholder={placeholder} />
      </div>
      <input {...api.getHiddenInputProps()} />
    </div>
  );
}
