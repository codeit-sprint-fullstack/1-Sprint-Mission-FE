import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export const formatDate = (date: Date | string) => {
  const d = new Date(date);
  const now = Date.now();
  const diff = now - d.getTime();

  if (diff < 24 * 60 * 60 * 1000) {
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }

  if (diff < 7 * 24 * 60 * 60 * 1000) {
    return format(d, "EEEE a h:mm", { locale: ko });
  }

  if (diff < 365 * 24 * 60 * 60 * 1000) {
    return format(d, "M월 d일", { locale: ko });
  }

  return format(d, "yyyy년 M월 d일", { locale: ko });
};
