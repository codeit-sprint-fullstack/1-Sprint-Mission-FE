import Image from "next/image";
import { postProduct } from "./api/products";
export default function Main() {
  const data = {
    images: [
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MTdfMjM4%2FMDAxNzIzODYzMjMzNzI5.T4Z4U_jsixqJL4UHA0dxe_rkb6iw5nvXX6UqVJjwAtgg.E_U2VriqT8_jUK_DQWeP_0kbMlJ23L937VmBfVqH-I0g.PNG%2F20240817_095427.png&type=sc960_832",
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
          width: "100px",
          height: "50px",
          backgroundColor: "black",
          border: "none",
          borderRadius: "10px",
          color: "white",
        }}
        onClick={() => postProduct(data)}
      >
        제품 등록
      </button>
    </div>
  );
}
