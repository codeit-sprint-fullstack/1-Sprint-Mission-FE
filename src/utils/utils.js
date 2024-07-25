// 실제 URL의 header 정보를 받아와 이미지 파일 여부를 확인
// CORS 가 안 막혀있던 API 테스트에선 정상 작동
// 하지만 미션5용 API 에서 막혀 일단 코드 주석 처리
export async function isImageUrl(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });

    // 응답 헤더에서 Content-Type을 확인합니다.
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.startsWith("image/")) {
      return true; // 실제 이미지 파일임
    } else {
      return false; // 이미지 파일이 아님
    }
  } catch (error) {
    console.error("Error fetching URL:", error);
    return false; // URL을 요청하는 중 오류 발생
  }
}

// 이미지 파일경로 + 파일명 유효성 검증
export function isImageFileText(imgFilePathName) {
  const imgVerification =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;

  return imgFilePathName.match(imgVerification) ? true : false;
}
