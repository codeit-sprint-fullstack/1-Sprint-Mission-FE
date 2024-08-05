const URL = "https://one-sprint-mission-be.onrender.com";

export const getItems = async (page = 1, limit = 10, search = "") => {
  try {
    const res = await fetch(
      `${URL}?page=${page}&limit=${limit}&search=${search}`
    );
    if (!res.ok) {
      throw new Error(res.status);
    }
    const data = await res.json();
    console.log("API Response:", data); // API check
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
