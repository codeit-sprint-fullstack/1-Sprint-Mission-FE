/**
 * 주어진 날짜 문자열을 'YYYY. MM. DD' 형식으로 포맷팅하는 util도구
 * @param {string} dateString - 바꿀 날짜 문자열
 * @returns {string} 바뀐 날짜 문자열
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}. ${month}. ${day}`;
}
