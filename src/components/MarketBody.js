import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles/marketBody.css";
import no_image from "../assets/images/no_image.svg";
import { isImageUrl, isImageFileText, isImageLoaded } from "../utils/utils";
import Input from "./Input";
import Button from "./Button";
// import DropDown from "./DropDown";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "./DropDown";
import Pagination from "./Pagination";

const PRODUCT_API_ADDRESS = "https://panda-market-api.vercel.app";

const instance = axios.create({
  baseURL: PRODUCT_API_ADDRESS,
  header: {
    "Content-Type": "application/json",
  },
});

const PATH = "/products";

// index 0 : 좋아요순 1 : 최신순
const ORDER_BY_RECENT = 0;
const ORDER_BY_FAVORITE = 1;
const ORDER_BY = ["recent", "favorite"];

// index 0 : PC 1 : TABLET 2 : MOBILE
let device = 0;
const PAGE_SIZE = [10, 6, 4];
const BEST_PAGE_SIZE = [4, 2, 1];

let recentPage = 1;

function Product({ img, imgClass, title, price, favorite }) {
  const [validImg, setValidImg] = useState(no_image);

  const handleFavoriteButtonClick = () => {
    alert("관심목록 추가 : 로그인이 필요합니다");
  };

  // 미션5용 서버의 CORS에 막혀 임시 주석 처리
  // useEffect(() => {
  //     if(isImageFileText(img))
  //     {
  //         isImageUrl(img)
  //             .then(isImage => {
  //                 setValidImg(isImage ? img : no_image);
  //             });
  //     }
  //     else
  //     {
  //         setValidImg(no_image);
  //     }
  // }, [img]);

  const priceText = price.toLocaleString("en-US") + "원";

  useEffect(() => {
    const image = new Image();

    const handleImgLoad = () => {
      setValidImg(img);
    };
    const handleImgError = () => {
      setValidImg(no_image);
    };

    image.addEventListener("load", handleImgLoad);
    image.addEventListener("Error", handleImgError);

    image.src = img;

    return () => {
      image.removeEventListener("load", handleImgLoad);
      image.removeEventListener("Error", handleImgError);
    };
  }, [img]);

  return (
    <>
      <div className={imgClass}>
        <img className="product__img" src={validImg} alt="상품 이미지" />
      </div>
      <div className="flex-col justify-space-between product__text">
        <div className="Text-md Medium text-overflow-ellipsis">{title}</div>
        <div className="Text-lg Bold text-overflow-ellipsis">{priceText}</div>
        <div className="flex-row">
          <Button
            className="favoriteButton"
            onClick={handleFavoriteButtonClick}
          />
          <a className="margin-left4 Text-xs-line-height18 Medium">
            {favorite}
          </a>
        </div>
      </div>
    </>
  );
}

function Products({ device }) {
  const [products, setProducts] = useState([]);
  const [pageArray, setPageArray] = useState([]);
  const [searchText, setSearchText] = useState("");

  let totalCount = 0;

  const handleRegistrationButtonClick = () => {
    alert("상품 등록 : 로그인이 필요합니다");
  };

  const sortByRecent = () => {
    console.log("최신순");
    getProducts(1, ORDER_BY_RECENT);
  };

  const sortByFavorite = () => {
    console.log("좋아요순");
    getProducts(1, 1);
  };

  const productSortDropItems = [
    { id: 0, label: "최신순", func: sortByRecent },
    { id: 1, label: "좋아요순", func: sortByFavorite },
  ];

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleInputEnter = () => {
    getProducts(1, 0, searchText);
  };

  const handlePageMove = (pageNum) => {
    console.log("click : " + pageNum);
    recentPage = pageNum;
    getProducts(pageNum, "FAVORITE");
  };

  function getProducts(page = 1, order = 0, search = "") {
    const params = {
      page: page,
      pageSize: PAGE_SIZE[device],
      orderBy: ORDER_BY[order],
      keyword: search,
    };

    instance
      .get(PATH, { params })
      .then((res) => {
        setProducts(res.data.list);
        totalCount = res.data.totalCount;
        const maxPageNum = Math.ceil(totalCount / PAGE_SIZE[device]);

        const newPageArray = [];
        for (let i = 1; i <= maxPageNum; i++) {
          newPageArray.push(i);
        }
        setPageArray(newPageArray);
      })
      .catch((err) => console.log(err.name));
  }

  useEffect(() => {
    getProducts();
  }, [device]);

  return (
    <div className="main__section-products">
      <div className="flex-row justify-space-between">
        <a className="Text-xl Bold">판매 중인 상품</a>
        <div className="grid main__section-tools">
          <Input
            onChange={handleInputChange}
            onEnter={handleInputEnter}
            inputClassName="Text-lg Regular input-search"
            imgClassName="img-input-search"
          >
            검색할 상품을 입력해주세요
          </Input>
          <Button
            className="registrationButton"
            onClick={handleRegistrationButtonClick}
          />
          {
            /* <DropDown dropItems={productSortDropItems}>
            {productSortDropItems[0].label}
          </DropDown> */
            <Dropdown>
              <DropdownToggle>최신순</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={sortByRecent}>최신순</DropdownItem>
                <DropdownItem onClick={sortByFavorite}>좋아요순</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          }
        </div>
      </div>
      <div className="main__products-frame">
        {products.map((item) => (
          <article
            key={item.id}
            className="flex-col justify-space-between main__product-article"
          >
            <Product
              img={item.images[0]}
              imgClass="product__img-frame"
              title={item.name}
              price={item.price}
              favorite={item.favoriteCount}
            />
          </article>
        ))}
      </div>
      <div>
        <Pagination
          className="main__products-pagination"
          pageArray={pageArray}
          recentPage={recentPage}
          onClick={handlePageMove}
        />
      </div>
    </div>
  );
}

function BestProducts({ device, order }) {
  const [bestProducts, setBestProducts] = useState([]);

  function getBestProdudts() {
    const params = {
      page: 1,
      pageSize: BEST_PAGE_SIZE[device],
      orderBy: ORDER_BY[order],
    };

    instance
      .get(PATH, { params })
      .then((res) => setBestProducts(res.data.list))
      .catch((err) => console.log(err.name));
  }

  useEffect(() => {
    getBestProdudts();
  }, [device]);

  return (
    <div className="main__section-best-products">
      <div className="Text-xl Bold">베스트 상품</div>
      <div className="main__best-products-frame">
        {bestProducts.map((item) => (
          <article
            key={item.id}
            className="flex-col justify-space-between main__best-product-article"
          >
            <Product
              img={item.images[0]}
              imgClass="product-best__img-frame"
              title={item.name}
              price={item.price}
              favorite={item.favoriteCount}
            />
          </article>
        ))}
      </div>
    </div>
  );
}

export function MarketBody() {
  const [device, setDevice] = useState(0);

  window.addEventListener("resize", (e) => {
    if (375 <= window.innerWidth && window.innerWidth < 744) {
      /* ===== Mobile-width : 375px ~ 743px ====== */
      setDevice(2);
    } else if (744 <= window.innerWidth && window.innerWidth < 1200) {
      /* ===== Tablet - width : 744px ~ 1199px ===== */
      setDevice(1);
    } else {
      /* ===== PC - width : 1200px ~ ===== */
      setDevice(0);
    }
  });

  return (
    <main className="main-frame">
      <BestProducts device={device} order={ORDER_BY_FAVORITE} />
      <Products device={device} order={ORDER_BY_RECENT} />
    </main>
  );
}

export default MarketBody;
