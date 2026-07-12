import type { ComponentChildren, FunctionComponent } from "preact";

/** アイコンレールのアイテム */
export interface IconRailItem {
  /** Lucide アイコン */
  icon: FunctionComponent<{ size?: number | string }>;
  /** ラベル */
  label: string;
  /** セクション識別子 */
  value: string;
  /** リンク先 */
  href?: string;
  /** アクティブ状態 */
  active?: boolean;
}

/** AdminIconRail の props */
export interface AdminIconRailProps {
  /** メインアイテム */
  items: IconRailItem[];
  /** 表示モード（デフォルト: "hover-expand"） */
  mode?: "expanded" | "collapsed" | "hover-expand";
  /** 下部に配置するアイテム（設定、ユーザー等） */
  bottomItems?: IconRailItem[];
  /** ブランドアイコン（レール最上部） */
  brandIcon?: ComponentChildren;
}

/**
 * Supabase 式アイコンレール（グローバルナビゲーション）。
 * 3 つの表示モード: expanded / collapsed / hover-expand（デフォルト）
 */
export function AdminIconRail({
  items,
  mode = "hover-expand",
  bottomItems,
  brandIcon,
}: AdminIconRailProps) {
  const modeClass = mode === "expanded"
    ? " sc-admin-rail--expanded"
    : mode === "hover-expand"
    ? " sc-admin-rail--hover-expand"
    : "";

  return (
    <nav class={`sc-admin-rail${modeClass}`}>
      {brandIcon && (
        <div class="sc-admin-rail__brand">{brandIcon}</div>
      )}

      <div class="sc-admin-rail__items">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.value}
              href={item.href || "#"}
              class={`sc-admin-rail__link${item.active ? " sc-admin-rail__link--active" : ""}`}
              title={item.label}
            >
              <span class="sc-admin-rail__icon">
                <Icon size={20} />
              </span>
              <span class="sc-admin-rail__label">{item.label}</span>
            </a>
          );
        })}
      </div>

      {bottomItems && bottomItems.length > 0 && (
        <div class="sc-admin-rail__bottom">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.value}
                href={item.href || "#"}
                class={`sc-admin-rail__link${item.active ? " sc-admin-rail__link--active" : ""}`}
                title={item.label}
              >
                <span class="sc-admin-rail__icon">
                  <Icon size={20} />
                </span>
                <span class="sc-admin-rail__label">{item.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
