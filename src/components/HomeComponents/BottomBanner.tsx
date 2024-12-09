import Image from "next/image";
import style from "./BottomBanner.module.css";

export default function BottomBanner() {
  return (
    <div className={style.bottomBannerContainer}>
      <div className={style.bottomBannerItem}>
        <div className={style.bottomBannerFontContainer}>
          <p className={style.bottomBannerFont}>
            믿을 수 있는
            <br /> 판다마켓 중고 거래
          </p>
        </div>
        <div className={style.bottomBannerImgContainer}>
          <Image
            src="/Img_home_bottom.png"
            width={746}
            height={340}
            alt="Bottom Banner Image"
            className={style.bottomBannerImg}
          />
        </div>
      </div>
    </div>
  );
}
