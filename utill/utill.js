export const getTimeDifference = (createdAt) => {
  const now = new Date(); // 현재 시간
  const createdDate = new Date(createdAt); // createdAt을 Date 객체로 변환

  const diffInMs = now - createdDate; // 밀리초 차이 계산
  const diffInMinutes = Math.floor(diffInMs / 1000 / 60); // 분 차이
  const diffInHours = Math.floor(diffInMinutes / 60); // 시간 차이
  const diffInDays = Math.floor(diffInHours / 24); // 일 차이

  if (diffInMinutes < 1) {
    return "방금 전";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else {
    return `${diffInDays}일 전`;
  }
};
