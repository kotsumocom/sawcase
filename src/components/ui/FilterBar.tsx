import type { ComponentChildren } from "preact";

/** フィルター定義 */
export interface FilterDef {
  /** フィルターキー */
  key: string;
  /** ラベル */
  label: string;
  /** 選択肢 */
  options: string[];
}

export interface FilterBarProps {
  /** 検索プレースホルダー */
  searchPlaceholder?: string;
  /** 検索コールバック */
  onSearch?: (query: string) => void;
  /** フィルター定義 */
  filters?: FilterDef[];
  /** フィルター変更コールバック */
  onFilterChange?: (key: string, value: string) => void;
  /** 右側のアクション */
  actions?: ComponentChildren;
}

/**
 * フィルターバー。検索＋セレクトフィルターの組み合わせ。
 *
 * ```tsx
 * <FilterBar
 *   searchPlaceholder="ユーザーを検索..."
 *   filters={[
 *     { key: "role", label: "ロール", options: ["管理者", "メンバー"] },
 *   ]}
 *   actions={<button class="sc-ui-button sc-ui-button--filled">追加</button>}
 * />
 * ```
 */
export function FilterBar({
  searchPlaceholder = "検索...",
  onSearch,
  filters,
  onFilterChange,
  actions,
}: FilterBarProps) {
  return (
    <div class="sc-filter-bar">
      <div class="sc-filter-bar__search">
        <input
          type="search"
          class="sc-ui-input sc-filter-bar__input"
          placeholder={searchPlaceholder}
          onInput={(e) => onSearch?.((e.target as HTMLInputElement).value)}
          aria-label={searchPlaceholder}
        />
      </div>

      {filters && filters.length > 0 && (
        <div class="sc-filter-bar__filters">
          {filters.map((f) => (
            <select
              key={f.key}
              class="sc-ui-input sc-filter-bar__select"
              onChange={(e) => onFilterChange?.(f.key, (e.target as HTMLSelectElement).value)}
              aria-label={f.label}
            >
              <option value="">{f.label}</option>
              {f.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ))}
        </div>
      )}

      {actions && (
        <div class="sc-filter-bar__actions">{actions}</div>
      )}
    </div>
  );
}
