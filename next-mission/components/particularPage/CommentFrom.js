import { useState } from 'react';
import style from './CommentFrom.module.css'

export default function CommentFrom() {
  const [activateButton, setActivateButton] = useState(style.button_off);

  return (
    <form className={style.CommentFrom_form}>
      <label className={`${style.CommentFrom_label} ${style.font16}`} htmlFor="comment">댓글달기</label>
      <textarea className={`${style.CommentFrom_input} ${style.font16}`} id="comment" placeholder='댓글을 입력해주세요.' />
      <div className={style.CommentFrom_button_cotaner}>
        <button className={`${style.CommentFrom_button} ${style.font16} ${activateButton}`}>등록</button>
      </div>
    </form>
  );
}
