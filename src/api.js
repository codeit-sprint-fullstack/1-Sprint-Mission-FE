const URL = "https://panda-market-api.vercel.app/products";

export const getItems = async () => {
  const res = await fetch(URL);
  const data = res.json();
  return data;
};
