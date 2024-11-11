export function setAccessToken(accessToken: string) {
  localStorage.setItem("codeit-accessToken", accessToken);
}

export function getAccessToken(): string | null {
  return localStorage.getItem("codeit-accessToken");
}

export function deleteAccessToken(): void {
  localStorage.removeItem("codeit-accessToken");
}

// temp
export function setRefreshToken(refreshToken: string) {
  localStorage.setItem("codeit-refresh-token", refreshToken);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem("codeit-refresh-token");
}
