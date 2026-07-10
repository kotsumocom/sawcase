import { useId } from "preact/hooks";
import * as accordion from "@zag-js/accordion";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";
import { ChevronDown } from "lucide-preact";

/** アコーディオン項目 */
export interface AccordionItem {
  /** 項目の値（一意の識別子） */
  value: string;
  /** ヘッダーラベル */
  label: string;
  /** コンテンツ */
  content: ComponentChildren;
  /** 無効化 */
  disabled?: boolean;
}

/** Accordion の props */
export interface AccordionProps {
  /** アコーディオン項目 */
  items: AccordionItem[];
  /** 複数同時展開を許可するか */
  multiple?: boolean;
  /** デフォルトで展開する項目の value */
  defaultValue?: string[];
}

/** Zag.js ベースのアコーディオンコンポーネント */
export function Accordion({ items, multiple = false, defaultValue }: AccordionProps) {
  const service = useMachine(accordion.machine, {
    id: useId(),
    multiple,
    value: defaultValue,
  });
  const api = accordion.connect(service, normalizeProps);

  return (
    <div {...api.getRootProps()} class="sc-accordion">
      {items.map((item) => {
        const itemProps = { value: item.value, disabled: item.disabled };
        return (
          <div {...api.getItemProps(itemProps)} key={item.value} class="sc-accordion-item">
            <h3>
              <button
                {...api.getItemTriggerProps(itemProps)}
                class="sc-accordion-trigger"
              >
                <span>{item.label}</span>
                <span {...api.getItemIndicatorProps(itemProps)} class="sc-accordion-indicator">
                  <ChevronDown size={16} />
                </span>
              </button>
            </h3>
            <div {...api.getItemContentProps(itemProps)} class="sc-accordion-content">
              <div class="sc-accordion-content__inner">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
