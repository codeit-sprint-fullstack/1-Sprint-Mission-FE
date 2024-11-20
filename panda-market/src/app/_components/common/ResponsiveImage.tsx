"use client";

import Image from "next/image";
import { useState } from "react";

const DEFAULT_IMAGE = "/images/placeholder-no-image.svg";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  sizes?: string;
  priority?: boolean;
}

export const ResponsiveImage = ({
  src,
  alt,
  className = "object-cover",
  fallback = DEFAULT_IMAGE,
  sizes,
  priority,
}: ResponsiveImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={className}
      onError={() => setImgSrc(fallback)}
      sizes={sizes}
      priority={priority}
    />
  );
};
