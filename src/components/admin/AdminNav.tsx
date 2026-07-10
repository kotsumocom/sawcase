import type { FunctionComponent } from "preact";
import type { NavItem } from "./AdminShell.tsx";

/** ナビゲーショングループ */
export interface NavGroup {
  /** グループラベル（省略可） */
  label?: string;
  /** グループ内の項目 */
  items: NavItem[];
}

/** AdminNav の props */
export interface AdminNavProps {
  /** ナビゲーショングループ */
  groups: NavGroup[];
}

/** 管理画面のサイドナビゲーション */
export function AdminNav({ groups }: AdminNavProps) {
  return (
    <nav class="sc-admin-nav" id="admin-nav">
      {groups.map((group, gi) => (
        <div class="sc-admin-nav__group" key={gi}>
          {group.label && (
            <div class="sc-admin-nav__group-label">{group.label}</div>
          )}
          {group.items.map((item, ii) => {
            const Icon = item.icon;
            return (
              <a
                href={item.href}
                class={`sc-admin-nav__link${item.active ? " sc-admin-nav__link--active" : ""}`}
                key={ii}
              >
                {Icon && (
                  <span class="sc-admin-nav__icon">
                    <Icon size={20} />
                  </span>
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
