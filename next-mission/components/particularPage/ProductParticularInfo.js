import Image from "next/image";
import ProductInfo from "./ProductInfo";
import ProductIntroduction from "./ProductIntroduction";
import ProductTag from "./ProductTag";
import UserInfo from "./UserInfo";
import style from './ProductParticularInfo.module.css'

export default function ProductParticularInfo() {
  return (
    <>
      <div className={style.contaner}>
        <Image
          src={"/images/img_default.svg"}
          width={486}
          height={486}
          alt="기본 이미지"
        />
        <div className={style.infoBox}>
          <ProductInfo />
          <ProductIntroduction />
          <ProductTag />
          <UserInfo />
        </div>
      </div>
      <div className={style.underline}/>
    </>
  );
}
