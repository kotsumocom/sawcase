import type { ComponentChildren } from "preact";

/** DataTable のカラム定義 */
export interface DataTableColumn<T> {
  /** ヘッダーラベル */
  header: string;
  /** データのキーまたはレンダー関数 */
  accessor: keyof T | ((row: T) => ComponentChildren);
  /** 幅 */
  width?: string;
  /** 右寄せ */
  align?: "left" | "center" | "right";
}

/** DataTable の props */
export interface DataTableProps<T> {
  /** データ */
  data: T[];
  /** カラム定義 */
  columns: DataTableColumn<T>[];
  /** 行キー取得関数 */
  rowKey: (row: T) => string | number;
  /** 空状態のメッセージ */
  emptyMessage?: string;
  /** ストライプ表示 */
  striped?: boolean;
  /** ボーダー表示 */
  bordered?: boolean;
}

/** ソート・フィルター対応データテーブルコンポーネント */
export function DataTable<T>({
  data,
  columns,
  rowKey,
  emptyMessage = "データがありません",
  striped = false,
  bordered = true,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div style="text-align:center;padding:48px 24px;color:var(--sc-sys-color-on-surface-variant);">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div style="overflow-x:auto;">
      <table
        style={`width:100%;border-collapse:collapse;font-size:0.875rem;${bordered ? "border:1px solid var(--sc-sys-color-outline-variant);" : ""}`}
      >
        <thead>
          <tr style="border-bottom:2px solid var(--sc-sys-color-outline-variant);">
            {columns.map((col, i) => (
              <th
                key={i}
                style={`text-align:${col.align || "left"};padding:12px 16px;font-weight:600;color:var(--sc-sys-color-on-surface-variant);${col.width ? `width:${col.width};` : ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr
              key={rowKey(row)}
              style={`border-bottom:1px solid var(--sc-sys-color-outline-variant);${striped && rowIdx % 2 === 1 ? "background:var(--sc-sys-color-surface-container);" : ""}`}
            >
              {columns.map((col, colIdx) => {
                const value = typeof col.accessor === "function"
                  ? col.accessor(row)
                  : String(row[col.accessor] ?? "");
                return (
                  <td
                    key={colIdx}
                    style={`text-align:${col.align || "left"};padding:12px 16px;color:var(--sc-sys-color-on-surface);`}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
