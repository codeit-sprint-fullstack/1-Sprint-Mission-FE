let cookies: string[] = null;

export const setCookies = (_cookies: string[] = []) => {
  cookies = _cookies;
};

export const getCookies = () => {
  return cookies;
};
