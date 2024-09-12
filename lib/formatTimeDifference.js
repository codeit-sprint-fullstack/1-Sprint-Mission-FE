// 시간 차이를 계산하는 함수
function formatTimeDifference(createdAt) {
  const now = new Date();
  const timeDifference = Math.floor((now - new Date(createdAt)) / 1000); // 초 단위 차이 계산

  if (timeDifference < 60) {
    return '방금 전';
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes}분 전`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(timeDifference / 86400);
    return `${days}일 전`;
  }
}

export default formatTimeDifference;
