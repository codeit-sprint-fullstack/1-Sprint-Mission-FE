const baseUrl = 'https://sprint-mission-api.vercel.app/articles';

export async function getArticleList(params = {}) {
  const { page = 1, pageSize = 10, keyword = '' } = params;

  const res = await fetch(
    `${baseUrl}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`,
    {
      method: 'GET',
    }
  )
    .then((res) => {
      if (!res.ok) {
        const message = res.text();
        throw new Error(message);
      }
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.log('데이터불러오기실패'));
}

export async function getArticle(id) {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'GET',
  })
    .then((res) => {
      if (!res.ok) {
        const message = res.text();
        throw new Error(message);
      }
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.log(error.message));
}

export async function createArticle(articleUploadData) {
  // const { title, content, image } = articleUploadData;

  const res = await fetch(`${baseUrl}/`, {
    method: 'POST',
    body: JSON.stringify(articleUploadData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        const message = res.text();
        throw new Error(message);
      }
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.log(error.message));
}

export async function patchArticle(id, articleUpdateData) {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(articleUpdateData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        const message = res.text();
        throw new Error(message);
      }
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.log(error.message));
}

export async function deleteArticle(id) {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        const message = res.text();
        throw new Error(message);
      }
      return true;
    })
    .then((data) => console.log(data))
    .catch((error) => console.log(error.message));
}
