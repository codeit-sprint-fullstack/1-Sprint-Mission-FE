import './RegistrationForm.css'

function RegistrationForm() {
    return(
        <form className="RegistrationFormContaner">
            <div className='productRegistration'>
                <p className='productRegistrationLabel'>상품 등록하기</p>
                <button className='productRegistrationButton'>등록</button>
            </div>
            <div id='registrationName' className='Registrationbox'>
                <label htmlFor="productName" className='RegistrationLabel'>상품명</label>
                <input id="productName" className='productInput' placeholder='상품명을 입력해주세요' />
            </div>
            <div id='registrationIntroduction' className='Registrationbox'>
                <label htmlFor="productIntroduction" className='RegistrationLabel'>상품 소개</label>
                <textarea id="productIntroduction" className='productInput' placeholder='상품 소개를 입력해주세요'/>
            </div>
            <div className='Registrationbox'>
                <label htmlFor="productPrice" className='RegistrationLabel'>판매가격</label>
                <input id="productPrice" className='productInput' placeholder='판매 가격을 입력해주세요'/>
            </div>
            <div className='Registrationbox'>
                <label htmlFor="productTag" className='RegistrationLabel'>태그</label>
                <input id="productTag" className='productInput' placeholder='태그를 입력해주세요'/>
            </div>
        </form>
    )
}

export default RegistrationForm