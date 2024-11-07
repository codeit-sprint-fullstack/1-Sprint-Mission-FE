import Image from "next/image";
import style from "./TopBanner.module.css";
import TopBannerImg from "@/images/Img_home_top.png";
import { ROUTES } from "@/utils/rotues";
import { useRouter } from "next/router";

export default function TopBanner() {
  const router = useRouter();
  const handleClick = () => {
    router.push(ROUTES.BOARD);
  };
  return (
    <div className={style.topBannerContainer}>
      <div className={style.topBannerItem}>
        <div className={style.topBannerFontContainer}>
          <p className={style.topBannerFont}>
            일상의 모든 물건을
            <br className={style.fontNewLine} /> 거래해 보세요
          </p>
          <button className={style.topBannerBtn} onClick={handleClick}>
            구경하러 가기
          </button>
        </div>
        <div className={style.topBannerImgContainer}>
          <Image
            src={TopBannerImg}
            width={746}
            height={340}
            alt="Top Banner Image"
            className={style.topBannerImg}
          />
        </div>
      </div>
    </div>
  );
}
