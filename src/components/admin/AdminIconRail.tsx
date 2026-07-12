import { useState } from "preact/hooks";
import type { ComponentChildren, FunctionComponent } from "preact";
import { PanelLeftClose, PanelLeft, PanelLeftOpen } from "lucide-preact";

/** レール表示モード */
export type RailMode = "expanded" | "collapsed" | "hover-expand";

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
  /** 初期表示モード（デフォルト: "hover-expand"） */
  mode?: RailMode;
  /** 下部に配置するアイテム（設定、ユーザー等） */
  bottomItems?: IconRailItem[];
  /** ブランドアイコン（レール最上部） */
  brandIcon?: ComponentChildren;
  /** モード切替ボタンを表示（デフォルト: true） */
  showModeToggle?: boolean;
}

const MODE_CYCLE: RailMode[] = ["expanded", "collapsed", "hover-expand"];
const MODE_LABELS: Record<RailMode, string> = {
  expanded: "展開",
  collapsed: "折りたたみ",
  "hover-expand": "ホバーで展開",
};

/**
 * Supabase 式アイコンレール（グローバルナビゲーション）。
 * 3 つの表示モード: expanded / collapsed / hover-expand（デフォルト）
 * 最下部のトグルボタンでモード切替可能。
 */
export function AdminIconRail({
  items,
  mode: initialMode = "hover-expand",
  bottomItems,
  brandIcon,
  showModeToggle = true,
}: AdminIconRailProps) {
  const [mode, setMode] = useState<RailMode>(initialMode);

  const cycleMode = () => {
    const idx = MODE_CYCLE.indexOf(mode);
    setMode(MODE_CYCLE[(idx + 1) % MODE_CYCLE.length]);
  };

  const modeClass = mode === "expanded"
    ? " sc-admin-rail--expanded"
    : mode === "hover-expand"
    ? " sc-admin-rail--hover-expand"
    : "";

  const ModeIcon = mode === "expanded"
    ? PanelLeftClose
    : mode === "collapsed"
    ? PanelLeft
    : PanelLeftOpen;

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

      {showModeToggle && (
        <div class="sc-admin-rail__toggle">
          <button
            class="sc-admin-rail__toggle-btn"
            onClick={cycleMode}
            type="button"
            title={`サイドバー: ${MODE_LABELS[mode]}`}
          >
            <span class="sc-admin-rail__icon">
              <ModeIcon size={18} />
            </span>
            <span class="sc-admin-rail__label">{MODE_LABELS[mode]}</span>
          </button>
        </div>
      )}
    </nav>
  );
}
