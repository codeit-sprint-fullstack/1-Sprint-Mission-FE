# Mission-01 & Mission-02 요구사항 체크리스트

## 배포: https://hellopandamarket.netlify.app/

### Mission-01 : 첫 화면

- [X] React와 같은 UI 라이브러리를 사용하지 않고 진행합니다
- [X]  PC사이즈만 고려해 주어진 디자인으로 구현합니다.
- [X]  HTML, CSS 파일을 [Netlify](https://www.netlify.com/)로 배포해 주세요.
- [X]  랜딩 페이지의 url path는 루트(‘/’)로 설정합니다.
- [X]  title은 “판다마켓”로 설정합니다.
- [X]  “판다마켓” 로고 클릭 시 루트 페이지(‘/’)로 이동합니다.
- [X]  '로그인' 버튼 클릭 시 로그인 페이지(‘/login’)로 이동합니다 (빈 페이지)
- [X]  “구경하러 가기”버튼 클릭 시(’/items’)로 이동합니다. (빈 페이지)
- [X]  “Privacy Policy”, “FAQ”는 클릭 시 각각 Privacy 페이지(‘/privacy’), FAQ 페이지(‘/faq’)로 이동합니다.(모두 빈 페이지)
- [X]  페이스북, 트위터, 유튜브, 인스타그램 아이콘을 클릭 시 각각의 홈페이지로 새로운 창이 열리면서 이동합니다.
- [X]  아래로 스크롤해도 “판다 마켓” 로고와 “로그인” 버튼이 있는 상단 내비게이션 바(Global Navigation Bar)가 최상단에 고정되게 해 주세요.
- [X]  화면의 너비가 1920px 이상이면 하늘색 배경색은 너비를 꽉 채우도록 채워지고, 내부 요소들의 위치는 고정되고, 여백만 커지도록 합니다.
- [X]  화면의 너비가 1920px 보다 작아질 때, “판다마켓” 로고의 왼쪽 여백 200px, “로그인" 버튼의 오른쪽 여백 200px이 유지되고, 화면의 너비가 작아질수록 두 요소 간 거리가 가까워지도록 설정합니다.
- [X]   화면의 너비가 1920px 이상이면 내부에 있는 요소 간 동일한 간격을 유지하며 가운데 정렬해야 합니다.
- [X]  화면의 너비가 1920px 보다 작아질 때, 최하단에 있는 “codeit-2024”의 왼쪽 여백 200px과 SNS 아이콘들의 오른쪽 여백 200px을 유지하면서 가운데 있는 “Privacy Policy”, “FAQ” 요소와 각각 동일한 간격을 유지하며 가까워져야 합니다.
- [X]   클릭으로 기능이 동작해야 하는 경우, 사용자가 클릭할 수 있는 요소임을 알 수 있도록 CSS 속성 cursor: pointer로 설정합니다.

### Mission-02 : 로그인 / 회원가입 화면

- [X]   README.md 파일을 작성해 주세요.
- [X]   마크다운 언어를 숙지하여 작성해 주세요.
 내용은 자유롭게 작성해 주세요.
- [X]    본인 브랜치(ex)part1-홍길동)에 스프린트 미션을 업로드해 주세요.
- [X]   적절한 커밋 메시지를 남겨 주세요.
- [X]   1-Sprint-Mission 레포지토리를 fork 합니다.
- [X]   GitHub에 PR(Pull Request)을 생성해 upstream의 본인 브랜치(ex)part1-홍길동)에 미션을 제출합니다.
- [X]    PR 코멘트에 아래 내용들을 포함해 주세요.
- [X]   스프린트 미션 요구사항 체크리스트
- [X]   아래 예시 사진과 같이 완료한 만큼 체크 표시를 해 주세요. 참고
- [X]    주요 변경사항
- [X]    멘토님에게 남길 메시지
- [X]   Git 활용 과정에서 유닉스 커맨드를 활용해 주세요.
- [X]   HTML, CSS 파일을 Netlify로 배포합니다.

### 로그인 페이지, 회원가입 페이지 공통

 - [X]   “판다마켓" 로고 클릭 시 루트 페이지(“/”)로 이동합니다.
 - [X]   로그인 페이지, 회원가입 페이지 모두 로고 위 상단 여백이 동일합니다.
 - [X]   SNS 아이콘들은 클릭 시 각각 “[https://www.google.com/”](https://www.google.com/%E2%80%9D), “[https://www.kakaocorp.com/page/”](https://www.kakaocorp.com/page/%E2%80%9D) 으로 이동합니다.
- [X]    input 요소에 focus in 일 때, 테두리 색상은 ##3692FF입니다.
- [X]   input 요소에 focus out 일 때, 테두리는 없습니다.

### 로그인 페이지

- [X]   “회원가입”버튼 클릭 시 “/signup” 페이지로 이동합니다.

### 회원가입 페이지

- [X]   “로그인”버튼 클릭 시 “/login” 페이지로 이동합니다.

### 심화
### Mission-01 : 첫 화면

- [X]   reset.css를 설정해 주세요.
- [X]   사용자의 브라우저 설정에 따라 기본 폰트 크기 설정이 변화함에 따라서 페이지의 요소 간 간격, 요소의 크기, font-size 등 모든 크기와 관련된 값이 크고 작아지도록 설정해 주세요.

### Mission-02 : 로그인 / 회원가입 화면

- [X]    palette에 있는 color값들을 css 변수로 등록해서 사용합니다.
- [X]   사용자의 브라우저가 크고 작아짐에 따라 페이지의 요소 간 간격, 요소의 크기, font-size 등 모든 크기와 관련된 값이 크고 작아지도록 설정해 주세요.
- [X]   구글 애널리틱스로 방문자 수 확인하기 할 수 있도록 설정합니다.
- [X]   로그인 페이지, 회원가입 페이지 공통
- [X]   비밀번호, 비밀번호 확인 input 요소 오른쪽에 비밀번호를 확인할 수 있는 눈 모양 아이콘을 추가합니다.

### 스크린샷

### index.html
![image](https://github.com/codeit-sprint-fullstack/1-Sprint-Mission-FE/assets/101076926/9287b6d0-7305-4191-b741-e8c8c101667a)

### login.html
![image](https://github.com/codeit-sprint-fullstack/1-Sprint-Mission-FE/assets/101076926/1b6004f5-ade9-4df2-b8d8-376d079fd117)

### signup.html
![image](https://github.com/codeit-sprint-fullstack/1-Sprint-Mission-FE/assets/101076926/db9c956d-d0e9-4acf-be73-e2fa6a49a18e)

### google_analytics
![77F420B4-274D-46EC-A19A-6D80E1E1C63F_1_201_a](https://github.com/codeit-sprint-fullstack/1-Sprint-Mission-FE/assets/101076926/de317c61-5d6e-4dfb-8b71-db2eee3ce1a5)
