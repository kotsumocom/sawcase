import { useId } from "preact/hooks";
import * as tabs from "@zag-js/tabs";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

/** タブ項目 */
export interface TabItem {
  /** タブの値（一意の識別子） */
  value: string;
  /** タブのラベル */
  label: string;
  /** タブのコンテンツ */
  content: ComponentChildren;
  /** 無効化 */
  disabled?: boolean;
}

/** Tabs の props */
export interface TabsProps {
  /** タブ項目 */
  items: TabItem[];
  /** デフォルトで選択されるタブの value */
  defaultValue?: string;
}

/** Zag.js ベースのタブコンポーネント */
export function Tabs({ items, defaultValue }: TabsProps) {
  const service = useMachine(tabs.machine, {
    id: useId(),
    value: defaultValue ?? items[0]?.value,
  });
  const api = tabs.connect(service, normalizeProps);

  return (
    <div {...api.getRootProps()} class="sc-tabs">
      <div {...api.getListProps()} class="sc-tabs-list">
        {items.map((item) => (
          <button
            {...api.getTriggerProps({ value: item.value })}
            key={item.value}
            class="sc-tabs-trigger"
            disabled={item.disabled}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          {...api.getContentProps({ value: item.value })}
          key={item.value}
          class="sc-tabs-content"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
