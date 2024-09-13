import instance from "./axios.js"; // axios 인스턴스를 가져옵니다.

// 게시글 목록을 가져오는 함수 (옵션: 정렬, 검색어, 페이지네이션 등)
export async function getArticles(params = {}, cursor = "") {
  const res = await instance.get("/articles", {
    params: { ...params, cursor }, // 요청 파라미터로 params와 cursor를 함께 전달
  });
  return res.data; // 가져온 데이터 반환
}

// 베스트 게시글을 가져오는 함수 (기본 설정: 좋아요 순, 최대 3개)
export async function getBestArticles(
  params = {
    orderBy: "favorite",
    limit: 3,
  }
) {
  const res = await instance.get("/articles", {
    params, // 기본 파라미터로 요청
  });
  return res.data; // 가져온 데이터 반환
}

// 특정 게시글의 상세 정보를 가져오는 함수
export async function getArticle(id) {
  const res = await instance.get(`/articles/${id}`); // 특정 ID의 게시글 요청
  return res.data; // 가져온 데이터 반환
}

// 새 게시글을 생성하는 함수
export async function createArticle(item) {
  const res = await instance.post(`/articles`, item); // POST 요청으로 새 게시글 생성
  return res.data; // 생성된 데이터 반환
}

// 게시글을 업데이트하는 함수
export async function updateArticle(id, item) {
  const res = await instance.patch(`/articles/${id}`, item); // PATCH 요청으로 업데이트
  return res.data; // 업데이트된 데이터 반환
}

// 게시글을 삭제하는 함수
export async function deleteArticle(id) {
  const res = await instance.delete(`/articles/${id}`); // DELETE 요청으로 게시글 삭제
  return res.status; // 요청 상태 반환
}
