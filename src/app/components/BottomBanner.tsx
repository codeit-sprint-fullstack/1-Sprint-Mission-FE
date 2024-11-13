import Image from "next/image";

import style from "./bottom-banner.module.css";

export default function BottomBanner() {
  return (
    <div className={style["bottom-banner"]}>
      <div className={style["banner__box"]}>
        <p className={style["banner__box-text"]}>
          믿을 수 있는 판다마켓 중고 거래
        </p>
        <div className={style["banner__image-frame"]}>
          <Image
            src="/images/Img_home_bottom_746_397.svg"
            alt="탑 배너 이미지"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
