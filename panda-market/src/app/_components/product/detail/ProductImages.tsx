"use client";

import { useState } from "react";
import { ResponsiveImage } from "@/app/_components/common/ResponsiveImage";

const DEFAULT_PRODUCT_IMAGE = "/images/placeholder-no-image.svg";

interface ProductImagesProps {
  images: string[];
  title: string;
}

export default function ProductImages({ images, title }: ProductImagesProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="relative aspect-square min-w-[343px] tablet:min-w-[340px] pc:min-w-[486px]">
      <div className="relative h-full w-full overflow-hidden rounded-[16px]">
        <ResponsiveImage
          src={images[currentImageIndex] ?? DEFAULT_PRODUCT_IMAGE}
          alt={title}
          className="object-cover"
          sizes="(min-width: 1200px) 486px, (min-width: 744px) 340px, 343px"
          priority
          fallback={DEFAULT_PRODUCT_IMAGE}
        />
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentImageIndex === index
                  ? "bg-primary-100"
                  : "hover:bg-secondary-300 bg-secondary-200"
              }`}
              aria-label={`이미지 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
