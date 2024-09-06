import { useState } from "react";
import style from "./CommentListBody.module.css";
import Image from "next/image";

export default function CommentListBody() {
  const [hideDropDown, setHideDropDown] = useState(true);
  return (
    <>
      <div className={style.CommentListBody_comment}>
        <div>댓글 내용</div>
        <Image
          src={"/images/ic_vertical_point_3.svg"}
          width={24}
          height={24}
          alt="설정"
        />
        {hideDropDown || (
          <div className={style.CommentListBody_drop_down}>
            <div className={style.drop_down_text}>수정하기</div>
            <div className={style.drop_down_text}>삭제하기</div>
          </div>
        )}
      </div>
      <div className={style.CommentListBody_additional_information}>
        <Image
          className={style.CommentListBody_user_img}
          src={"/images/ic_user.svg"}
          width={32}
          height={32}
          alt="유저 이미지"
        />
        <div className={style.CommentListBody_box}>
          <div className={style.CommentListBody_user}>유저 이름</div>
          <div className={style.CommentListBody_date}>시간</div>
        </div>
      </div>
    </>
  );
}
