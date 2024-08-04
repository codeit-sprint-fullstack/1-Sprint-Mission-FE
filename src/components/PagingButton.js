import { getPageLength } from '../utils/utils'

var pageBtnList = [];

export default function PagingButton({count, page, onClick}) {
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
  
  return (
    <>
      <button className="pagingButton pageBtnOFF" onClick={movePrevPage}> &#60; </button>
      {pageBtnList.map((value, index) => (
          <button key={value} checked={false} onClick={(e) => {movePage(e);}}
          className={`${index === page -1 ? 'pageBtn': 'pageBtnOFF'} pagingButton`} >{index + 1}</button>
      ))}
      <button className="pagingButton pageBtnOFF" onClick={moveNextPage}> &#62; </button>
    </>
  )
}
