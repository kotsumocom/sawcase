import { useId } from "preact/hooks";
import * as datePicker from "@zag-js/date-picker";
import { useMachine, normalizeProps } from "@zag-js/preact";

/** DatePicker の props */
export interface DatePickerProps {
  /** ラベル */
  label?: string;
  /** プレースホルダー */
  placeholder?: string;
  /** 無効状態 */
  disabled?: boolean;
  /** 変更コールバック */
  onValueChange?: (value: string[]) => void;
}

/** 日付選択コンポーネント */
export function DatePicker({
  label,
  placeholder = "日付を選択",
  disabled,
  onValueChange,
}: DatePickerProps) {
  const service = useMachine(datePicker.machine, {
    id: useId(),
    disabled,
    locale: "ja-JP",
    onValueChange: (d: { valueAsString: string[] }) => onValueChange?.(d.valueAsString),
  });
  const api = datePicker.connect(service, normalizeProps);

  return (
    <div {...api.getRootProps()}>
      {label && <label {...api.getLabelProps()}>{label}</label>}
      <div {...api.getControlProps()}>
        <input {...api.getInputProps()} placeholder={placeholder} />
        <button {...api.getTriggerProps()}>📅</button>
      </div>
      <div {...api.getPositionerProps()}>
        <div {...api.getContentProps()}>
          {/* ヘッダー（月ナビ） */}
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <button {...api.getPrevTriggerProps()}>◀</button>
            <button {...api.getViewTriggerProps()}>
              {api.visibleRangeText.start}
            </button>
            <button {...api.getNextTriggerProps()}>▶</button>
          </div>

          {/* 日付グリッド */}
          {api.view === "day" && (
            <table {...api.getTableProps({ view: "day" })}>
              <thead {...api.getTableHeaderProps({ view: "day" })}>
                <tr {...api.getTableRowProps({ view: "day" })}>
                  {api.weekDays.map((day, i) => (
                    <th key={i} scope="col" aria-label={day.long}>
                      {day.narrow}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody {...api.getTableBodyProps({ view: "day" })}>
                {api.weeks.map((week, i) => (
                  <tr key={i} {...api.getTableRowProps({ view: "day" })}>
                    {week.map((value, j) => (
                      <td key={j} {...api.getDayTableCellProps({ value })}>
                        <div {...api.getDayTableCellTriggerProps({ value })}>
                          {value.day}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
