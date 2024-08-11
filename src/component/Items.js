import { ItemsTextBox, ItemList, Button } from './Templete.js';
import { getItems, getProductLength } from '../api.js';
import './Items.css';
import { useEffect, useState, useRef } from 'react';
import { DropDown } from './Dropdown.js';
import { PageButton } from './PageButton.js';
import { useResponsive } from '../hooks/useResponsive.js';

export function BestItems() {
  const [items, setItems] = useState([]);
  const { isTablet, isMobile } = useResponsive();

  const BestItemsLoad = async () => {
    const itemsPerPage = isTablet ? 2 : isMobile ? 1 : 4;
    const items = await getItems({
      page: 1,
      pageSize: itemsPerPage,
    });
    setItems(items);
  };

  useEffect(() => {
    BestItemsLoad();
  }, [isTablet, isMobile]);

  return (
    <div className="best-items-container">
      <div className="best-items-textBox">
        <ItemsTextBox Children={'베스트 상품'}></ItemsTextBox>
      </div>
      <ItemList items={items}></ItemList>
    </div>
  );
}

//판매중 상품

export function ForSaleItems() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('최신순'); // 정렬 옵션 텍스트 변경
  const [sort, setSort] = useState('recent');
  const [pageNum, setPageNum] = useState(1);
  const inputRef = useRef(null);

  const { isTablet, isMobile } = useResponsive();

  const ForSaleItemsLoad = async () => {
    const itemsPerPage = isTablet ? 6 : isMobile ? 4 : 10;
    const items = await getItems({
      page: pageNum,
      pageSize: itemsPerPage,
      option: sort,
    });
    setItems(items);
  };

  const searchBtnClick = async (e) => {
    e.preventDefault();
    const length = await getProductLength().then((data) => data.totalCount);
    const allData = await getItems({ page: 1, pageSize: length });
    const inputText = inputRef.current.value.toLowerCase();
    const searchFilter = allData.filter((item) => {
      return item.name.toLowerCase().includes(inputText.toLowerCase());
    });
    setItems(searchFilter);
  };

  const keyDown = (e) => {
    if (e.key === 'Enter') {
      searchBtnClick(e);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchBtnClick(e);
  };

  useEffect(() => {
    ForSaleItemsLoad();
  }, [pageNum, isTablet, isMobile]);

  const PcAndTabletResponsive = () => {
    return (
      <>
        <ItemsTextBox Children={'판매중인 상품'}></ItemsTextBox>
        <div className="options">
          <form id="input-form" onSubmit={onSubmit}>
            <div className="search-box">
              <button
                type="button"
                className="search-btn"
                onClick={searchBtnClick}
              ></button>
              <input
                type="text"
                className="search"
                placeholder="검색할 상품을 입력해주세요"
                ref={inputRef}
                onKeyDown={keyDown}
              ></input>
            </div>
          </form>
          <Button
            path={'/registration'}
            name={'add-item-btn'}
            text={'상품 등록하기'}
          ></Button>
          <DropDown text={text} setText={setText} setPageNum={setPageNum} />
        </div>
      </>
    );
  };

  const MobileResponsive = () => {
    return (
      <>
        <div className="options-box-first">
          <ItemsTextBox Children={'판매중인 상품'}></ItemsTextBox>
          <Button
            path={'/registration'}
            name={'add-item-btn'}
            text={'상품 등록하기'}
          ></Button>
        </div>
        <div className="options-box-second">
          <form id="input-form">
            <div className="search-box">
              <button
                type="button"
                className="search-btn"
                onClick={searchBtnClick}
              ></button>
              <input
                type="text"
                className="search"
                placeholder="검색할 상품을 입력해주세요"
              ></input>
            </div>
          </form>
          <DropDown setText={setText} setPageNum={setPageNum} />
        </div>
      </>
    );
  };

  return (
    <div className="for-sale-items-container">
      <div className="for-sale-items-textBox">
        {isMobile ? <MobileResponsive /> : <PcAndTabletResponsive />}
      </div>
      <ItemList items={items}></ItemList>
      <PageButton setPageNum={setPageNum}></PageButton>
    </div>
  );
}
