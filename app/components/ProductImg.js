import Image from "next/image";

import style from "./product-img.module.css";

export function ProductImg({ imgUrl }) {
  // 임시로 이미지가 없을 때 처리 : 이미지가 없는 경우 + 실제 이미지 파일이 없을 때 처리하도록
  if (!imgUrl) {
    imgUrl = "images/no_image.svg";
  }

  const img = (
    <div className={style["img-frame"]}>
      <Image src={imgUrl} alt="상품 이미지" fill priority />
    </div>
  );

  return img;
}
