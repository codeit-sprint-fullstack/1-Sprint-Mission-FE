import Image from "next/image";

export default function ProductInfo() {
  return (
    <div>
      <div>
        {"제품명"}
        <Image
          src={"/images/ic_vertical_point_3.svg"}
          width={24}
          height={24}
          alt="설정"
        />
      </div>
      {"가격"}
    </div>
  );
}
