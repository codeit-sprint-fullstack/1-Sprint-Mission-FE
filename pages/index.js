import Image from "next/image";
import { postProduct } from "./api/products";
export default function Main() {
  const data = {
    images: [
      "https://i.namu.wiki/i/Trhh3NbX78ZqUJyFblACvejsfPNdAXXN8jQtPo10nSVq7Bk1ZvDKB9d1balCxMLeWXDbZ8U_R1XWhuIwI1dVFA.svg",
    ],
    price: 1000,
    tags: ["AI", "IT"],
    description: "검색하지말고 질문하세요! 간단합니다!!",
    name: "GPT",
  };
  return (
    <div>
      <button
        style={{
          marginTop: "300px",
          marginLeft: "300px",
          width: "200px",
          height: "100px",
          backgroundColor: "black",
          border: "none",
          borderRadius: "10px",
          color: "white",
          fontSize: "20px",
        }}
        onClick={() => postProduct(data)}
      >
        중고마켓 상품등록
      </button>
    </div>
  );
}
