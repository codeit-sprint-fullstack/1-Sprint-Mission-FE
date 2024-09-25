"use client";

import { useState, useEffect } from "react";
import { getProduct } from "@/lib/api-codeit-product";

export default function ProductPage({ params }) {
  const { productId } = params;
  const [userId, setUserId] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [ownerId, setOwnerId] = useState("");
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [createdDate, setCreatedDate] = useState("2024-09-25T04:49:03.316Z");
  const [ownerNickname, setOwnerNickname] = useState("");
  const [isFavorite, setIsFavorite] = useState("");

  useEffect(() => {
    getProduct({ productId: productId })
      .then((data) => {
        setUserId(data.id);
        setProductName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setTags(data.tags);
        setImages(data.images);
        setOwnerId(data.ownerId);
        setFavoriteCount(data.favoriteCount);
        setCreatedDate(data.createdDate);
        setOwnerNickname(data.ownerNickname);
        setIsFavorite(data.isFavorite);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //   try {
  //     const product = await getProduct({ productId: productId });

  //     product_id = product.id;
  //     description = product.description;
  //   } catch (err) {
  //     console.error(err);
  //   }

  //   const product = {
  //     id: 259,
  //     name: "GPT",
  //     description: "검색하지말고 질문하세요! 간단합니다!!",
  //     price: 1000,
  //     tags: ["AI", "IT"],
  //     images: [
  //       "https://i.namu.wiki/i/Trhh3NbX78ZqUJyFblACvejsfPNdAXXN8jQtPo10nSVq7Bk1ZvDKB9d1balCxMLeWXDbZ8U_R1XWhuIwI1dVFA.svg",
  //     ],
  //     ownerId: 187,
  //     favoriteCount: 2,
  //     createdAt: "2024-09-25T04:49:03.316Z",
  //     updatedAt: "2024-09-25T06:20:17.109Z",
  //     ownerNickname: "aaaa11",
  //     isFavorite: false,
  //   };

  return (
    <div className="main">{/* <ProductDetail productId={productId} /> */}</div>
  );
}
