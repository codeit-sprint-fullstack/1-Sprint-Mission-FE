import Image from "next/image";
import classNames from "classnames";

// 임시 반응형 css 미적용
export default function BannerBottom() {
  const bannerbottomClass = classNames(
    "w-full",
    "h-[54rem]",
    "flex",
    "flex-row",
    "mx-auto",
    "items-end"
  );
  const contentFrameClass = classNames(
    "w-[111rem]",
    "h-[39.7rem]",
    "flex",
    "flex-row",
    "mx-auto",
    "items-center"
  );
  const textClass = classNames(
    "w-[29.5rem]",
    "h-[17.2rem]",
    "mr-[6.9rem]",
    "text-[4rem]",
    "font-bold",
    "leading-[5.6rem]"
  );
  const imageClass = classNames("w-[74.6rem]", "h-[39.7rem]", "relative");

  return (
    <div className={bannerbottomClass}>
      <div className={contentFrameClass}>
        <p className={textClass}>믿을 수 있는 판다마켓 중고 거래</p>
        <div className={imageClass}>
          <Image
            src="/images/Img_home_bottom_746_397.svg"
            alt="보톰 배너 이미지"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
