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
    <div className={loadingFrameClass}>
      <img className="loading-spinner" />
    </div>
  );
}
