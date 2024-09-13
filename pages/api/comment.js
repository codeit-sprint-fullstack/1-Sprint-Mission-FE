import instance from "./axios.js"; // Axios 인스턴스를 가져옵니다. 이를 통해 API 요청을 보낼 수 있습니다.

// 댓글을 업데이트하는 함수
export async function updateComment(id, item) {
  // PATCH 요청을 사용하여 특정 댓글(id)을 업데이트합니다.
  // `id`는 업데이트할 댓글의 ID이고, `item`은 업데이트할 데이터입니다.
  const res = await instance.patch(`/comments/${id}`, item); // 댓글 ID에 해당하는 경로로 PATCH 요청을 보냅니다.
  return res.data; // 서버로부터 받은 응답 데이터(res.data)를 반환합니다.
}

// 댓글을 생성하는 함수
export async function createComment(item) {
  // POST 요청을 사용하여 새로운 댓글을 생성합니다.
  // `item`은 생성할 댓글의 데이터입니다.
  const res = await instance.post(`/comments`, item); // `/comments` 경로로 POST 요청을 보냅니다.
  return res.data; // 서버로부터 받은 응답 데이터(res.data)를 반환합니다.
}

// 댓글을 삭제하는 함수
export async function deleteComment(id) {
  // DELETE 요청을 사용하여 특정 댓글(id)을 삭제합니다.
  // `id`는 삭제할 댓글의 ID입니다.
  const res = await instance.delete(`/comments/${id}`); // 댓글 ID에 해당하는 경로로 DELETE 요청을 보냅니다.
  return res.status; // 서버로부터 받은 응답 상태(res.status)를 반환합니다.
}
