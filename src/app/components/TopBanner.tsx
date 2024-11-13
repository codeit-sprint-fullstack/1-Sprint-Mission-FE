import Image from "next/image";
import Link from "next/link";

import style from "./top-banner.module.css";

export default function TopBanner() {
  return (
    <div className={style["top-banner"]}>
      <div className={style["banner__box"]}>
        <div className={style["banner__box-text-button-set"]}>
          <p className={style["banner__box-text"]}>
            일상의 모든 물건을 거래해 보세요
          </p>
          <Link href="/items">
            <button className={style["banner__box-button"]} />
          </Link>
        </div>
        <div className={style["banner__image-frame"]}>
          <Image
            src="/images/Img_home_top_746_340.svg"
            alt="탑 배너 이미지"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
