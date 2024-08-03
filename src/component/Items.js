import { ItemsTextBox, ItemList } from './Templete.js';
import { getItems } from '../api.js';
import './Items.css';
import { useEffect, useState } from 'react';
import { DropDown } from './Dropdown.js';
import { PageButton } from './PageButton.js';
import { useResponsive } from '../hooks/useResponsive.js';

export function BestItems() {
  const [items, setItems] = useState([]);
  const { isTablet, isMobile } = useResponsive();

  const BestItemsLoad = async () => {
    const itemsPerPage = isTablet ? 2 : isMobile ? 1 : 4;
    const items = await getItems(1, itemsPerPage, 'favorite');
    setItems(items);
  };

  useEffect(() => {
    BestItemsLoad();
  }, [isTablet, isMobile]);

  return (
    <div className="best-items-containor">
      <div className="best-items-textBox">
        <ItemsTextBox Children={'베스트 상품'}></ItemsTextBox>
      </div>
      <ItemList items={items}></ItemList>
    </div>
  );
}

//판매중 상품

export function ForSaleItems() {
  const [order, setOrder] = useState('recent'); // 정렬 순
  const [items, setItems] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [text, setText] = useState('최신순'); // 정렬 옵션 텍스트 변경
  const [inputText, setInputText] = useState('');
  const [pageNum, setPageNum] = useState(1);

  const { isTablet, isMobile } = useResponsive();

  const ForSaleItemsLoad = async () => {
    const itemsPerPage = isTablet ? 6 : isMobile ? 4 : 10;
    const items = await getItems(pageNum, itemsPerPage, order);
    setItems(items);
    console.log('Current screen width:', window.innerWidth);
  };

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    const searchFilter = items.filter((item) => {
      return item.name
        .toLocaleLowerCase()
        .includes(inputText.toLocaleLowerCase());
    });
    setSearchItem(searchFilter);
  }, [inputText]);

  const searchBtnClick = (e) => {
    e.preventDefault();
    setItems(searchItem);
  };

  useEffect(() => {
    ForSaleItemsLoad();
  }, [order, inputText, pageNum, isTablet, isMobile]);

  const PcAndTabletResponsive = () => {
    return (
      <>
        <ItemsTextBox Children={'판매중인 상품'}></ItemsTextBox>
        <div className="options">
          <form>
            <div className="search-box">
              <div className="search-btn" onClick={searchBtnClick}></div>
              <input
                type="text"
                className="search"
                placeholder="검색할 상품을 입력해주세요"
                onChange={onChange}
              ></input>
            </div>
          </form>
          <button className="add-item-btn">상품 등록하기</button>
          <DropDown
            text={text}
            setText={setText}
            setOrder={setOrder}
            setPageNum={setPageNum}
          />
        </div>
      </>
    );
  };

  const MobileResponsive = () => {
    return (
      <>
        <div className="options-box-first">
          <ItemsTextBox Children={'판매중인 상품'}></ItemsTextBox>
          <button className="add-item-btn">상품 등록하기</button>
        </div>
        <div className="options-box-second">
          <form>
            <div className="search-box">
              <div className="search-btn" onClick={searchBtnClick}></div>
              <input
                type="text"
                className="search"
                placeholder="검색할 상품을 입력해주세요"
                onChange={onChange}
              ></input>
            </div>
          </form>
          <DropDown
            setText={setText}
            setOrder={setOrder}
            setPageNum={setPageNum}
          />
        </div>
      </>
    );
  };

  return (
    <div className="for-sale-items-containor">
      <div className="for-sale-items-textBox">
        {isMobile ? <MobileResponsive /> : <PcAndTabletResponsive />}
      </div>
      <ItemList items={items}></ItemList>
      <PageButton setPageNum={setPageNum}></PageButton>
    </div>
  );
}
