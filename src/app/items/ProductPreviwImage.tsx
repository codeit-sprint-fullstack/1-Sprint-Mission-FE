"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ProductPreviewImageProps {
  imgUrl: string;
}

export default function ProductPreviewImage({
  imgUrl,
}: ProductPreviewImageProps) {
  const [validImg, setValidImg] = useState("/images/no_image.svg");

  useEffect(() => {
    const image = new window.Image();

    const handleImgLoad = () => {
      setValidImg(imgUrl);
    };
    const handleImgError = () => {
      setValidImg("/images/no_image.svg");
    };

    image.src = imgUrl;
    image.onload = handleImgLoad;
    image.onerror = handleImgError;

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [imgUrl]);

  return <Image src={validImg} alt="상품 사진" fill />;
}
