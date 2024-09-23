import { useState } from "react";
import style from "./ParticularInformation.module.css";
import Image from "next/image";
import Link from "next/link";
import instance from "@/lib/axios";
import { useRouter } from "next/router";
import useTimeCalculation from "../hook/useTimeCalculation";

export default function ParticularInformation({ data }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const router = useRouter();

  // 날짜 계산
  const stringDay = useTimeCalculation(data.createdAt);

  // 설정 드롭다운 온/오프 함수
  const dropDownHandler = () => {
    if (!showDropDown) {
      setShowDropDown(true);
    } else if (showDropDown) {
      setShowDropDown(false);
    }
  };

  // 삭제 함수
  const deleteHandler = async () => {
    await instance.delete(`/noticeBoards/${data.id}`);
    router.push("/freeNoticeBoard");
  };

  return (
    <div className={style.contaner}>
      <div className={style.keyInformation}>
        <div className={`${style.subject} ${style.flexRow}`}>
          <div className={style.title}>{data.title}</div>
          <Image
            className={style.settingImg}
            src={"/images/ic_vertical_point_3.svg"}
            width={24}
            height={24}
            alt="설정"
            onClick={dropDownHandler}
          />
          {showDropDown && (
            <div className={style.dropDown}>
              <Link href={`/freeNoticeBoard/patchArticle/${data.id}`}>
                <div className={`${style.dropDownText} ${style.font16}`}>
                  수정하기
                </div>
              </Link>
              <div
                className={`${style.dropDownText} ${style.font16}`}
                onClick={deleteHandler}
              >
                삭제하기
              </div>
            </div>
          )}
        </div>
        <div className={`${style.additionalInformation} ${style.flexRow}`}>
          <Image
            className={style.userImg}
            src={"/images/ic_user.svg"}
            width={40}
            height={40}
            alt="유저 이미지"
          />
          <div className={`${style.userName} ${style.font14}`}>코드잇</div>
          <div className={`${style.date} ${style.font14}`}>{stringDay}</div>
          <div className={style.separationLine} />
          <div className={`${style.favorite} ${style.flexRow} ${style.font16}`}>
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
      <div className={style.contents}>{data.content}</div>
    </div>
  );
}
