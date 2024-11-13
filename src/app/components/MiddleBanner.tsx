import Image from "next/image";
import classNames from "classnames";

import { MiddleBannerProps } from "src/types/components";

import style from "./middle-banner.module.css";

export default function MiddleBanner({
  isLeftImage,
  imagePath,
  textSetWidth,
  topText,
  middleText,
  bottomText,
}: MiddleBannerProps) {
  const bannerBoxClass = classNames(
    style["banner-box"],
    isLeftImage ? "flex-row" : "flex-row-reverse"
  );

  return (
    <div className={style["middle-banner"]}>
      <div className={bannerBoxClass}>
        <div
          className={style["banner-box-text-set"]}
          style={{ width: textSetWidth }}
        >
          <p className={style["banner-box-top-text"]}>{topText}</p>
          <p className={style["banner-box-middle-text"]}>{middleText}</p>
          <p className={style["banner-box-bottom-text"]}>{bottomText}</p>
        </div>
        <div className={style["banner-image-frame"]}>
          <Image
            src={imagePath}
            alt="탑 배너 이미지"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
