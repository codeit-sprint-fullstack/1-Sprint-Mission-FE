import style from './ProductIntroduction.module.css'

export default function ProductIntroduction() {
  return (
    <div className={style.contaner}>
      <div className={style.title}>상품 소개</div>
      <div className={style.content}>{"상품 소개 상품 소개 상품 소개 상품 소개 상품 소개 상품 소개 상품 소개"}</div>
    </div>
  );
}
