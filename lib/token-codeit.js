export function setAccessToken(accessToken) {
  localStorage.setItem("codeit-accessToken", accessToken);
}

export function getAccessToken() {
  const accessToken = localStorage.getItem("codeit-accessToken");

  return accessToken;
}

export function deleteAccessToken() {
  localStorage.removeItem("codeit-accessToken");
}

// temp
export function setRefreshToken(refreshToken) {
  localStorage.setItem("codeit-refresh-token", refreshToken);
}

export function getRefreshToken() {
  return localStorage.getItem("codeit-refresh-token");
}
