"use client";

import { useState, useEffect } from "react";
import classNames from "classnames";
import Image from "next/image";

export default function ProductImageListSet({ images }) {
  const [validImgs, setValidImgs] = useState(images);

  const productImageListSetClass = classNames("product-image-list-set");
  const productImageClass = classNames("product-image-frame");
  const productImageListClass = classNames(
    "product-image-list",
    "bg-gray-100",
    "text-2xl"
  );

  useEffect(() => {
    const loadImages = () => {
      const imgPromises = images.map((img) => {
        return new Promise((resolve) => {
          const image = new window.Image();

          const handleImgLoad = () => {
            resolve(img);
          };
          const handleImgError = () => {
            resolve("/images/no_image.svg");
          };

          image.src = img;
          image.onload = handleImgLoad;
          image.onerror = handleImgError;
        });
      });

      Promise.all(imgPromises).then((results) => {
        setValidImgs(results);
      });
    };

    loadImages();

    return () => {
      setValidImgs([]);

      images.forEach((img) => {
        const image = new window.Image();
        image.src = img;
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [images]);

  return (
    <div className={productImageListSetClass}>
      <div className={productImageClass}>
        <Image
          src={validImgs[0]}
          fill
          style={{ objectFit: "cover" }}
          alt="상품 이미지"
        />
      </div>
      <div className={productImageListClass}>
        이미지 리스트 선택창(개발 예정)
      </div>
    </div>
  );
}
