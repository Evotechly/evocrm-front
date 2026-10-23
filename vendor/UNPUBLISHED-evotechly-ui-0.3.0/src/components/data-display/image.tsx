import * as React from "react";

export function EvoImage({ alt, src, caption }: { alt: string; src: string; caption?: string }) {
  return (
    <figure data-evo="image" className="evo-media">
      <img alt={alt} src={src} role="img" />
      {caption ? <figcaption className="evo-card-description">{caption}</figcaption> : null}
    </figure>
  );
}

export const Image = EvoImage;
