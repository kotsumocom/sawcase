import { useState, useRef } from "preact/hooks";
import type { ComponentChildren, FunctionComponent } from "preact";

/** パンくずセグメントのドロップダウンアイテム */
export interface BreadcrumbDropdownItem {
  label: string;
  value: string;
  href: string;
  icon?: FunctionComponent<{ size?: number }>;
}

/** パンくずのセグメント */
export interface BreadcrumbSegment {
  /** 表示ラベル */
  label: string;
  /** リンク先 */
  href?: string;
  /** アイコン */
  icon?: FunctionComponent<{ size?: number }>;
  /** ドロップダウン（Org/Project セレクター等） */
  dropdown?: {
    items: BreadcrumbDropdownItem[];
    currentValue?: string;
  };
}

/** AdminBreadcrumb の props */
export interface AdminBreadcrumbProps {
  segments: BreadcrumbSegment[];
}

/** ドロップダウン付きパンくずコンポーネント */
export function AdminBreadcrumb({ segments }: AdminBreadcrumbProps) {
  return (
    <div class="sc-admin-breadcrumb">
      {segments.map((seg, i) => (
        <div key={i} class="sc-admin-breadcrumb__item">
          {i > 0 && <span class="sc-admin-breadcrumb__sep">/</span>}
          {seg.dropdown ? (
            <BreadcrumbDropdown segment={seg} />
          ) : seg.href ? (
            <a href={seg.href} class="sc-admin-breadcrumb__link">
              {seg.icon && <SegIcon Icon={seg.icon} />}
              {seg.label}
            </a>
          ) : (
            <span class="sc-admin-breadcrumb__text">
              {seg.icon && <SegIcon Icon={seg.icon} />}
              {seg.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function SegIcon({ Icon }: { Icon: FunctionComponent<{ size?: number }> }) {
  return (
    <span class="sc-admin-breadcrumb__icon">
      <Icon size={14} />
    </span>
  );
}

function BreadcrumbDropdown({ segment }: { segment: BreadcrumbSegment }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dd = segment.dropdown!;

  return (
    <div class="sc-admin-breadcrumb__dropdown" ref={ref}>
      <button
        class="sc-admin-breadcrumb__trigger"
        onClick={() => setOpen(!open)}
        type="button"
      >
        {segment.icon && <SegIcon Icon={segment.icon} />}
        <span>{segment.label}</span>
        <span class="sc-admin-breadcrumb__chevron">▾</span>
      </button>
      {open && (
        <div class="sc-admin-breadcrumb__popover">
          {dd.items.map((item) => (
            <a
              key={item.value}
              href={item.href}
              class={`sc-admin-breadcrumb__option${item.value === dd.currentValue ? " sc-admin-breadcrumb__option--active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {item.icon && <SegIcon Icon={item.icon} />}
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
