
 // viewport width 구하기
 let viewportWidth = window.innerWidth || document.documentElement.clientWidth;

 // viewport width를 콘솔에 기록
 console.log('Viewport width: ', viewportWidth);

 // 크기 조정
 window.addEventListener('resize', function() {
     viewportWidth = window.innerWidth || document.documentElement.clientWidth;
     console.log('Viewport width: ', viewportWidth);
 });