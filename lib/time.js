import { format, formatDistanceToNow } from "date-fns";
import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";

export function getFormatTimeByTimeZone(dbDate) {
  const utcDate = zonedTimeToUtc(dbDate, "UTC");
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = utcToZonedTime(utcDate, timeZone);
  const formattedDate = format(localDate, "yyyy. MM. dd");

  return formattedDate;
}

export function getLastTimeByTimeZone(dbDate) {
  const utcDate = zonedTimeToUtc(dbDate, "UTC");
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = utcToZonedTime(utcDate, timeZone);
  const timeAgo = formatDistanceToNow(localDate, { addSuffix: true });

  return timeAgo;
}
