import { useId } from "preact/hooks";
import * as fileUpload from "@zag-js/file-upload";
import { useMachine, normalizeProps } from "@zag-js/preact";

/** FileUpload の props */
export interface FileUploadProps {
  /** ラベル */
  label?: string;
  /** 受け入れるファイル種別 */
  accept?: string | Record<string, string[]>;
  /** 最大ファイル数 */
  maxFiles?: number;
  /** 最大ファイルサイズ（bytes） */
  maxFileSize?: number;
  /** 変更コールバック */
  onFileChange?: (files: File[]) => void;
  /** 無効状態 */
  disabled?: boolean;
}

/** ファイルアップロードコンポーネント */
export function FileUpload({
  label,
  accept,
  maxFiles = 1,
  maxFileSize,
  onFileChange,
  disabled,
}: FileUploadProps) {
  const service = useMachine(fileUpload.machine, {
    id: useId(),
    accept: typeof accept === "string" ? { [accept]: [] } : accept,
    maxFiles,
    maxFileSize,
    disabled,
    onFileChange: (d: { acceptedFiles: File[] }) => onFileChange?.(d.acceptedFiles),
  });
  const api = fileUpload.connect(service, normalizeProps);

  return (
    <div {...api.getRootProps()}>
      {label && <label {...api.getLabelProps()}>{label}</label>}
      <div {...api.getDropzoneProps()}>
        <input {...api.getHiddenInputProps()} />
        <span>ファイルをドラッグ＆ドロップ、または</span>
        <button {...api.getTriggerProps()}>ファイルを選択</button>
      </div>
      <ul {...api.getItemGroupProps()}>
        {api.acceptedFiles.map((file: File) => (
          <li key={file.name} {...api.getItemProps({ file })}>
            <span {...api.getItemNameProps({ file })}>{file.name}</span>
            <span {...api.getItemSizeTextProps({ file })}>
              {(file.size / 1024).toFixed(1)} KB
            </span>
            <button {...api.getItemDeleteTriggerProps({ file })}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
