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

export async function getDb({ limit, sort = 'recent', offset = 0, searchQuery = '' }) {
  const query = `limit=${limit}&sort=${sort}&offset=${offset}&search=${searchQuery}`;
  try {
    const res = await fetch(`https://one-sprint-mission-be-4229.onrender.com/products?${query}`);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}
