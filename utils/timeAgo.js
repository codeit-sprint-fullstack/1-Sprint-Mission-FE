export const timeAgo = (date) => {
  const now = new Date();
  const createdAt = new Date(date);
  const timeDiff = (now - createdAt) / 1000;

  const seconds = Math.floor(timeDiff);
  const minutes = Math.floor(timeDiff / 60);
  const hours = Math.floor(timeDiff / 3600);
  const days = Math.floor(timeDiff / (3600 * 24));

  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return `${seconds + 1}초 전`;
};
