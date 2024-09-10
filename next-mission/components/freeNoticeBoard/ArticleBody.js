import Link from "next/link";
import style from "./ArticleBody.module.css";
import Image from "next/image";
import useTimeCalculation from "../hook/useTimeCalculation";

export default function ArticleBody({ data }) {
  //날짜 계산
  const stringDay = useTimeCalculation(data.createdAt);

  return (
    <Link href={`/freeNoticeBoard/${data.id}`}>
      <div className={`${style.ArticleBody_subject} ${style.flex_row}`}>
        <div className={style.ArticleBody_title}>{data.title}</div>
        <Image
          className={style.ArticleBody_product_img}
          src={"/images/img_default.svg"}
          width={72}
          height={72}
          alt="기본 이미지"
        />
      </div>
      <div
        className={`${style.ArticleBody_additional_information} ${style.flex_row}`}
      >
        <div className={`${style.ArticleBody_box} ${style.flex_row}`}>
          <Image
            className={style.ArticleBody_user_img}
            src={"/images/ic_user.svg"}
            width={24}
            height={24}
            alt="유저 이미지"
          />
          <div className={style.ArticleBody_user}>코드잇</div>
          <div className={style.ArticleBody_date}>{stringDay}</div>
        </div>
        <div className={`${style.ArticleBody_favorite} ${style.flex_row}`}>
          <Image
            src={"/images/ic_heart.svg"}
            width={24}
            height={24}
            alt="하트"
          />
          <div>999+</div>
        </div>
      </div>
    </Link>
  );
}
