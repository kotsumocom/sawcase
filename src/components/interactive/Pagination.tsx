import { useId } from "preact/hooks";
import * as pagination from "@zag-js/pagination";
import { useMachine, normalizeProps } from "@zag-js/preact";

/** Pagination の props */
export interface PaginationProps {
  /** 総アイテム数 */
  count: number;
  /** 1 ページあたりのアイテム数 */
  pageSize?: number;
  /** 現在のページ（1 始まり） */
  page?: number;
  /** ページ変更コールバック */
  onPageChange?: (page: number) => void;
  /** 表示するページ数 */
  siblingCount?: number;
}

/** ページネーションコンポーネント */
export function Pagination({
  count,
  pageSize = 10,
  page,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  const service = useMachine(pagination.machine, {
    id: useId(),
    count,
    pageSize,
    page,
    siblingCount,
    onPageChange: (d: { page: number }) => onPageChange?.(d.page),
  });
  const api = pagination.connect(service, normalizeProps);

  return (
    <nav {...api.getRootProps()}>
      <button {...api.getPrevTriggerProps()}>← 前へ</button>
      {api.pages.map((page, i) => {
        if (page.type === "page") {
          return (
            <button key={i} {...api.getItemProps({ type: "page", value: page.value })}>
              {page.value}
            </button>
          );
        }
        return <span key={i} {...api.getEllipsisProps({ index: i })}>…</span>;
      })}
      <button {...api.getNextTriggerProps()}>次へ →</button>
    </nav>
  );
}
