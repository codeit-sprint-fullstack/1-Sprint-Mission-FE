import Image from "next/image";
import styles from "./ImgContainers.module.scss";
import { useState } from "react";
import assets from "@/variables/images";

const defaultImg = assets.images.default;

export function ImageContainer({
  src,
  alt = "default image",
  width = "100%",
  radius = "4px",
  isBorder = false,
  priority = false,
}) {
  const [imgSrc, setImgSrc] = useState(src || defaultImg);

  const handleError = () => {
    //url 경로 허용하지 않은 소스 이미지는 기본으로 대체
    setImgSrc(defaultImg);
  };

  return (
    <div
      className={styles.ImageContainer}
      style={{
        "--width": width,
        "--radius": radius,
        "--border": isBorder ? "1px solid #E5E7EB" : "none",
      }}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        priority={priority}
        onError={handleError}
      />
    </div>
  );
}

export function IconContainer({
  src,
  alt = "default icon",
  width = "24px",
  priority = false,
  className = "",
}) {
  const classNames = `${styles.IconContainer} ${className}`;
  return (
    <div
      className={classNames}
      style={{
        "--width": width,
      }}
    >
      <Image src={src || defaultImg} alt={alt} fill priority={priority} />
    </div>
  );
}
