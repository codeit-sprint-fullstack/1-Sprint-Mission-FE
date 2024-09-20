import Image from "next/image";
import styles from "./ImgContainer.module.scss";
import { useState } from "react";

const defaultImg = "/assets/img_default.svg";

export default function ImageContainer({
  src,
  alt = "default image",
  width = "100%",
  height = "auto",
  radius = "4px",
  borderColor = "transparent",
  isPriority,
}) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    //url 경로 허용하지 않은 소스 이미지는 기본으로 대체
    setImgSrc(defaultImg);
  };

  return (
    <div
      className={styles.container}
      style={{
        "--width": width,
        "--height": height,
        "--radius": radius,
        "--border-color": borderColor,
      }}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        priority={isPriority}
        onError={handleError}
      />
    </div>
  );
}
