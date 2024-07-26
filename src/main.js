import './main.css'
import search_icon from './img/search.svg'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './reset.css'




function Main(){
  const [items, setItems] = useState({ list:[]}) //getAPI list가 내용이라 list만 가지고옴
  const [searchItem, setSearchItem] = useState({list:[]}) //get API list가 내용이라 list만 가지고옴
  const [ValueItem, setValueItem] = useState({list:[]}) //get API list가 내용이라 list만 가지고옴
  const [selectedOption, setSelectedOption] = useState('최신순'); // 셀렉트 초기값
  const [valueOption, setvalueOption] = useState(items) // 출력 할 내용
  const [totalCount, setTotalCount] = useState(0);   // API에 totalCount(데이터 수량) API에서 결과를 보여줌
  const [currentPage, setCurrentPage] = useState(1); // API page번호 
  const [totalPages, setTotalPages] = useState(0); // 버튼수량 계산용도
  const [width, setWidth] = useState(window.innerWidth); // 너비 사이즈
  const [itemsPerPage, setItemsPerPage] = useState(10); // 상품 기본값 10 화면 너비기준으로 바로 변경됨.
  const [bestItemsPerPage , setBestItemsPerPage] = useState(4); // 베스트상품 기본값 4 화면 너비기준으로 바로 변경됨.
  const [keyword, setKeyword] = useState(''); // 찾을 키워드

  useEffect(() => { // 화면 너비를 계산
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => { // 너비 기준으로 ItemperPage의 값 변경(상품수량)
    if (width <= 743) {
      setItemsPerPage(4);  // 모바일 뷰
    } else if (width <= 1199) {
      setItemsPerPage(6);  // 태블릿 뷰
    } else {
      setItemsPerPage(10); // 데스크탑 뷰
    }
  }, [width]);  // width가 변경될 때마다 itemsPerPage 업데이트

  useEffect(() => { // 너비 기준으로 setBestItemsPerPage의 값 변경(베스트상품수량)
    if (width <= 743) {
      setBestItemsPerPage(1);  // 모바일 뷰
    } else if (width <= 1199) {
      setBestItemsPerPage(2);  // 태블릿 뷰
    } else {
      setBestItemsPerPage(4); // 데스크탑 뷰
    }
  }, [width]);  // width가 변경될 때마다 itemsPerPage 업데이트
  

  useEffect(() => { // get API를 통해서 상품을 가지고오고
    const fetchData = async () => {
      const response = await axios.get("https://panda-market-api.vercel.app/products/", {
        params: { pageSize: itemsPerPage ,
        page: currentPage}
      });
      setTotalCount(response.data.totalCount);//data.totalCount를 통해 값을 저장 이부분은 없어도 상관 없을거 같음 다른곳에서 setTotalCount한번 더 써주면 끝...?
    };

    fetchData();
  }, [currentPage,itemsPerPage,width]);

  useEffect(() => { //토탈 페이지수 계산 버튼 만들때 사용
    setTotalPages(Math.ceil(totalCount / itemsPerPage)); 
  }, [totalCount,width]); 

  const changePage = (newPage) => { // 버튼클릭이벤트때 사용 
    setCurrentPage(newPage);
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  


  useEffect(() => { // 정렬기준이 최신순, 좋아요순 으로 데이터 변경
    if(selectedOption === '최신순'){
      setvalueOption(searchItem)
    }else{
      setvalueOption(ValueItem)
    }
  },[selectedOption, searchItem, ValueItem, currentPage,width]);
  

  useEffect(() => {  // 베스트상품 API를 통해 상품을 가짐
    const getRes = async () => {
      const getRes = await axios.get("https://panda-market-api.vercel.app/products/",{
        params: {
          pageSize:bestItemsPerPage,
          orderBy: "favorite",
        }
      })
      setItems(getRes.data)
    }
    getRes()
  }, [bestItemsPerPage,width]);

  useEffect(() => { // 정렬 기준
    const getRes = async () => {
      const getRes = await axios.get("https://panda-market-api.vercel.app/products/",{
        params: {
          pageSize:itemsPerPage,
          orderBy: "favorite",
          page :currentPage
        }
      })
      setValueItem(getRes.data)
    }
    getRes()
  }, [currentPage, itemsPerPage,width,selectedOption,width]);

  useEffect(() => { // 정렬 기준
    const getRes = async () => {
      const getRes = await axios.get("https://panda-market-api.vercel.app/products/",{
        params: {
          pageSize:itemsPerPage,
          orderBy: "recent",
          page :currentPage
        }
      })
      setSearchItem(getRes.data)
    }
    getRes()
  }, [currentPage, itemsPerPage,width,selectedOption]);


  
  const handleinputChange = (event) => { // 인풋에 입력된 벨류값을 전달 onChange를 사용하지 않으면 실시간 처리를 못함.
    setKeyword(event.target.value);
  }

  const handleKeyPress = (event) => { //Enter키 기준으로 keyWord에 입력된 내용으로 다시 API호출
    if (event.key === 'Enter') {
      console.log(keyword);
      
        const getRes = async () => {
          const getRes = await axios.get("https://panda-market-api.vercel.app/products/",{
            params: {
              keyword:keyword
            }
          })
          setvalueOption(getRes.data)
        }
        getRes()
        
    }
  }







  // 여기부터 (Select, opstion) 말고, 버튼을 통해서 구현
  document.addEventListener('DOMContentLoaded', (event) => {
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownContent = document.getElementById('dropdownContent');

    dropdownButton.addEventListener('click', () => {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (event) => {
            dropdownButton.textContent = event.target.textContent;
            dropdownContent.style.display = 'none';
            setSelectedOption(event.target.dataset.value);
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.dropdown')) {
            dropdownContent.style.display = 'none';
        }
    });
});












  
  return(
    <div id="main">
      <a id="main_title">베스트 상품</a>

      <div id="best_item">
        {items.list.map((item, index) => ( 
          <div className='item' key={index}>
            <img className ="item_img" src={item.images} alt="Header" />
            <a className='item_name'>{item.name}</a>
            <a className='item_price'>{Intl.NumberFormat('ko-KR').format(item.price)}원</a>
            <a className='item_favoriteCount'>❤️ {item.favoriteCount}</a>
          </div>
        ))}
      </div>
      <div id="sell_container">
        <a id="sell_title">판매 중인 상품</a>
          <a id ="sell_item">
            <input onChange={handleinputChange} onKeyDown={handleKeyPress} id="sell_item_input" placeholder="검색할 상품을 입력해주세요" ></input>
            <img id="sell_item_img" src={search_icon}></img>
          </a>
          <button className='sell_item_btn'>상품 등록하기</button>
          
            {/* <select name="item" id="item_list" onChange={handleSelectChange}>
              <option value="최신순">최신순</option>
              <option value="좋아요순">좋아요순</option>
            </select> */}

            <div className="dropdown">
                <button className="dropdown-button" id="dropdownButton">최신순</button>
                <div className="dropdown-content" id="dropdownContent">
                    <div className="dropdown-item" data-value="최신순">최신순</div>
                    <div className="dropdown-item" data-value="좋아요순">좋아요순</div>
                </div>
            </div>

        
      </div>
      
      <div className='serch_item'>
        <div id="serch_item_list">
          {valueOption.list.map((valueOption, index) => ( 
            <div className='item' key={index}>
              <img className ="item_img" src={valueOption.images} alt="Header" />
              <a className='item_name'>{valueOption.name}</a>
              <a className='item_price'>{Intl.NumberFormat('ko-KR').format(valueOption.price)}원</a>
              <a className='item_favoriteCount'>❤️ {valueOption.favoriteCount}</a>
            </div>
          ))}
        </div>
      </div>

      <div className='footer'>
        <button
          className='page_btn'
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
                className={`page_btn ${currentPage === index + 1 ? 'page_btn_selected' : ''}`}
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
                  className={`page_btn ${currentPage === index + 1 ? 'page_btn_selected' : ''}`}
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
          className='page_btn'
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

export default Main