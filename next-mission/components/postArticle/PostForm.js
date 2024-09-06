import { useState } from 'react';
import style from './PostForm.module.css'

export default function PostForm() {
    const [ activateButton, setActivateButton ] = useState(style.button_off)

  return (
    <form className={style.PostForm_form}>
      <div className={style.PostForm_subject}>
        <div className={style.PostForm_title}>게시글 쓰기</div>
        <button className={`${style.PostForm_button} ${style.font16} ${activateButton}`}>등록</button>
      </div>
      <label className={style.PostForm_label} htmlFor="title">*제목</label>
      <input className={`${style.PostForm_input} ${style.input_title} ${style.font16}`} id="title" placeholder='제목을 입력해주세요'/>
      <label className={style.PostForm_label} htmlFor="content">*내용</label>
      <input className={`${style.PostForm_input} ${style.input_contents} ${style.font16}`} id="content" placeholder='내용을 입력해주세요'/>
    </form>
  );
}
