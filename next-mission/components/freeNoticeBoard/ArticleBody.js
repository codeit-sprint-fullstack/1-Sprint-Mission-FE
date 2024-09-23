import Link from "next/link";
import style from "./ArticleBody.module.css";
import Image from "next/image";
import useTimeCalculation from "../hook/useTimeCalculation";

export default function ArticleBody({ data }) {
  //날짜 계산
  const stringDay = useTimeCalculation(data.createdAt);

  return (
    <Link href={`/freeNoticeBoard/${data.id}`}>
      <div className={`${style.subject} ${style.flexRow}`}>
        <div className={style.title}>{data.title}</div>
        <Image
          className={style.productImg}
          src={"/images/img_default.svg"}
          width={72}
          height={72}
          alt="기본 이미지"
        />
      </div>
      <div
        className={`${style.additionalInformation} ${style.flexRow}`}
      >
        <div className={`${style.additionalInformationBox} ${style.flexRow}`}>
          <Image
            className={style.userImg}
            src={"/images/ic_user.svg"}
            width={24}
            height={24}
            alt="유저 이미지"
          />
          <div className={style.userName}>코드잇</div>
          <div className={style.date}>{stringDay}</div>
        </div>
        <div className={`${style.favorite} ${style.flexRow}`}>
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
