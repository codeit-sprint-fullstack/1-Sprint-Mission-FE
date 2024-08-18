import "./main.css";
import search_icon from "./img/search.svg";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./reset.css";
import { useNavigate } from "react-router-dom";

function Main() {
  const [searchItem, setSearchItem] = useState({ list: [] }); //get API list가 내용이라 list만 가지고옴
  const [totalCount, setTotalCount] = useState(0); // API에 totalCount(데이터 수량) API에서 결과를 보여줌
  const [currentPage, setCurrentPage] = useState(1); // API page번호
  const [totalPages, setTotalPages] = useState(0); // 버튼수량 계산용도
  const [width, setWidth] = useState(window.innerWidth); // 너비 사이즈
  const [itemsPerPage, setItemsPerPage] = useState(10); // 상품 기본값 10 화면 너비기준으로 바로 변경됨.
  const [keyword, setKeyword] = useState(""); // 찾을 키워드

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/registration");
  };

  useEffect(() => {
    // 화면 너비를 계산
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // 너비 기준으로 ItemperPage의 값 변경(상품수량)
    if (width <= 743) {
      return setItemsPerPage(4); // 모바일 뷰
    } else if (width <= 1199) {
      return setItemsPerPage(6); // 태블릿 뷰
    } else {
      return setItemsPerPage(10); // 데스크탑 뷰
    }
  }, [width]); // width가 변경될 때마다 itemsPerPage 업데이트

  useEffect(() => {
    const getProduct = async () => {
      try {
        const getProduct = await axios.get(
          `https://product-ogs1.onrender.com/product`,
          {
            params: {
              limit: itemsPerPage,
              page: currentPage,
              keyword: keyword,
            },
          }
        );
        setSearchItem({ list: getProduct.data.product });
        setTotalCount(getProduct.data.totalCount);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProduct();
  }, [totalCount, itemsPerPage, currentPage, keyword]);

  useEffect(() => {
    //토탈 페이지수 계산 버튼 만들때 사용
    setTotalPages(Math.ceil(totalCount / itemsPerPage));
  }, [totalCount]);

  /** 그래야지 이런식으로 정보가 나옴 */
  const changePage = (newPage) => {
    // 버튼클릭이벤트때 사용
    setCurrentPage(newPage);
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleinputChange = (event) => {
    // 인풋에 입력된 벨류값을 전달 onChange를 사용하지 않으면 실시간 처리를 못함.
    setKeyword(event.target.value);
  };

  // 여기부터 (Select, opstion) 말고, 버튼을 통해서 구현

  document.addEventListener("DOMContentLoaded", (event) => {
    const dropdownButton = document.getElementById("dropdownButton");
    const dropdownContent = document.getElementById("dropdownContent");

    dropdownButton.addEventListener("click", () => {
      dropdownContent.style.display =
        dropdownContent.style.display === "block" ? "none" : "block";
    });

    document.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", (event) => {
        dropdownButton.textContent = event.target.textContent;
        dropdownContent.style.display = "none";
        // setSelectedOption(event.target.dataset.value);
      });
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".dropdown")) {
        dropdownContent.style.display = "none";
      }
    });
  });

  return (
    <div id="main">
      <div id="sell_container">
        <a id="sell_title">판매 중인 상품</a>
        <a id="sell_item">
          <input
            onChange={handleinputChange}
            id="sell_item_input"
            placeholder="검색할 상품을 입력해주세요"
          ></input>
          <img id="sell_item_img" src={search_icon}></img>
        </a>
        <button className="sell_item_btn" onClick={handleButtonClick}>
          상품 등록하기
        </button>

        <div className="dropdown">
          <button className="dropdown-button" id="dropdownButton">
            최신순
          </button>
          <div className="dropdown-content" id="dropdownContent">
            <div className="dropdown-item" data-value="최신순">
              최신순
            </div>
            <div className="dropdown-item" data-value="좋아요순">
              좋아요순
            </div>
          </div>
        </div>
      </div>

      <div className="serch_item">
        <div id="serch_item_list">
          {searchItem.list.map((searchItem, index) => (
            <div className="item" key={index}>
              <img className="item_img" src={search_icon} alt="Header" />
              <a className="item_name">{searchItem.name}</a>
              <a className="item_price">
                {Intl.NumberFormat("ko-KR").format(searchItem.price)}원
              </a>
              <a className="item_tag">{searchItem.tag}</a>
            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        <button
          className="page_btn"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => {
          const maxVisibleButtons = 5;
          const firstPage = 1;
          const lastPage = totalPages;

          if (totalPages <= maxVisibleButtons) {
            // 페이지 수가 5 이하일 때는 모든 버튼을 그대로 표시
            return (
              <button
                key={index}
                className={`page_btn ${
                  currentPage === index + 1 ? "page_btn_selected" : ""
                }`}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </button>
            );
          } else {
            // 페이지 수가 5를 초과할 때는 버튼을 제한
            let startPage, endPage;
            if (currentPage <= 3) {
              // 현재 페이지가 1, 2, 3일 때
              startPage = firstPage;
              endPage = maxVisibleButtons;
            } else if (currentPage > totalPages - 3) {
              // 현재 페이지가 끝에서 1, 2, 3일 때
              startPage = lastPage - (maxVisibleButtons - 1);
              endPage = lastPage;
            } else {
              // 현재 페이지가 중간일 때
              startPage = currentPage - 2;
              endPage = currentPage + 2;
            }

            if (index + 1 >= startPage && index + 1 <= endPage) {
              return (
                <button
                  key={index}
                  className={`page_btn ${
                    currentPage === index + 1 ? "page_btn_selected" : ""
                  }`}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              );
            }
          }

          return null;
        })}

        <button
          className="page_btn"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Main;
