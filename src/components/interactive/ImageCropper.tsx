import { useId } from "preact/hooks";
import * as imageCropper from "@zag-js/image-cropper";
import { useMachine, normalizeProps } from "@zag-js/preact";

export interface ImageCropperProps {
  src: string;
  alt?: string;
}

export function ImageCropper({ src, alt = "" }: ImageCropperProps) {
  const service = useMachine(imageCropper.machine, { id: useId() });
  // deno-lint-ignore no-explicit-any
  const api = imageCropper.connect(service, normalizeProps) as any;
  return (
    <div {...api.getRootProps()}>
      <div {...api.getAreaProps()}>
        <img {...api.getImageProps()} src={src} alt={alt} />
        <div {...api.getCropAreaProps()} />
      </div>
    </div>
  );
}
