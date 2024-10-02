
export function validateEmail(email){ // 입력값 변경 시, 이메일 유효성 검사 수행 
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  }
  
export function validatename(name) { // 입력값 변경 시, 닉네임 유효성 검사 수행 
    const nameRegex = /^[가-힣]+$/; // 닉네임은 한글로만 작성 가능
    return nameRegex.test(name);
  }
  
export function validatePassword(password) { // 입력값 변경 시, 비밀번호 유효성 검사 수행 
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*])/; 
    return passwordRegex.test(password);
  }
