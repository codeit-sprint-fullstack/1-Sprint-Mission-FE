import { DateTime } from "luxon";
import { LAST_TIME, DATE } from "../constants/date";

import style from "./date.module.css";

export function Date({ type, date = "2024.09.06" }) {
  const dateClass = `flex flex-row items-center font-normal ${style.date}`;
  const lastTimeClass = `flex flex-row items-center font-normal ${style["last-time"]}`;

  let result = undefined;

  if (type === LAST_TIME) {
    const localDate = DateTime.fromISO(dbDate, { zone: "UTC" }).setZone(
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const dateText = localDate.toFormat("yyyy. MM. dd");
    result = <div className={lastTimeClass}>{dateText}</div>;
  } else {
    const localDate = DateTime.fromISO(dbDate, { zone: "UTC" }).setZone(
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const dateText = localDate.toRelative(); // "3 hours ago" 등으로 표시
    result = <div className={dateClass}>{dateText}</div>;
  }

  return result;
}

export default Date;
