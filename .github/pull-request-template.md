기본 요구사항
공통

[x] Github에 스프린트 미션 PR을 만들어 주세요.
[x] React, Express를 사용해 진행합니다.

프론트엔드 구현 요구사항
중고마켓 페이지

[x] 중고마켓 페이지 url path를 “/items”으로 설정하세요.
[x] 페이지 주소가 “/items” 일 때 상단내비게이션바의 “중고마켓" 버튼의 색상은 “3692FF”입니다.
[x] 중고마켓 페이지 판매 중인 상품은 본인이 만든 GET 메서드를 사용해 주세요.
[ ] 다만 좋아요 순 정렬 기능은 제외해 주세요.
[x] 사진은 디폴트 이미지로 프론트엔드에서 처리해주세요.
[ ] 베스트 상품 목록 조회는 구현하지 않습니다.
[x] '상품 등록하기' 버튼을 누르면 “/registration” 로 이동합니다. ( 빈 페이지 )
상품 등록 페이지

[x] PC, Tablet, Mobile 디자인에 해당하는 상품 등록 페이지를 만들어 주세요.
[x] 상품 등록 url path는 “/registration”입니다.
[x] 상품 등록은 본인이 만든 POST 메서드를 사용해 주세요.
[x] 등록 성공 시, 해당 상품 상세 페이지로 이동합니다. (빈페이지)

심화 요구사항
프론트엔드 구현 요구사항
상품 등록 페이지

[x] 모든 입력 input box에 빈 값이 있을 경우, 등록 버튼이 비활성화됩니다.
[x] 태그를 입력한 후 엔터키를 누르면, 그 태그가 칩 형태로 쌓입니다.
[x] 상품명, 상품 소개, 판매 가격, 태그에 대한 유효성 검사 Custom Hook을 만들어주세요. 유효성 검사를 통과하지 않을 경우, 각 input에 빨간색 테두리와, 각각의 Input 아래에 빨간색 에러 메시지를 보여주세요.
유효한 조건
상품명: 1자 이상, 10자 이내
상품 소개: 10자 이상, 100자 이내
판매 가격: 1자 이상, 숫자
태그: 5글자 이내

[멘토링]

- src/components/RegistrationForm.js : 해당 validation 체크를 함수를 하나 만들어서 onChange 함수에다가 같이 넣으면 어떨까요? setIsSubmitting 을 설정하는게 너무 분산되어있어요.

-src/components/RegistrationForm.js
Q: 금액 넣는 칸에 자동으로 , 가 찍히게 하고 싶은데 문자열도 쓸 수 있으면서 자동으로 , 도 찍히게 만들 수 있는 방법이 있나요?
유저가 입력할 때마다 ,를 처리해줘야하므로 onChange에서 이를 처리할 수 있습니다.
제가 예시로 좀 짜봤습니다. 완벽하지는 않습니다 참고만 해주세요

onChange={(e) => {
const price = Number(e.target.value.replaceAll(',', ''));
if (isNaN(price)) {
return
} else {
e.target.value = price.toLocaleString()
}

}}

- src/components/RegistrationTags.js
  중복되는것이 있을때는 뭔가 중복된다는 알림을 따로 주면 좋을것 같아요.

- src/pages/MarketItemsPage.js
root page에 상태나 함수가 너무 많아요. 예를들면 performSearch 함수같은건 ProductListHeader에서 정의해서 써도 되는건데 굳이 props로 내려줄 이유가 없어보입니다.
다른 상태나 함수들도 고려해주세요