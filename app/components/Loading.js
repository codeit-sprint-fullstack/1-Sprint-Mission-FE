import classNames from "classnames";

import style from "./loading.module.css";

export default function Loading() {
  const loadingFrameClass = classNames(
    "fixed",
    // "top-loading",
    "w-pc-content",
    "z-40",
    "tablet:w-tablet-content",
    "mobile:w-mobile-content"
  );
  const loadingSpinnerClass = classNames(
    "block",
    "m-auto",
    "w-loading",
    "h-loading",
    style["loading-spinner"]
  );
  return (
    <a className={loadingFrameClass}>
      <img className={loadingSpinnerClass} />
    </a>
  );
}
