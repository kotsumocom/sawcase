import type { ComponentChildren } from "preact";

/** 通知タイプ */
export type NotifType = "info" | "warning" | "error" | "success";

/** 通知アイテム */
export interface NotifItem {
  id: string;
  title: string;
  description?: string;
  time: string;
  read?: boolean;
  type?: NotifType;
}

/** 通知グループ */
export interface NotifGroup {
  group: string;
  items: NotifItem[];
}

export interface NotificationListProps {
  /** グループ化された通知 */
  groups: NotifGroup[];
  /** 既読コールバック */
  onMarkRead?: (id: string) => void;
  /** 全既読コールバック */
  onMarkAllRead?: () => void;
  /** 空メッセージ */
  emptyMessage?: string;
  /** ヘッダー右側のアクション */
  headerActions?: ComponentChildren;
}

const TYPE_INDICATORS: Record<NotifType, string> = {
  info: "sc-notif-list__dot--info",
  warning: "sc-notif-list__dot--warning",
  error: "sc-notif-list__dot--error",
  success: "sc-notif-list__dot--success",
};

/**
 * 通知リスト。グループ化された通知一覧を表示。
 *
 * ```tsx
 * <NotificationList
 *   groups={notificationGroups}
 *   onMarkRead={(id) => ...}
 *   onMarkAllRead={() => ...}
 * />
 * ```
 */
export function NotificationList({
  groups,
  onMarkRead,
  onMarkAllRead,
  emptyMessage = "通知はありません",
  headerActions,
}: NotificationListProps) {
  const total = groups.reduce((sum, g) => sum + g.items.length, 0);
  const unread = groups.reduce(
    (sum, g) => sum + g.items.filter((i) => !i.read).length,
    0,
  );

  return (
    <div class="sc-notif-list" role="log" aria-label="通知">
      {/* ヘッダー */}
      <div class="sc-notif-list__header">
        <span class="sc-notif-list__count">
          {unread > 0 ? `${unread} 件の未読` : "すべて既読"}
        </span>
        <div class="sc-notif-list__header-actions">
          {unread > 0 && onMarkAllRead && (
            <button
              class="sc-notif-list__mark-all"
              type="button"
              onClick={onMarkAllRead}
            >
              すべて既読にする
            </button>
          )}
          {headerActions}
        </div>
      </div>

      {total === 0 ? (
        <div class="sc-notif-list__empty">{emptyMessage}</div>
      ) : (
        groups.map((group) => (
          <div key={group.group} class="sc-notif-list__group">
            <div class="sc-notif-list__group-label">{group.group}</div>
            {group.items.map((item) => (
              <div
                key={item.id}
                class={`sc-notif-list__item${item.read ? "" : " sc-notif-list__item--unread"}`}
                onClick={() => onMarkRead?.(item.id)}
                role="article"
              >
                <span
                  class={`sc-notif-list__dot ${item.type ? TYPE_INDICATORS[item.type] : ""}`}
                  aria-hidden="true"
                />
                <div class="sc-notif-list__body">
                  <div class="sc-notif-list__title">{item.title}</div>
                  {item.description && (
                    <div class="sc-notif-list__desc">{item.description}</div>
                  )}
                  <div class="sc-notif-list__time">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
