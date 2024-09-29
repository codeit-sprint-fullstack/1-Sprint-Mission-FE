export default function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const date = new Date(dateString);
  return date
    .toLocaleDateString("ko-KR", options)
    .replace(/\./g, "")
    .replace(/ /g, ". ");
}
