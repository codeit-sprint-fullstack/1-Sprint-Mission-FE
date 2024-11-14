export function getAccessToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("codeit-accessToken");
  }
  return null;
}

export function setAccessToken(accessToken: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("codeit-accessToken", accessToken);
  }
}

export function deleteAccessToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("codeit-accessToken");
  }
}

// temp
export function setRefreshToken(refreshToken: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("codeit-refresh-token", refreshToken);
  }
}

export function getRefreshToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("codeit-refresh-token");
  }
  return null;
}
