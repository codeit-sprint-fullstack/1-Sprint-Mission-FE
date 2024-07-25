const URL = "https://panda-market-api.vercel.app/products";

export const getItems = async (page = 1, pageSize = 10, order = "favorite") => {
  try {
    const res = await fetch(
      `${URL}?page=${page}&pageSize=${pageSize}&orderBy=${order}`
    );
    if (!res.ok) {
      throw new Error(res.status);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
