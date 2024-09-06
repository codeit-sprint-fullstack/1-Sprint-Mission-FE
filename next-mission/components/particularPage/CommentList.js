import { useState } from "react";
import CommentListBody from "./CommentListBody";
import style from "./CommentList.module.css";
import Image from "next/image";
import Link from "next/link";

export default function CommentList() {
  const [list, setList] = useState([1, 2, 3, 4, 5]); // 예정
  const [noList, setNoList] = useState(false);
  const [buttonMargin, setButtonMargin] = useState(style.yes_list_button) //(style.no_list_button);

  return (
    <>
      {noList && (
        <div className={`${style.CommentList_no_comment} ${style.flex_column}`}>
          <Image
            src={"/images/Img_speech_bubble.svg"}
            width={140}
            height={140}
            alt="말풍선"
          />
          <div className={style.CommentList_no_comment_text}>
            아직 댓글이 없어요, <br />
            지금 댓글을 달아보세요!
          </div>
        </div>
      )}
      {noList || (
        <ul className={`${style.CommentList_ul} ${style.flex_column}`}>
          {list.map((comment) => {
            return (
              <li className={style.CommentList_li}>
                <CommentListBody comment={comment} />
              </li>
            );
          })}
        </ul>
      )}
      <Link href="/freeNoticeBoard">
        <div className={`${style.CommentList_button} ${buttonMargin}`}>
          <div>목록으로 돌아가기</div>
          <Image
            className={style.CommentList_arrow_img}
            src={"/images/ic_back_arrow.svg"}
            width={24}
            height={24}
            alt="뒤로가기 화살표"
          />
        </div>
      </Link>
    </>
  );
}
