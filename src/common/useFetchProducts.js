import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchProducts({ pageSize = 10, page = 1, keyword = "" }) {
  const baseUrl = "https://thrift-shop.onrender.com/products";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = { limit: pageSize, page, search: keyword };
        const response = await axios.get(baseUrl, { params });
        const data = response.data.products || [];
        const totalItems = response.data.total || 0;

        setProducts(data);
        setTotalCount(totalItems);
        setTotalPages(Math.ceil(totalItems / pageSize));
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, pageSize, keyword]);

  return { products, loading, totalCount, totalPages };
}
