import { useState } from "react";
import style from "./ParticularInformation.module.css";
import Image from "next/image";

export default function ParticularInformation() {
  const [hideDropDown, setHideDropDown] = useState(true);

  return (
    <div className={style.ParticularInformation_contaner}>
      <div className={style.ParticularInformation_key_information}>
        <div
          className={`${style.ParticularInformation_subject} ${style.flex_row}`}
        >
          <div className={style.ParticularInformation_title}>제목</div>
          <Image
            src={"/images/ic_vertical_point_3.svg"}
            width={24}
            height={24}
            alt="설정"
          />
          {hideDropDown || (
            <div className={style.ParticularInformation_drop_down}>
              <div className={`${style.drop_down_button} ${style.font16}`}>수정하기</div>
              <div className={`${style.drop_down_button} ${style.font16}`}>삭제하기</div>
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
            유저 이름
          </div>
          <div
            className={`${style.ParticularInformation_date} ${style.font14}`}
          >
            0000. 00. 00
          </div>
          <div className={style.ParticularInformation_line} />
          <div className={`${style.ParticularInformation_favorite} ${style.flex_row} ${style.font16}`}>
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
      <div className={style.ParticularInformation_contents}>설명</div>
    </div>
  );
}
