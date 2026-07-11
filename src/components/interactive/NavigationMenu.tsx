import { useId } from "preact/hooks";
import * as navigationMenu from "@zag-js/navigation-menu";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

export interface NavMenuItem {
  value: string;
  label: string;
  children?: ComponentChildren;
}

export interface NavigationMenuProps {
  items: NavMenuItem[];
}

export function NavigationMenu({ items }: NavigationMenuProps) {
  const service = useMachine(navigationMenu.machine, { id: useId() });
  const api = navigationMenu.connect(service, normalizeProps);
  return (
    <nav {...api.getRootProps()}>
      <div {...api.getListProps()}>
        {items.map((item) => (
          <div key={item.value} {...api.getItemProps({ value: item.value })}>
            <button {...api.getTriggerProps({ value: item.value })}>{item.label}</button>
            {item.children && (
              <div {...api.getContentProps({ value: item.value })}>{item.children}</div>
            )}
          </div>
        ))}
      </div>
      <div {...api.getViewportProps()} />
    </nav>
  );
}
