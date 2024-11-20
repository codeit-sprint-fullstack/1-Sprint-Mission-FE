import { ResponsiveImage } from "@/app/_components/common/ResponsiveImage";

interface PostImagesGridProps {
  images: string[];
  title: string;
}

export function PostImagesGrid({ images, title }: PostImagesGridProps) {
  if (images.length === 0) return null;

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-square w-full">
          <ResponsiveImage
            src={image}
            alt={`${title} 이미지 ${index + 1}`}
            className="rounded-lg object-cover"
          />
        </div>
      ))}
    </div>
  );
}
