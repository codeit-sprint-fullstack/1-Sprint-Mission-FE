import { DateTime } from "luxon";

import classNames from "classnames";

interface LastTimeProps {
  dbDate: string;
}

export default function LastTime({ dbDate }: LastTimeProps) {
  const lastTimeClass = classNames(
    "flex",
    "flex-row",
    "items-center",
    "text-xs",
    "leading-18",
    "font-normal",
    "text-gray-400"
  );

  const localDate = DateTime.fromISO(dbDate, { zone: "UTC" }).setZone(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const dateText = localDate.toRelative();

  return <div className={lastTimeClass}>{dateText}</div>;
}
