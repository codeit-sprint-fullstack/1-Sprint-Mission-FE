import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../assets/styles/marketBody.css";
import no_image from "../assets/images/no_image.svg";
// import { isImageUrl, isImageFileText, isImageLoaded } from "../utils/utils";
import SearchProducts from "./SearchProducts";
import Button from "./Button";
import { deviceContext } from "../App";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "./Dropdown";
import Pagination from "./Pagination";
import { PRODUCT_API_ADDRESS } from "../utils/constants";

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
const ORDER_TEXT = ["최신순", "좋아요순"];

let recentOrder = ORDER_BY_RECENT;

// index 0 : PC 1 : TABLET 2 : MOBILE
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
          <p className="margin-left4 Text-xs-line-height18 Medium">
            {favorite}
          </p>
        </div>
      </div>
    </>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [maxPageNum, setMaxPageNum] = useState(0);
  const [searchText, setSearchText] = useState("");

  let device = useContext(deviceContext);
  let totalCount = 0;

  console.log("Products : " + device);
  const handleRegistrationButtonClick = () => {
    alert("상품 등록 : 로그인이 필요합니다");
  };

  const sortByRecent = () => {
    getProducts(recentPage, ORDER_BY_RECENT, searchText);
    recentOrder = ORDER_BY_RECENT;
  };

  const sortByFavorite = () => {
    getProducts(recentPage, ORDER_BY_FAVORITE, searchText);
    recentOrder = ORDER_BY_FAVORITE;
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = () => {
    getProducts(1, ORDER_BY_RECENT, searchText);
  };

  const handlePageMove = (pageNum) => {
    recentPage = pageNum;
    getProducts(pageNum, recentOrder, searchText);
  };

  function getProducts(page = 1, order = ORDER_BY_RECENT, search = "") {
    console.log("Products2 : " + device);
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
        setMaxPageNum(Math.ceil(totalCount / PAGE_SIZE[device]));
      })
      .catch((err) => console.log(err.name));
  }

  useEffect(() => {
    getProducts(recentPage, recentOrder, searchText);
  }, [device]);

  return (
    <div className="main__section-products">
      <div className="main__products-tools">
        <p className="Text-xl Bold">판매 중인 상품</p>
        <SearchProducts
          searchClassName="main__tools-search"
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          inputClassName="Text-lg Regular search__input"
          imgClassName="search__img"
        >
          검색할 상품을 입력해주세요
        </SearchProducts>
        <Button
          className="registrationButton main__tools-button"
          onClick={handleRegistrationButtonClick}
        />
        {
          <Dropdown dropdwonClass="main__tools-dropdown">
            <DropdownToggle>{ORDER_TEXT[recentOrder]}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={sortByRecent}>
                {ORDER_TEXT[ORDER_BY_RECENT]}
              </DropdownItem>
              <DropdownItem onClick={sortByFavorite}>
                {ORDER_TEXT[ORDER_BY_FAVORITE]}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        }
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
          maxPageNum={maxPageNum}
          recentPage={recentPage}
          onClick={handlePageMove}
        />
      </div>
    </div>
  );
}

function BestProducts() {
  const [bestProducts, setBestProducts] = useState([]);

  let device = useContext(deviceContext);

  function getBestProdudts() {
    const params = {
      page: 1,
      pageSize: BEST_PAGE_SIZE[device],
      orderBy: ORDER_BY[ORDER_BY_FAVORITE],
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
  return (
    <main className="main-frame">
      <BestProducts />
      <Products />
    </main>
  );
}

export default MarketBody;
