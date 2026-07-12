import type { ComponentChildren } from "preact";

export interface InputGroupProps {
  /** 前置テキスト */
  prefix?: string;
  /** 後置テキスト */
  suffix?: string;
  /** 子要素（input） */
  children: ComponentChildren;
}

/**
 * インプットグループ。prefix/suffix 付きインプット。
 *
 * ```tsx
 * <InputGroup suffix=".sawcase.app">
 *   <input class="sc-ui-input" value="kotsumo" />
 * </InputGroup>
 * ```
 */
export function InputGroup({ prefix, suffix, children }: InputGroupProps) {
  return (
    <div class="sc-input-group">
      {prefix && <span class="sc-input-group__prefix">{prefix}</span>}
      {children}
      {suffix && <span class="sc-input-group__suffix">{suffix}</span>}
    </div>
  );
}
