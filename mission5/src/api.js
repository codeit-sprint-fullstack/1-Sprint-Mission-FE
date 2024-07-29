export async function getProducts({page, pageSize, orderBy, keyword}) {
  const query = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  
  if (orderBy) {
    query.append('orderBy', orderBy);
  }
  if (keyword) {
    query.append('keyword', keyword);
  }

  const response = await fetch(`https://panda-market-api.vercel.app/products?${query.toString()}`);
  if (!response.ok ) {
    throw new Error('데이터를 불러오는데 실패했습니다.');
  }
  const body = await response.json();
  return body;
}