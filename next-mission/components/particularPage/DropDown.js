import style from './DropDown.module.css'

export default function DropDown() {
  return (
    <div className={style.contaner}>
      <div className={style.dropdoenText}>수정하기</div>
      <div className={style.dropdoenText}>삭제하기</div>
    </div>
  );
}
