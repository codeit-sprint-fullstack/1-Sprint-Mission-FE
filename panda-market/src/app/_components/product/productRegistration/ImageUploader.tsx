import Image from "next/image";
import { X } from "lucide-react";
import type { ChangeEvent } from "react";

interface ImageUploaderProps {
  images: string[];
  onImageRemove: (index: number) => void;
  uploadProgress: number;
  onFileSelect: (file: File) => Promise<void>;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 5;

export function ImageUploader({
  images,
  onImageRemove,
  uploadProgress,
  onFileSelect,
}: ImageUploaderProps) {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("파일 크기는 5MB를 초과할 수 없습니다.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    await onFileSelect(file);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">상품 이미지</label>

      {uploadProgress > 0 && (
        <div className="mb-4 h-2 w-full rounded bg-secondary-200">
          <div
            className="h-full rounded bg-primary-100 transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      <div className="flex gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative h-32 w-32">
            <Image
              src={image}
              alt={`상품 이미지 ${index + 1}`}
              width={128}
              height={128}
              className="h-full w-full rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() => onImageRemove(index)}
              className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow hover:bg-secondary-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {images.length < MAX_IMAGES && (
          <label
            className={`flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed hover:bg-secondary-50 ${
              uploadProgress > 0 ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploadProgress > 0}
            />
            {uploadProgress > 0 ? "업로드 중..." : "+"}
          </label>
        )}
      </div>
      <p className="mt-2 text-sm text-secondary-500">
        최대 5개의 이미지, 각 5MB 이하
      </p>
    </div>
  );
}
