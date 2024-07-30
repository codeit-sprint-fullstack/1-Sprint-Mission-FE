export function pageButton({ num }) {
  return <div className="pageButton">{num}</div>;
}

//load data
const loadData = [];
//totalCount
const totalCount = 0;
//pageViewSize
const pageSize = 10;
const page = 1;

//page numbering
const pageTotalCount = totalCount / pageSize; //6
const pageMax = 5;

const pageList = [1, 2, 3, 4, 5, 6];

// > if pageMax%page == 0  pageList
