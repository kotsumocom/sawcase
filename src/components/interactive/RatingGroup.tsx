import { useId } from "preact/hooks";
import * as ratingGroup from "@zag-js/rating-group";
import { useMachine, normalizeProps } from "@zag-js/preact";

export interface RatingGroupProps {
  label?: string;
  count?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  allowHalf?: boolean;
}

export function RatingGroup({ label, count = 5, value, onValueChange, disabled, allowHalf }: RatingGroupProps) {
  const service = useMachine(ratingGroup.machine, {
    id: useId(),
    count,
    value,
    disabled,
    allowHalf,
    onValueChange: (d: { value: number }) => onValueChange?.(d.value),
  });
  const api = ratingGroup.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      {label && <label {...api.getLabelProps()}>{label}</label>}
      <div {...api.getControlProps()}>
        {api.items.map((i: number) => (
          <span key={i} {...api.getItemProps({ index: i })}>★</span>
        ))}
      </div>
      <input {...api.getHiddenInputProps()} />
    </div>
  );
}
