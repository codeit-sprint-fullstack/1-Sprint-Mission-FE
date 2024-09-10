export function numberValidation(number) {
  let error;
  if (/^\d+$/.test(number)) {
    error = false;
  } else {
    error = true;
  }

  return error;
}

export function validationMaxLength(sentence, maxLength) {
  let error;
  if (sentence.length <= maxLength) {
    error = false;
  } else {
    error = true;
  }

  return error;
}

export function validationMinLength(sentence, minLength) {
  let error;
  if (sentence.length >= minLength) {
    error = false;
  } else {
    error = true;
  }

  return error;
}

export function validationEmail(email) {
  let error;
  const regex = new RegExp(
    "^[0-9a-zA-Z]" + // 첫 글자는 숫자나 알파벳
      "([-_.]?[0-9a-zA-Z])*" + // 하이픈, 점, 언더바는 0번 또는 1번 나올 수 있음
      "@[0-9a-zA-Z]" + // @ 기호 뒤에는 도메인 이름
      "([-_.]?[0-9a-zA-Z])*" + // 도메인 이름에도 동일한 규칙 적용
      "\\.[a-zA-Z]{2,3}" + // 도메인과 최상위 도메인 구분
      "(\\.[a-zA-Z]{2,3})?$", // 선택적으로 2차 도메인 (예: .co.kr)
    "i" // 대소문자 구분하지 않음 플래그
  );

  if (regex.test(email)) {
    error = false;
  } else {
    error = true;
  }

  return error;
}

export function validationSubmit(...errorStates) {

  const submit = errorStates.every((errorState) => errorState === false);

  return submit;
}
