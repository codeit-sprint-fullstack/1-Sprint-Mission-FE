import style from "./ProductTag.module.css";

export default function ProductTag() {
  const tags = [1, 2, 3, 4];
  return (
    <div className={style.contaner}>
      <div className={style.title}>상품 태그</div>
      <ui className={style.ProductTagUi}>
        {tags.map((tag) => (
          <li className={style.ProductTagLi}>{`#${"태그 내용"}`}</li>
        ))}
      </ui>
    </div>
  );
}
