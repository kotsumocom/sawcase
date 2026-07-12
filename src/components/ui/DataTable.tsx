import type { ComponentChildren } from "preact";

// deno-lint-ignore no-explicit-any
/** テーブルカラム定義 */
export interface DataTableColumn<T = any> {
  /** データキー */
  key: string;
  /** ヘッダーラベル */
  label: string;
  /** ソート可能 */
  sortable?: boolean;
  /** カスタムレンダラー */
  render?: (value: unknown, row: T, index: number) => ComponentChildren;
  /** テキスト位置（デフォルト: "left"） */
  align?: "left" | "center" | "right";
  /** 幅（CSS値） */
  width?: string;
}

// deno-lint-ignore no-explicit-any
export interface DataTableProps<T = any> {
  /** カラム定義 */
  columns: DataTableColumn<T>[];
  /** データ配列 */
  data: T[];
  /** 行選択可能 */
  selectable?: boolean;
  /** 行クリック */
  onRowClick?: (row: T, index: number) => void;
  /** データなし時のメッセージ */
  emptyMessage?: string;
  /** 行のキー取得（デフォルト: index） */
  rowKey?: (row: T, index: number) => string;
}

/**
 * データテーブル。WAI-ARIA role="grid" 準拠。
 *
 * ```tsx
 * <DataTable
 *   columns={[
 *     { key: "name", label: "名前", sortable: true },
 *     { key: "role", label: "ロール", render: (v) => <StatusBadge>{v}</StatusBadge> },
 *   ]}
 *   data={users}
 *   selectable
 *   onRowClick={(row) => console.log(row)}
 * />
 * ```
 */
// deno-lint-ignore no-explicit-any
export function DataTable<T = any>({
  columns,
  data,
  selectable,
  onRowClick,
  emptyMessage = "データがありません",
  rowKey,
}: DataTableProps<T>) {
  return (
    <div class="sc-data-table-wrap">
      <table class="sc-data-table" role="grid">
        <thead>
          <tr class="sc-data-table__header-row">
            {selectable && (
              <th class="sc-data-table__th sc-data-table__th--checkbox" scope="col">
                <input
                  type="checkbox"
                  class="sc-data-table__checkbox"
                  aria-label="すべて選択"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                class={`sc-data-table__th${col.align === "right" ? " sc-data-table__th--right" : col.align === "center" ? " sc-data-table__th--center" : ""}`}
                style={col.width ? { width: col.width } : undefined}
                scope="col"
                aria-sort={col.sortable ? "none" : undefined}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                class="sc-data-table__empty"
                colSpan={columns.length + (selectable ? 1 : 0)}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={rowKey ? rowKey(row, i) : i}
                class={`sc-data-table__row${onRowClick ? " sc-data-table__row--clickable" : ""}`}
                onClick={onRowClick ? () => onRowClick(row, i) : undefined}
              >
                {selectable && (
                  <td class="sc-data-table__td sc-data-table__td--checkbox">
                    <input
                      type="checkbox"
                      class="sc-data-table__checkbox"
                      aria-label="行を選択"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    class={`sc-data-table__td${col.align === "right" ? " sc-data-table__td--right" : col.align === "center" ? " sc-data-table__td--center" : ""}`}
                  >
                    {col.render
                      ? col.render((row as Record<string, unknown>)[col.key], row, i)
                      : ((row as Record<string, unknown>)[col.key] as ComponentChildren)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
