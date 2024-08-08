# 📑 스프린트 미션6 FE | 

스프린트 미션 6(FE) MongoDB를 활용하여 API를 구현하고, 데이터베이스 작업을 처리하도록 구현하였습니다.

### 👨‍👩‍👧‍👦 요구사항 

#### 중고마켓 페이지 구현
- [x] 중고마켓 페이지 url path를 “/items”으로 설정하세요.

- [x] 페이지 주소가 “/items” 일 때 상단내비게이션바의 “중고마켓" 버튼의 색상은 “3692FF”입니다.

- [x] 중고마켓 페이지 판매 중인 상품은 본인이 만든 GET 메서드를 사용해 주세요.
- [x] 다만 좋아요 순 정렬 기능은 제외해 주세요.
- [x] 사진은 디폴트 이미지로 프론트엔드에서 처리해주세요.
- [x] 베스트 상품 목록 조회는 구현하지 않습니다.
- [x] '상품 등록하기' 버튼을 누르면 “/registration” 로 이동합니다. ( 빈 페이지 )
  
#### 상품 등록 페이지 구현
- [x] PC, Tablet, Mobile 디자인에 해당하는 상품 등록 페이지를 만들어 주세요.

- [x] 상품 등록 url path는 “/registration”입니다.
- [x] 상품 등록은 본인이 만든 POST 메서드를 사용해 주세요.
- [x] 등록 성공 시, 해당 상품 상세 페이지로 이동합니다. (빈페이지)

### 🔨 프론트엔드 개발 서버 설정

#### 1. 환경 설정
- 필요한 패키지 설치 : 
```
npm install
```
- React 개발 서버를 실행 :
```
npm start
```

#### 2. 환경 변수 설정
1. 프로젝트 루트 디렉토리에 .env 파일을 생성
2. .env 파일에 다음과 같이 설정
```
REACT_APP_API_URL=http://localhost:3000/api/products
```

### ✅ 상품 API

- https://panda-market-api.vercel.app/products


### ⏰ 개발 기간

- 2024,08,05 ~ 


### ⚙ 기술 스택
- Front

    * JavaScript
    * React
    * Axios (HTTP 통신)
    * React Router (라우팅)
    * CSS (스타일링)

### 🎈 기획 및 설계

- 미션 6 API 명세 참고
	https://panda-market-api.vercel.app/docs/

- 미션 6 Figma 디자인 참고
    https://www.figma.com/design/EWfmnBJU3fdkeHKyYBQW6L/%5B%EC%88%98%EA%B0%95%EC%83%9D-%EA%B3%B5%EC%9C%A0%EC%9A%A9%5D-%ED%8C%90%EB%8B%A4%EB%A7%88%EC%BC%93?node-id=4313-5831&t=gmOYyDYUyOtbh3Zj-0
