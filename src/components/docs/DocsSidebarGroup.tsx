import type { ComponentChildren } from "preact";

/** DocsSidebarGroup の props */
export interface DocsSidebarGroupProps {
  /** グループラベル */
  label: string;
  /** グループ内の項目 */
  children: ComponentChildren;
}

/**
 * ドキュメントサイドバーのグループコンポーネント。
 * `sc-docs-sidebar__group` / `sc-docs-sidebar__group-label` CSS に対応。
 *
 * @example
 * ```tsx
 * <DocsSidebarGroup label="はじめに">
 *   <a href="/docs">概要</a>
 *   <a href="/docs/install">インストール</a>
 * </DocsSidebarGroup>
 * ```
 */
export function DocsSidebarGroup(
  { label, children }: DocsSidebarGroupProps,
) {
  return (
    <div class="sc-docs-sidebar__group">
      <div class="sc-docs-sidebar__group-label">{label}</div>
      {children}
    </div>
  );
}
