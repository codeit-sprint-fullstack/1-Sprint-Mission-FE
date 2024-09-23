export function setRecentUserId(recentUserId) {
  localStorage.setItem("panda-user-id", recentUserId);
}

export function getRecentUserId() {
  return localStorage.getItem("panda-user-id");
}
