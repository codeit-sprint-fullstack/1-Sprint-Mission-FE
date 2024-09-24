export default function ProductPreview({
  img,
  imgClass,
  title,
  price,
  favorite = false,
}) {
  const [validImg, setValidImg] = useState(no_image);

  const handleFavoriteButtonClick = () => {
    alert("관심목록 추가 : 로그인이 필요합니다");
  };

  const priceText = price.toLocaleString("en-US") + "원";

  useEffect(() => {
    const image = new Image();

    const handleImgLoad = () => {
      setValidImg(img);
    };
    const handleImgError = () => {
      setValidImg(no_image);
    };

    image.addEventListener("load", handleImgLoad);
    image.addEventListener("Error", handleImgError);

    image.src = img;

    return () => {
      image.removeEventListener("load", handleImgLoad);
      image.removeEventListener("Error", handleImgError);
    };
  }, [img]);

  return (
    <>
      <div className={imgClass}>
        <img className="product__img" src={validImg} alt="상품 이미지" />
      </div>
      <div className="flex-col justify-space-between product__text">
        <div className="Text-md Medium text-overflow-ellipsis">{title}</div>
        <div className="Text-lg Bold text-overflow-ellipsis">{priceText}</div>
        <div className="flex-row">
          <Button
            className="favoriteButton"
            onClick={handleFavoriteButtonClick}
          />
          <p className="margin-left4 Text-xs-line-height18 Medium">
            {favorite}
          </p>
        </div>
      </div>
    </>
  );
}
