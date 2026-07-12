import { useState, useRef } from "preact/hooks";
import { User, LogOut, Settings, ChevronDown } from "lucide-preact";

export interface UserMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
}

export interface AdminHeaderUserProps {
  name: string;
  email?: string;
  avatarUrl?: string;
  menuItems?: UserMenuItem[];
}

/** ユーザーアバター + ドロップダウンメニュー */
export function AdminHeaderUser({
  name,
  email,
  avatarUrl,
  menuItems,
}: AdminHeaderUserProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div class="sc-admin-header-user" ref={ref}>
      <button
        class="sc-admin-header-user__trigger"
        onClick={() => setOpen(!open)}
        type="button"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} class="sc-admin-header-user__avatar" />
        ) : (
          <span class="sc-admin-header-user__avatar-fallback">
            <User size={18} />
          </span>
        )}
        <ChevronDown size={14} />
      </button>
      {open && (
        <div class="sc-admin-header-user__popover">
          <div class="sc-admin-header-user__info">
            <div class="sc-admin-header-user__name">{name}</div>
            {email && <div class="sc-admin-header-user__email">{email}</div>}
          </div>
          {menuItems && menuItems.length > 0 && (
            <div class="sc-admin-header-user__menu">
              {menuItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href || "#"}
                  class={`sc-admin-header-user__menu-item${item.danger ? " sc-admin-header-user__menu-item--danger" : ""}`}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                    setOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
