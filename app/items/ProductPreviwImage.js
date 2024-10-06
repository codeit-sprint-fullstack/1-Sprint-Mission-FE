"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductPreviewImage({ imageUrl }) {
  const [validImg, setValidImg] = useState("/images/no_image.svg");

  useEffect(() => {
    const image = new window.Image();

    const handleImgLoad = () => {
      setValidImg(imageUrl);
    };
    const handleImgError = () => {
      setValidImg("/images/no_image.svg");
    };

    image.src = imageUrl;
    image.onload = handleImgLoad;
    image.onerror = handleImgError;

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [imageUrl]);

  return <Image src={validImg} alt="상품 사진" fill />;
}
