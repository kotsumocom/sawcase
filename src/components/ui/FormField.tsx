import type { ComponentChildren } from "preact";

/** FormField の props */
export interface FormFieldProps {
  /** ラベル */
  label: string;
  /** フィールド内容（input, select 等） */
  children: ComponentChildren;
  /** エラーメッセージ */
  error?: string;
  /** ヘルプテキスト */
  help?: string;
  /** 必須マーク */
  required?: boolean;
  /** htmlFor */
  htmlFor?: string;
}

/** フォームフィールドラッパーコンポーネント */
export function FormField({
  label,
  children,
  error,
  help,
  required,
  htmlFor,
}: FormFieldProps) {
  return (
    <div class="sc-ui-field">
      <label class="sc-ui-field__label" for={htmlFor}>
        {label}
        {required && <span style="color:var(--sc-sys-color-error);margin-left:2px;">*</span>}
      </label>
      {children}
      {error && (
        <div style="font-size:0.75rem;color:var(--sc-sys-color-error);margin-top:4px;">
          {error}
        </div>
      )}
      {!error && help && (
        <div style="font-size:0.75rem;color:var(--sc-sys-color-on-surface-variant);margin-top:4px;">
          {help}
        </div>
      )}
    </div>
  );
}
