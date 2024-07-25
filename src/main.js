import './main.css'
import search_icon from './img/search.svg'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './reset.css'




function Main(){
  const [items, setItems] = useState({ list:[]}) //getAPI
  const [searchItem, setSearchItem] = useState({list:[]}) //get API
  const [ValueItem, setValueItem] = useState({list:[]}) //get API
  const [selectedOption, setSelectedOption] = useState('최신순'); // 셀렉트 초기값
  const [valueOption, setvalueOption] = useState(items)
  const [totalCount, setTotalCount] = useState(0);  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); 
  const [width, setWidth] = useState(window.innerWidth);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [bestItemsPerPage , setBestItemsPerPage] = useState(4);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (width <= 743) {
      setItemsPerPage(4);  // 모바일 뷰
    } else if (width <= 1199) {
      setItemsPerPage(6);  // 태블릿 뷰
    } else {
      setItemsPerPage(10); // 데스크탑 뷰
    }
  }, [width]);  // width가 변경될 때마다 itemsPerPage 업데이트

  useEffect(() => {
    if (width <= 743) {
      setBestItemsPerPage(1);  // 모바일 뷰
    } else if (width <= 1199) {
      setBestItemsPerPage(2);  // 태블릿 뷰
    } else {
      setBestItemsPerPage(4); // 데스크탑 뷰
    }
  }, [width]);  // width가 변경될 때마다 itemsPerPage 업데이트
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://panda-market-api.vercel.app/products/", {
        params: { pageSize: itemsPerPage ,
        page: currentPage}
      });
      setTotalCount(response.data.totalCount);  
    };

    fetchData();
  }, [currentPage,itemsPerPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalCount / itemsPerPage)); 
  }, [totalCount]); 

  const changePage = (newPage) => {
    setCurrentPage(newPage);
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  


  useEffect(() => {
    if(selectedOption === '최신순'){
      setvalueOption(searchItem)
    }else{
      setvalueOption(ValueItem)
    }
  },[selectedOption, searchItem, ValueItem, currentPage]);
  

  useEffect(() => { 
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
  }, [bestItemsPerPage]);

  useEffect(() => {
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
  }, [currentPage, itemsPerPage,width]);

  useEffect(() => {
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
  }, [currentPage, itemsPerPage,width]);

  function handleSelectChange(event){
    setSelectedOption(event.target.value);
  }

  
  const handleinputChange = (event) => {
    setKeyword(event.target.value);
  }

  const handleKeyPress = (event) => {
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



  
  return(
    <div id="main">
      <a id="main_title">베스트 상품</a>

      <div id="best_item">
        {items.list.map((item, index) => ( // 여기에서 items.list.map 사용
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
          
            <select name="item" id="item_list" onChange={handleSelectChange}>
              <option value="최신순">최신순</option>
              <option value="좋아요순">좋아요순</option>
            </select>

        
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