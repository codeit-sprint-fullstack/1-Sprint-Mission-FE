import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

// 임시 반응형 css 미적용
export default function BannerTop() {
  const bannerTopClass = classNames(
    "w-full",
    "h-[54rem]",
    "flex",
    "flex-row",
    "mx-auto",
    "items-end"
  );
  const contentFrameClass = classNames(
    "w-[111rem]",
    "h-[34em]",
    "flex",
    "flex-row",
    "mx-auto",
    "items-center"
  );
  const textButtonSetClass = classNames(
    "w-[35.7rem]",
    "h-[26rem]",
    "mr-[0.7rem]"
  );
  const textClass = classNames(
    "w-[29.5rem]",
    "h-[11.2rem]",
    "mb-[3.2rem]",
    "text-[4rem]",
    "font-bold",
    "leading-[5.6rem]"
  );
  const buttonClass = classNames(
    "w-full",
    "h-[5.6rem]",
    "bg-no-repeat",
    "bg-center",
    "bg-cover",
    "bg-[url('/buttons/btn_to_products_page_357_56.svg')]"
  );
  const imageClass = classNames("w-[74.6rem]", "h-[34rem]", "relative");

  return (
    <div className={bannerTopClass}>
      <div className={contentFrameClass}>
        <div className={textButtonSetClass}>
          <p className={textClass}>일상의 모든 물건을 거래해 보세요</p>
          <Link href="/items">
            <button className={buttonClass} />
          </Link>
        </div>
        <div className={imageClass}>
          <Image
            src="/images/Img_home_top_746_340.svg"
            alt="탑 배너 이미지"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
