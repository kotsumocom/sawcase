import { useId } from "preact/hooks";
import * as clipboard from "@zag-js/clipboard";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";
import { Check, Copy } from "lucide-preact";

/** Clipboard の props */
export interface ClipboardProps {
  /** コピーする値 */
  value: string;
  /** コピーボタンのラベル */
  label?: string;
  /** コピー後の表示時間（ms） */
  timeout?: number;
  /** カスタム children（省略時はデフォルトボタン） */
  children?: (api: { copied: boolean; copy: () => void }) => ComponentChildren;
}

/** クリックでクリップボードにコピーするコンポーネント */
export function Clipboard({ value, label = "Copy", timeout = 2000, children }: ClipboardProps) {
  const service = useMachine(clipboard.machine, {
    id: useId(),
    value,
    timeout,
  });
  const api = clipboard.connect(service, normalizeProps);

  if (children) {
    return (
      <div {...api.getRootProps()}>
        <input {...api.getInputProps()} hidden />
        {children({ copied: api.copied, copy: () => api.copy() })}
      </div>
    );
  }

  return (
    <div {...api.getRootProps()} style="display:inline-block;">
      <input {...api.getInputProps()} hidden />
      <button
        {...api.getTriggerProps()}
        class="sc-clipboard-btn"
        data-copied={api.copied ? "true" : undefined}
      >
        {api.copied
          ? <><Check size={14} /> Copied!</>
          : <><Copy size={14} /> {label}</>}
      </button>
    </div>
  );
}
