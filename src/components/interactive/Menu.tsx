import { useId } from "preact/hooks";
import * as menu from "@zag-js/menu";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

/** メニュー項目 */
export interface MenuItem {
  /** 項目の値 */
  value: string;
  /** 表示ラベル */
  label: string;
  /** 無効化 */
  disabled?: boolean;
}

/** Menu の props */
export interface MenuProps {
  /** トリガー要素 */
  trigger: ComponentChildren;
  /** メニュー項目 */
  items: MenuItem[];
  /** 項目クリック時のコールバック */
  onSelect?: (value: string) => void;
}

/** Zag.js ベースのドロップダウンメニュー */
export function Menu({ trigger, items, onSelect }: MenuProps) {
  const service = useMachine(menu.machine, {
    id: useId(),
    onSelect(details) {
      onSelect?.(details.value);
    },
  });
  const api = menu.connect(service, normalizeProps);

  return (
    <>
      <button {...api.getTriggerProps()} class="sc-menu-trigger">
        {trigger}
      </button>

      <div {...api.getPositionerProps()}>
        <ul {...api.getContentProps()} class="sc-menu-content">
          {items.map((item) => (
            <li
              {...api.getItemProps({ value: item.value })}
              key={item.value}
              class="sc-menu-item"
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
