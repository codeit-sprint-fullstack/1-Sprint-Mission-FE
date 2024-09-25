import FleaMarketDetail from "./FleaMarketDetail";
import { getProducts } from "@/lib/api-codeit-product";
import classNames from "classnames";

import { ORDER_BY_RECENT, ORDER_BY } from "../constants/sort";

export default async function FleaMarketPage() {
  // const data = await getProducts({
  //   page: 1,
  //   pageSize: 10,
  //   orderBy: ORDER_BY[ORDER_BY_RECENT],
  // });

  const data = {
    list: [
      {
        id: 259,
        name: "GPT",
        description: "검색하지말고 질문하세요! 간단합니다!!",
        price: 1000,
        tags: ["AI", "IT"],
        images: [
          "https://i.namu.wiki/i/Trhh3NbX78ZqUJyFblACvejsfPNdAXXN8jQtPo10nSVq7Bk1ZvDKB9d1balCxMLeWXDbZ8U_R1XWhuIwI1dVFA.svg",
        ],
        ownerId: 187,
        favoriteCount: 2,
        createdAt: "2024-09-25T04:49:03.316Z",
        updatedAt: "2024-09-25T06:20:17.109Z",
      },
      {
        id: 227,
        name: "인절미",
        description:
          "고소하구..~ 달달하구..~ 천상의 맛이야!\n닥근닥근한 떡 팔아요!\n(가래떡도 있어요)",
        price: 3000,
        tags: ["인절미", "떡"],
        images: [
          "https://cafe24.poxo.com/ec01/josunyega2/1A66J+oWTqAze9jtV45BSgFLTBtqYNimpBKI0qFIbW7eo2N1yIcHZLELC2TRfYb2PKeQtiZPnez7m6avYaitOw==/_/web/product/big/201910/99498085a0a47ba5062e46f9e2e540c5.jpg",
        ],
        ownerId: 199,
        favoriteCount: 2,
        createdAt: "2024-09-23T12:04:49.273Z",
        updatedAt: "2024-09-25T05:37:36.848Z",
      },
      {
        id: 226,
        name: "푸바오 찾아 떠나는 청두여행",
        description:
          "제 딸 푸바오가 있는 쓰촨성 청두로 푸덕푸덕 날아가 보세요! 와룡 판다 기지만 방문하여 여유롭게 제 딸 푸바오를 볼 수 있는 일정입니다. 항공권은 별도입니다.",
        price: 599000,
        tags: ["푸바오", "러바오", "아이바오"],
        images: [
          "https://image.hanatour.com/usr/cms/resize/800_0/2024/08/11/10000/687449d1-4e4f-4952-b6d1-5342465880f5.jpg",
        ],
        ownerId: 177,
        favoriteCount: 24,
        createdAt: "2024-09-23T11:25:06.306Z",
        updatedAt: "2024-09-24T01:38:16.831Z",
      },
      {
        id: 220,
        name: "고퍼 인형",
        description:
          "못생긴 마스코트로는 어디가서 밀리지않는 golang의 마스코트 gopher 인형입니다",
        price: 50000,
        tags: ["고퍼", "마스코트", "인형", "못생김"],
        images: [
          "https://store.ardanlabs.com/cdn/shop/products/teal-gopher-plushie_1445x.jpg?v=1661800765",
        ],
        ownerId: 182,
        favoriteCount: 2,
        createdAt: "2024-09-23T07:50:03.690Z",
        updatedAt: "2024-09-25T06:17:02.011Z",
      },
      {
        id: 199,
        name: "아이폰 16 pro",
        description: "따끈한 아이폰!",
        price: 1290000,
        tags: [],
        images: [
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/98/1726837429259/iphone.jpg",
        ],
        ownerId: 98,
        favoriteCount: 7,
        createdAt: "2024-09-20T13:03:49.397Z",
        updatedAt: "2024-09-25T04:37:35.852Z",
      },
      {
        id: 198,
        name: "갤럭시 링 골드",
        description: "갤럭시 링 골드 팝니다~ d",
        price: 500000,
        tags: ["스마트링"],
        images: [
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/107/1726730781162/ring.jpg",
        ],
        ownerId: 107,
        favoriteCount: 4,
        createdAt: "2024-09-19T07:22:29.075Z",
        updatedAt: "2024-09-25T04:38:54.745Z",
      },
      {
        id: 197,
        name: "갤럭시 버즈3",
        description: "버즈3 입니다~",
        price: 500000,
        tags: ["이어폰"],
        images: [
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/107/1726730417522/buds.jpg",
        ],
        ownerId: 107,
        favoriteCount: 6,
        createdAt: "2024-09-19T07:20:17.749Z",
        updatedAt: "2024-09-23T02:37:01.449Z",
      },
      {
        id: 190,
        name: "갤럭시워치 6 팝니다~~",
        description: "하자 없어요~~",
        price: 400000,
        tags: ["갤럭시"],
        images: [
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/107/1726720883608/watch.jpg",
        ],
        ownerId: 107,
        favoriteCount: 2,
        createdAt: "2024-09-19T04:41:23.772Z",
        updatedAt: "2024-09-24T09:39:58.809Z",
      },
      {
        id: 188,
        name: "쿠쿠 밥솥",
        description: "쿠쿠하세요~~",
        price: 310000,
        tags: ["쿠쿠쿠쿠쿸"],
        images: [
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png",
        ],
        ownerId: 92,
        favoriteCount: 1,
        createdAt: "2024-09-01T15:56:53.858Z",
        updatedAt: "2024-09-25T04:40:06.973Z",
      },
      {
        id: 153,
        name: "토스터",
        description: "토스트를 만들기 위한 토스터~",
        price: 19000,
        tags: ["토스터"],
        images: [
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/72/1724836584916/2.jpg",
        ],
        ownerId: 72,
        favoriteCount: 1,
        createdAt: "2024-08-27T12:26:55.629Z",
        updatedAt: "2024-09-24T01:18:01.180Z",
      },
    ],
    totalCount: 147,
  };

  const { list = [], totalCount = 0 } = data;

  const mainClass = classNames(
    "mt-header",
    "pt-4rem",
    "mx-auto",
    "w-pc-content",
    "tablet:w-tablet-content",
    "mobile:w-mobile-content"
  );

  return (
    <div className={mainClass}>
      <FleaMarketDetail initList={list} initTotalCount={totalCount} />
    </div>
  );
}
