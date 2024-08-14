export const createProduct = async (productData) => {
  try {
    const response = await fetch("https://thrift-shop.onrender.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Failed to submit form: " + JSON.stringify(errorData));
    }

    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
