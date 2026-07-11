import { useId } from "preact/hooks";
import * as avatar from "@zag-js/avatar";
import { useMachine, normalizeProps } from "@zag-js/preact";

export interface AvatarProps {
  src?: string;
  name: string;
}

export function Avatar({ src, name }: AvatarProps) {
  const service = useMachine(avatar.machine, { id: useId() });
  const api = avatar.connect(service, normalizeProps);
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div {...api.getRootProps()}>
      <span {...api.getFallbackProps()}>{initials}</span>
      {src && <img {...api.getImageProps()} src={src} alt={name} />}
    </div>
  );
}
