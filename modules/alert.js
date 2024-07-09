export const createAlertBox = (msg) => {
  const alertBox = document.createElement('div');
  const overlayBox = document.createElement('div');
  
  alertBox.classList.add('alertBox');
  overlayBox.classList.add('overlay');
  
  alertBox.innerHTML = `<p>${msg}</p><button class="confirm">확인</button>`.trim();
  
  document.body.append(alertBox);
  document.body.append(overlayBox);

  const confirmButton = alertBox.querySelector('.confirm');
  confirmButton.addEventListener('click', () => {
    document.body.removeChild(alertBox);
    document.body.removeChild(overlayBox);
  })
}