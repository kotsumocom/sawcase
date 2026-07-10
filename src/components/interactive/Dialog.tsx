import { useId } from "preact/hooks";
import * as dialog from "@zag-js/dialog";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";
import { X } from "lucide-preact";

/** Dialog の props */
export interface DialogProps {
  /** ダイアログタイトル */
  title: string;
  /** ダイアログの説明 */
  description?: string;
  /** トリガーボタンの内容 */
  trigger: ComponentChildren;
  /** ダイアログ本文 */
  children: ComponentChildren;
  /** フッターアクション */
  footer?: ComponentChildren;
  /** 閉じるボタンを表示するか（デフォルト: true） */
  closable?: boolean;
}

/** Zag.js ベースのモーダルダイアログ */
export function Dialog(props: DialogProps) {
  const { title, description, trigger, children, footer, closable = true } = props;

  const service = useMachine(dialog.machine, {
    id: useId(),
  });
  const api = dialog.connect(service, normalizeProps);

  return (
    <>
      <span {...api.getTriggerProps()}>{trigger}</span>

      {api.open && (
        <div {...api.getBackdropProps()} class="sc-dialog-backdrop" />
      )}

      {api.open && (
        <div {...api.getPositionerProps()} class="sc-dialog-positioner">
          <div {...api.getContentProps()} class="sc-dialog-content">
            <div class="sc-dialog-header">
              <h2 {...api.getTitleProps()} class="sc-dialog-title">
                {title}
              </h2>
              {closable && (
                <button {...api.getCloseTriggerProps()} class="sc-dialog-close">
                  <X size={20} />
                </button>
              )}
            </div>

            {description && (
              <p {...api.getDescriptionProps()} class="sc-dialog-description">
                {description}
              </p>
            )}

            <div class="sc-dialog-body">{children}</div>

            {footer && (
              <div class="sc-dialog-footer">{footer}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
