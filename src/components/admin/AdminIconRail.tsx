import { useState, useRef, useEffect } from "preact/hooks";
import type { ComponentChildren, FunctionComponent } from "preact";
import { PanelLeftClose, PanelLeft, PanelLeftOpen, Check } from "lucide-preact";

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

/** モード定義 */
const MODES: { value: RailMode; label: string; icon: FunctionComponent<{ size?: number | string }> }[] = [
  { value: "expanded", label: "Expanded", icon: PanelLeftClose },
  { value: "collapsed", label: "Collapsed", icon: PanelLeft },
  { value: "hover-expand", label: "Expand on hover", icon: PanelLeftOpen },
];

/**
 * Supabase 式アイコンレール（グローバルナビゲーション）。
 * 3 つの表示モード: expanded / collapsed / hover-expand（デフォルト）
 * 最下部のトグルボタンでポップオーバーを表示し、モードを選択可能。
 */
export function AdminIconRail({
  items,
  mode: initialMode = "hover-expand",
  bottomItems,
  brandIcon,
  showModeToggle = true,
}: AdminIconRailProps) {
  const [mode, setMode] = useState<RailMode>(initialMode);
  const [menuOpen, setMenuOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // 外部クリックで閉じる
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const modeClass = mode === "expanded"
    ? " sc-admin-rail--expanded"
    : mode === "hover-expand"
    ? " sc-admin-rail--hover-expand"
    : "";

  const currentMode = MODES.find((m) => m.value === mode)!;
  const ModeIcon = currentMode.icon;

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
        <div class="sc-admin-rail__toggle" ref={popoverRef}>
          <button
            class="sc-admin-rail__toggle-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
            title="Sidebar control"
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            <span class="sc-admin-rail__icon">
              <ModeIcon size={18} />
            </span>
            <span class="sc-admin-rail__label">{currentMode.label}</span>
          </button>

          {menuOpen && (
            <div class="sc-admin-rail__mode-popover" role="listbox" aria-label="Sidebar control">
              <div class="sc-admin-rail__mode-header">Sidebar control</div>
              {MODES.map((m) => {
                const OptionIcon = m.icon;
                const isSelected = m.value === mode;
                return (
                  <button
                    key={m.value}
                    class={`sc-admin-rail__mode-option${isSelected ? " sc-admin-rail__mode-option--selected" : ""}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => { setMode(m.value); setMenuOpen(false); }}
                    type="button"
                  >
                    <span class="sc-admin-rail__mode-option-icon">
                      <OptionIcon size={16} />
                    </span>
                    <span class="sc-admin-rail__mode-option-label">{m.label}</span>
                    {isSelected && (
                      <span class="sc-admin-rail__mode-option-check">
                        <Check size={14} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
