import { useState } from "react";
import style from "./ParticularInformation.module.css";
import Image from "next/image";
import Link from "next/link";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import useTimeCalculation from "../hook/useTimeCalculation";

export default function ParticularInformation({ data }) {
  const [hideDropDown, setHideDropDown] = useState(true);
  const router = useRouter();

  // 날짜 계산
  const stringDay = useTimeCalculation(data.createdAt)

  // 설정 드롭다운 온/오프 함수
  const dropDownHandler = () => {
    if (!hideDropDown) {
      setHideDropDown(true);
    } else if (hideDropDown) {
      setHideDropDown(false);
    }
  };

  // 삭제 함수
  const deleteHandler = async () => {
    await axios.delete(`/noticeBoards/${data.id}`);
    router.push("/freeNoticeBoard");
  };

  return (
    <div className={style.ParticularInformation_contaner}>
      <div className={style.ParticularInformation_key_information}>
        <div
          className={`${style.ParticularInformation_subject} ${style.flex_row}`}
        >
          <div className={style.ParticularInformation_title}>{data.title}</div>
          <Image
          className={style.ParticularInformation_setting_img}
            src={"/images/ic_vertical_point_3.svg"}
            width={24}
            height={24}
            alt="설정"
            onClick={dropDownHandler}
          />
          {hideDropDown || (
            <div className={style.ParticularInformation_drop_down}>
              <Link href={`/freeNoticeBoard/pacthArticle/${data.id}`}>
                <div className={`${style.drop_down_button} ${style.font16}`}>
                  수정하기
                </div>
              </Link>
              <div
                className={`${style.drop_down_button} ${style.font16}`}
                onClick={deleteHandler}
              >
                삭제하기
              </div>
            </div>
          )}
        </div>
        <div
          className={`${style.ParticularInformation_additional_information} ${style.flex_row}`}
        >
          <Image
            className={style.ParticularInformation_ArticleBody_user_img}
            src={"/images/ic_user.svg"}
            width={40}
            height={40}
            alt="유저 이미지"
          />
          <div
            className={`${style.ParticularInformation_user} ${style.font14}`}
          >
            코드잇
          </div>
          <div
            className={`${style.ParticularInformation_date} ${style.font14}`}
          >
            {stringDay}
          </div>
          <div className={style.ParticularInformation_line} />
          <div
            className={`${style.ParticularInformation_favorite} ${style.flex_row} ${style.font16}`}
          >
            <Image
              src={"/images/ic_heart.svg"}
              width={32}
              height={32}
              alt="하트"
            />
            <div>999+</div>
          </div>
        </div>
      </div>
      <div className={style.ParticularInformation_contents}>{data.content}</div>
    </div>
  );
}
