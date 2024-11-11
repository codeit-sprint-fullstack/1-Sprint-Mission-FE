import { format, formatDistanceToNow } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

export function getFormatTimeByTimeZone(dbDate: Date): string {
  const utcDate = fromZonedTime(dbDate, "UTC");
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = toZonedTime(utcDate, timeZone);
  const formattedDate = format(localDate, "yyyy. MM. dd");

  return formattedDate;
}

export function getLastTimeByTimeZone(dbDate: Date): string {
  const utcDate = fromZonedTime(dbDate, "UTC");
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = toZonedTime(utcDate, timeZone);
  const timeAgo = formatDistanceToNow(localDate, { addSuffix: true });

  return timeAgo;
}
