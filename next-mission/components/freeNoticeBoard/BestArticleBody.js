import Image from "next/image";
import style from "./BestArticleBody.module.css";

export default function BestArticleBody({ list }) {
  return (
    <>
      <Image
        src={"/images/img_bast.svg"}
        width={102}
        height={30}
        alt="베스트 게시글"
      />
      <div
        className={`${style.BestArticleBody_key_information} ${style.flex_row}`}
      >
        <div className={style.BestArticleBody_title}>제목</div>
        <Image
          className={style.BestArticleBody_default_img}
          src={"/images/img_default.svg"}
          width={72}
          height={72}
          alt="기본 이미지"
        />
      </div>
      <div
        className={`${style.BestArticleBody_additional_information} ${style.flex_row}`}
      >
        <div className={`${style.BestArticleBody_box} ${style.flex_row}`}>
          <div className={style.BestArticleBody_user}>유저이름</div>
          <div
            className={`${style.BestArticleBody_favorite} ${style.flex_row}`}
          >
            <Image
              src={"/images/ic_heart.svg"}
              width={16}
              height={16}
              alt="하트"
            />
            <div>좋아요</div>
          </div>
        </div>
        <div className={style.BestArticleBody_date}>0000. 00. 00</div>
      </div>
    </>
  );
}
