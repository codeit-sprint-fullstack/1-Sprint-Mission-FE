export function dateFormatYYYYMMDD(value) {
  const date = new Date(value);
  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formattedDate;
}
