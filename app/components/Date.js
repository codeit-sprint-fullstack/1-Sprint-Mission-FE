import { DateTime } from "luxon";
import classNames from "classnames";

export default function Date({ dbDate }) {
  const dateClass = classNames(
    "flex",
    "flex-row",
    "font-normal",
    "text-md",
    "text-nowrap",
    "leading-24",
    "text-gray-400"
  );

  const localDate = DateTime.fromISO(dbDate, { zone: "UTC" }).setZone(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const dateText = localDate.toFormat("yyyy. MM. dd");

  return <div className={dateClass}>{dateText}</div>;
}
