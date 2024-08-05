export async function getProducts({ orderBy = 'favorite', pageSize = 4, page = 1, searchQuery = '' }) {
  const query = `orderBy=${orderBy}&pageSize=${pageSize}&page=${page}&keyword=${searchQuery}`;
  const res = await fetch(`https://panda-market-api.vercel.app/products?${query}`);
  const data = await res.json();
  return data.list;
}

export async function getTotalCount(searchQuery = '') {
  const query = `keyword=${searchQuery}`;
  const res = await fetch(`https://panda-market-api.vercel.app/products?${query}`);
  const data = await res.json();
  return data.totalCount;
}
