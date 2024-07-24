function Product({ itemValues }) {
  const { imgUrl, title, price, favorite } = itemValues;
  return (
    <div className="productitem">
      <img src={imgUrl} alt="상품이미지"></img>
      <p>{title}</p>
      <p>{price}</p>
      <img alt="좋아요이미지">{favorite}</img>
    </div>
  );
}
