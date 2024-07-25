const URL = "https://panda-market-api.vercel.app/products";

export const getItems = async (order = "favorite") => {
  const res = await fetch(`${URL}?orderBy=${order}`);
  const data = res.json();
  return data;
};
