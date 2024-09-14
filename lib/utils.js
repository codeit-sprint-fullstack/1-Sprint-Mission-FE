export function formatDate(dateString) {
  const date = new Date(dateString);

  const MM = String(date.getUTCMonth() + 1).padStart(2, "0");
  const DD = String(date.getUTCDate()).padStart(2, "0");
  const YYYY = String(date.getUTCFullYear());
  return `${YYYY}.${MM}.${DD}`;
}

export function formatLikes(likeCount) {
  const numOfLikes = likeCount ? parseInt(likeCount) : 0;

  if (numOfLikes >= 9999) {
    return `9999+`;
  }
  return numOfLikes;
}

export function calculateTimeAgo(dateString) {
  const current = new Date();
  const createdAt = new Date(dateString);
  const timeDiff = current - createdAt;

  const diffInMinutes = Math.floor(timeDiff / (1000 * 60));
  const diffInHours = Math.floor(timeDiff / (1000 * 60 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else {
    return formatDate(dateString);
  }
}
