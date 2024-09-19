import Image from "next/image";
import ProductInfo from "./ProductInfo";
import ProductIntroduction from "./ProductIntroduction";
import ProductTag from "./ProductTag";
import UserInfo from "./UserInfo";

export default function ProductParticularInfo() {
  return (
    <>
      <div>
        <Image
          src={"/images/img_default.svg"}
          width={486}
          height={486}
          alt="기본 이미지"
        />
        <div>
          <ProductInfo />
          <ProductIntroduction />
          <ProductTag />
          <UserInfo />
        </div>
      </div>
      <div />
    </>
  );
}
