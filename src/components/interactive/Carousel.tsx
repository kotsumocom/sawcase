import { useId } from "preact/hooks";
import * as carousel from "@zag-js/carousel";
import { useMachine, normalizeProps } from "@zag-js/preact";
import type { ComponentChildren } from "preact";

export interface CarouselProps {
  children: ComponentChildren[];
  loop?: boolean;
  autoplay?: boolean;
}

export function Carousel({ children, loop = false, autoplay = false }: CarouselProps) {
  const service = useMachine(carousel.machine, {
    id: useId(),
    slideCount: children.length,
    loop,
    autoplay,
  });
  const api = carousel.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      <button {...api.getPrevTriggerProps()}>◀</button>
      <button {...api.getNextTriggerProps()}>▶</button>
      <div {...api.getItemGroupProps()}>
        {children.map((child, i) => (
          <div key={i} {...api.getItemProps({ index: i })}>{child}</div>
        ))}
      </div>
    </div>
  );
}
