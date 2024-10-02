export const timeAgo = (date) => {
  const now = new Date();
  const createdAt = new Date(date);
  const timeDiffInSeconds = Math.floor((now - createdAt) / 1000);

  const times = [
    { unit: "일", value: Math.floor(timeDiffInSeconds / (3600 * 24)) },
    {
      unit: "시간",
      value: Math.floor((timeDiffInSeconds % (3600 * 24)) / 3600),
    },
    { unit: "분", value: Math.floor((timeDiffInSeconds % 3600) / 60) },
    { unit: "초", value: timeDiffInSeconds % 60 },
  ];

  const timeAgoString = times.find((time) => time.value > 0);
  return timeAgoString
    ? `${timeAgoString.value}${timeAgoString.unit} 전`
    : "방금 전";
};
