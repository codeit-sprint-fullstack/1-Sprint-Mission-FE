import { ItemsTextBox, ItemList } from './Templete.js';
import { getItems } from '../api.js';
import './Items.css';
import { useEffect, useState } from 'react';
import { DropDown } from './Dropdown.js';
import { PageButton } from './pageButton.js';

export function BestItems() {
  const [items, setItems] = useState([]);

  const BestItemsLoad = async () => {
    const items = await getItems(1, 4, 'favorite');
    setItems(items);
  };

  useEffect(() => {
    BestItemsLoad();
  }, []);

  return (
    <div className="BestItemsContainor">
      <div className="BestItemsTextBox">
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

  const ForSaleItemsLoad = async () => {
    const items = await getItems(pageNum, 10, order);
    console.log(order);
    console.log(items);
    setItems(items);
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
  }, [order, inputText, pageNum]);

  return (
    <div className="ForSaleItemsContainor">
      <div className="ForSaleItemsTextBox">
        <ItemsTextBox Children={'판매중인 상품'}></ItemsTextBox>
        <div className="options">
          <form>
            <div className="searchBox">
              <div className="searchBtn" onClick={searchBtnClick}></div>
              <input
                type="text"
                className="search"
                placeholder="검색할 상품을 입력해주세요"
                onChange={onChange}
              ></input>
            </div>
          </form>
          <button className="addItemBtn">상품 등록하기</button>
          <DropDown text={text} setText={setText} setOrder={setOrder} />
        </div>
      </div>
      <ItemList items={items}></ItemList>
      <PageButton setPageNum={setPageNum}></PageButton>
    </div>
  );
}
