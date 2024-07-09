//eye icon image toggle

export function eyeIconToggle() {
  const eyeIcons = document.querySelectorAll('.eye-icon');

  eyeIcons.forEach((eyeIcon) => {
    eyeIcon.addEventListener('click', () => {
      const pwInput = eyeIcon.previousElementSibling;
      const pwType =
        pwInput.getAttribute('type') === 'password' ? 'text' : 'password';
      pwInput.setAttribute('type', pwType);
      eyeIcon.src =
        pwType === 'password'
          ? '../img/btn_visibility_off_24px.svg'
          : '../img/btn_visibility_on_24px.svg';
      eyeIcon.alt = pwType === 'password' ? '비밀번호 숨기기' : '비밀번호 보기';
    });
  });
}
