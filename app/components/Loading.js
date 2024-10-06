import Image from "next/image";
import classNames from "classnames";

export default function Loading() {
  const loadingFrameClass = classNames(
    "fixed",
    "w-pc-content",
    "z-40",
    "tablet:w-tablet-content",
    "mobile:w-mobile-content"
  );

  return (
    <a className={loadingFrameClass}>
      <img
        className="loading-spinner"
        width="12rem"
        height="6rem"
        alt="로딩 이미지"
      />
    </a>
  );
}
