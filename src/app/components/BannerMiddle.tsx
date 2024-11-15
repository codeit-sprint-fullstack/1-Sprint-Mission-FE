import Image from "next/image";
import classNames from "classnames";

export interface BannerMiddleProps {
  isLeftImage: boolean;
  imagePath: string;
  textSetWidth: string;
  topText: string;
  middleText: string;
  bottomText: string;
}

// 임시 반응형 css 미적용
export default function BannerMiddle({
  isLeftImage,
  imagePath,
  textSetWidth,
  topText,
  middleText,
  bottomText,
}: BannerMiddleProps) {
  const bannerMiddleClass = classNames(
    "w-full",
    "h-[72rem]",
    "flex",
    "flex-row",
    "mx-auto",
    "items-center"
  );
  const bannerBoxClass = classNames(
    "w-[98.8rem]",
    "h-[44.4em",
    "flex",
    isLeftImage ? "flex-row" : "flex-row-reverse",
    "gap-[6.4rem]",
    "mx-auto",
    "items-center",
    "justify-center"
  );
  const boxTextSetClass = classNames(
    "h-[23.8rem]",
    "mr-[0.7rem]",
    "flex",
    "flex-col"
  );
  const boxTopTextClass = classNames(
    "w-full",
    "h-[2.6rem]",
    "mb-[1.2rem]",
    "text-[1.8rem]",
    "font-bold",
    "leading-[2.6rem]",
    "text-blue-100"
  );
  const boxMiddleTextClass = classNames(
    "w-full",
    "h-[11.2rem]",
    "mb-[2.4rem]",
    "text-[4rem]",
    "font-bold",
    "leading-[5.6rem]"
  );
  const boxBottomTextClass = classNames(
    "w-full",
    "h-[6.4rem]",
    "text-[2.4rem]",
    "font-medium",
    "leading-[3.2rem]"
  );
  const imageFrameClass = classNames("w-[58.8rem]", "h-[44.4rem]", "relative");

  return (
    <div className={bannerMiddleClass}>
      <div className={bannerBoxClass}>
        <div className={boxTextSetClass} style={{ width: textSetWidth }}>
          <p className={boxTopTextClass}>{topText}</p>
          <p className={boxMiddleTextClass}>{middleText}</p>
          <p className={boxBottomTextClass}>{bottomText}</p>
        </div>
        <div className={imageFrameClass}>
          <Image
            src={imagePath}
            alt="탑 배너 이미지"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
