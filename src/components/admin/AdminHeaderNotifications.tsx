import { useState, useRef } from "preact/hooks";
import { Bell } from "lucide-preact";

/** 通知アイテム */
export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read?: boolean;
  href?: string;
}

export interface AdminHeaderNotificationsProps {
  items: NotificationItem[];
  /** 表示する最大件数（デフォルト: 5） */
  maxItems?: number;
  /** 「もっと見る」リンク先 */
  moreHref?: string;
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
}

/** 通知ベル + Popover リストコンポーネント */
export function AdminHeaderNotifications({
  items,
  maxItems = 5,
  moreHref,
  onMarkRead,
  onMarkAllRead,
}: AdminHeaderNotificationsProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unread = items.filter((i) => !i.read).length;
  const visible = items.slice(0, maxItems);
  const hasMore = items.length > maxItems;

  return (
    <div class="sc-admin-header-notif" ref={ref}>
      <button
        class="sc-admin-header-action"
        onClick={() => setOpen(!open)}
        type="button"
        title="通知"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span class="sc-admin-header-action__badge">{unread > 9 ? "9+" : unread}</span>
        )}
      </button>
      {open && (
        <div class="sc-admin-header-notif__popover">
          <div class="sc-admin-header-notif__header">
            <span class="sc-admin-header-notif__title">通知</span>
            {unread > 0 && (
              <button
                class="sc-admin-header-notif__mark-all"
                onClick={() => onMarkAllRead?.()}
                type="button"
              >
                すべて既読
              </button>
            )}
          </div>
          <div class="sc-admin-header-notif__list">
            {visible.length === 0 ? (
              <div class="sc-admin-header-notif__empty">通知はありません</div>
            ) : (
              visible.map((item) => (
                <a
                  key={item.id}
                  href={item.href || "#"}
                  class={`sc-admin-header-notif__item${item.read ? "" : " sc-admin-header-notif__item--unread"}`}
                  onClick={() => {
                    onMarkRead?.(item.id);
                    setOpen(false);
                  }}
                >
                  <div class="sc-admin-header-notif__item-title">{item.title}</div>
                  <div class="sc-admin-header-notif__item-message">{item.message}</div>
                  <div class="sc-admin-header-notif__item-time">{item.time}</div>
                </a>
              ))
            )}
          </div>
          {(hasMore || moreHref) && (
            <a
              href={moreHref || "#"}
              class="sc-admin-header-notif__more"
              onClick={() => setOpen(false)}
            >
              すべての通知を見る →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
