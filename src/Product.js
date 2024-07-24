import { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css";

export function useFetchProducts(params) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://panda-market-api.vercel.app/products",
          { params }
        );
        const data = response.data.list || [];
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Response data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  return { products, loading };
}
