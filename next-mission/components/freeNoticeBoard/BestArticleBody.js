import Image from "next/image";
import style from "./BestArticleBody.module.css";
import Link from "next/link";
import useTimeCalculation from "../hook/useTimeCalculation";

export default function BestArticleBody({ list }) {
  // 날짜 계산
  const stringDay = useTimeCalculation(list.createdAt);

  return (
    <Link href={`/freeNoticeBoard/${list.id}`}>
      <Image
        src={"/images/img_bast.svg"}
        width={102}
        height={30}
        alt="베스트 게시글"
      />
      <div
        className={`${style.BestArticleBody_key_information} ${style.flex_row}`}
      >
        <div className={style.BestArticleBody_title}>{list.title}</div>
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
          <div className={style.BestArticleBody_user}>코드잇</div>
          <div
            className={`${style.BestArticleBody_favorite} ${style.flex_row}`}
          >
            <Image
              src={"/images/ic_heart.svg"}
              width={16}
              height={16}
              alt="하트"
            />
            <div>999+</div>
          </div>
        </div>
        <div className={style.BestArticleBody_date}>{stringDay}</div>
      </div>
    </Link>
  );
}
