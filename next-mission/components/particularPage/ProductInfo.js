import Image from "next/image";
import DropDown from "./DropDown";
import style from "./ProductInfo.module.css";

export default function ProductInfo() {
  return (
    <div className={style.contaner}>
      <div className={style.productName}>
        {"제품명"}
        <Image
          className={style.settingButton}
          src={"/images/ic_vertical_point_3.svg"}
          width={24}
          height={24}
          alt="설정"
        />
      </div>
      <div className={style.price}>{"가격"}</div>
      <div className={style.dropDwonLocation}>
        <DropDown />
      </div>
    </div>
  );
}
