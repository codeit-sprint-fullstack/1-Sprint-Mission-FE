// src/components/BestProduct.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css";

export function BestProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://panda-market-api.vercel.app/products",
          {
            params: {
              // API 서버가 지원하는 경우 쿼리 파라미터 추가
              orderBy: "favorite", // 정렬 기준
              pageSize: 4, // 최대 4개 항목
            },
          }
        );
        console.log(response.data); // 데이터 구조를 콘솔에 출력

        // 응답 데이터에서 list 속성을 확인하고 배열을 추출
        const data = response.data.list || []; // list 속성에서 배열 가져오기

        if (Array.isArray(data)) {
          // 데이터가 올바르다면 상태를 업데이트
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
  }, []);

  return (
    <>
      {products.length === 0 ? (
        <p>No products available</p> // 제품이 없을 때 표시할 내용
      ) : (
        products.map((item) => (
          <div key={item.id}>
            <img
              className="bestProduct"
              src={item.images[0] || "No image"} // 이미지 배열의 첫 번째 요소 사용
              alt={item.name || "Product image"}
            />
            <p className="itemName">{item.name || "No name"}</p>
            <p className="itemPrice">{item.price || "No price"} 원</p>
            <p className="itemFavoriteCnt">
              ♡ {item.favoriteCount || "No likes"}
            </p>
          </div>
        ))
      )}
    </>
  );
}

export function SellProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://panda-market-api.vercel.app/products",
          {
            params: {
              // API 서버가 지원하는 경우 쿼리 파라미터 추가
              orderBy: "recent", // 정렬 기준
            },
          }
        );
        console.log(response.data); // 데이터 구조를 콘솔에 출력

        // 응답 데이터에서 list 속성을 확인하고 배열을 추출
        const data = response.data.list || []; // list 속성에서 배열 가져오기

        if (Array.isArray(data)) {
          // 데이터가 올바르다면 상태를 업데이트
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
  }, []);

  return (
    <>
      {products.length === 0 ? (
        <p>No products available</p> // 제품이 없을 때 표시할 내용
      ) : (
        products.map((item) => (
          <div key={item.id}>
            <img
              className="sellProduct"
              src={item.images[0] || "No image"} // 이미지 배열의 첫 번째 요소 사용
              alt={item.name || "Product image"}
            />
            <p className="itemName">{item.name || "No name"}</p>
            <p className="itemPrice">{item.price || "No price"} 원</p>
            <p className="itemFavoriteCnt">
              ♡ {item.favoriteCount || "No likes"}
            </p>
          </div>
        ))
      )}
    </>
  );
}
