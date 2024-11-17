"use client";

import { api } from "@/app/_trpc/client";
import { useState } from "react";

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
}

interface CloudinaryErrorResponse {
  error?: {
    message: string;
  };
}

export const useCloudinaryUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const mutation = api.upload.getSignature.useMutation();

  const uploadImage = async (file: File): Promise<string> => {
    try {
      setIsUploading(true);
      const { signature, timestamp, cloudName, apiKey } =
        await mutation.mutateAsync();

      if (!cloudName || !apiKey) {
        throw new Error("Cloudinary configuration is missing");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", String(timestamp));
      formData.append("api_key", apiKey);
      formData.append("folder", "product-images");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        const errorData = (await response.json()) as CloudinaryErrorResponse;
        throw new Error(errorData.error?.message ?? "Upload failed");
      }

      const data = (await response.json()) as CloudinaryResponse;
      return data.secure_url;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Image upload failed:", error.message);
        throw error;
      }
      throw new Error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading,
    error: mutation.error,
  };
};
