export const formatDate = (dateString) => {
  if (!dateString) return new Date().toLocaleString();

  return new Date(dateString).toLocaleString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

