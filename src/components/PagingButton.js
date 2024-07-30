import { useState } from 'react'
import { getPageLength } from '../utils/utils'

var pageBtnList = [];

export function PagingButton({count, page, onClick}) {
  const [isChecked, setIsChecked] = useState();
  pageBtnList = getPageLength(count);

  const movePrevPage = () => {
    if(page > 1){
      onClick(page-1);
    }
  }
  const moveNextPage = () => {
    if(page < pageBtnList.length){
      onClick(page+1);
    }
  }
  const movePage = (e) => {
    onClick(e.target.innerText);
  }

  const chageColor = (e, value) => {
    
    if(value.num == e.target.innerText){
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
    value.ischecked = isChecked;
    console.log(e.target.innerText);
    console.log(value);
    console.log(page);
    console.log(pageBtnList);
  }
  
  return (
    <>
      <button className="pagingButton pageBtnOFF" onClick={movePrevPage}> &#60; </button>
      {pageBtnList.map((value) => (
          <button key={value.num} checked={false} onClick={(e) => {
            movePage(e);
            chageColor(e, value);
          }}
          className={`${value.ischecked? 'pageBtn': 'pageBtnOFF'} pagingButton`} >{value.num}</button>
      ))}
      <button className="pagingButton pageBtnOFF" onClick={moveNextPage}> &#62; </button>
    </>
  )
}
