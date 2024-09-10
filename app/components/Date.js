import { DateTime } from "luxon";
import { LAST_TIME, DATE } from "../constants/date";

import style from "./date.module.css";

export function Date({ type, dbDate }) {
  const dateClass = `flex flex-row items-center font-normal ${style.date}`;
  const lastTimeClass = `flex flex-row items-center font-normal ${style["last-time"]}`;

  let result = undefined;

  if (type === DATE) {
    const localDate = DateTime.fromISO(dbDate, { zone: "UTC" }).setZone(
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const dateText = localDate.toFormat("yyyy. MM. dd");
    result = <div className={lastTimeClass}>{dateText}</div>;
  } else {
    const localDate = DateTime.fromISO(dbDate, { zone: "UTC" }).setZone(
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const dateText = localDate.toRelative();
    result = <div className={dateClass}>{dateText}</div>;
  }

  return result;
}

export default Date;
