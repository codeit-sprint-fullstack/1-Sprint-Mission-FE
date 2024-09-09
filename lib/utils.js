export function formatDate(dateString) {
  const date = new Date(dateString);

  const MM = String(date.getUTCMonth() + 1).padStart(2, "0");
  const DD = String(date.getUTCDate()).padStart(2, "0");
  const YYYY = String(date.getUTCFullYear());
  return `${YYYY}.${MM}.${DD}`;
}
export function likeFormat(favoriteCount) {
  const likeCounts = Number(favoriteCount);

  if (likeCounts >= 9999) {
    return `9999+`;
  }

  return likeCounts;
}
