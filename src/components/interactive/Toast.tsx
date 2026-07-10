import { useId } from "preact/hooks";
import * as toast from "@zag-js/toast";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";
import { X, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-preact";

/** Toast の種類 */
export type ToastType = "success" | "error" | "info" | "warning";

/** Toast 項目 */
export interface ToastItem {
  /** タイトル */
  title: string;
  /** 説明 */
  description?: string;
  /** 種類 */
  type?: ToastType;
}

/** Toast の props */
export interface ToastProps {
  /** Toast 項目のリスト */
  toasts: ToastItem[];
}

const ICONS: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

/** Toast 通知コンポーネント */
export function Toast({ toasts }: ToastProps) {
  return (
    <div class="sc-toast-container">
      {toasts.map((item, i) => {
        const Icon = ICONS[item.type ?? "info"];
        return (
          <div
            key={i}
            class={`sc-toast sc-toast--${item.type ?? "info"}`}
          >
            <div class="sc-toast__icon">
              <Icon size={20} />
            </div>
            <div class="sc-toast__content">
              <div class="sc-toast__title">{item.title}</div>
              {item.description && (
                <div class="sc-toast__description">{item.description}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
