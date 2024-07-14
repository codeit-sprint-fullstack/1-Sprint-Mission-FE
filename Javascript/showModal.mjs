    
export function showModal(message) {
    let modal = document.getElementById("myModal");
    
    document.getElementById('message').innerText = message;
    modal.style.display = "flex"; // 모달 창 표시
}