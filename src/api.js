const URL = "https://one-sprint-mission-be.onrender.com/products";

export const getItems = async (page = 1, pageSize = 10, keyword = "") => {
  try {
    const res = await fetch(
      `${URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    );
    if (!res.ok) {
      throw new Error(res.status);
    }
    const data = await res.json();
    console.log("API Response:", data); // API check
    return data;
  } catch (error) {
    console.log(error);
    return { totalProducts: 0, products: [] };
  }
};

export const postItem = async (productData) => {
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!res.ok) {
      throw new Error(res.status);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
