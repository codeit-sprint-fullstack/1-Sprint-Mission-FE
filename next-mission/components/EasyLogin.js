import Image from "next/image"

export default function EasyLogin() {
    return (
        <div>
            <div>간편 로그인하기</div>
            <div>
                <Image src={'/images/ic_google.svg'} width={42} height={42} alt="구글 아이콘"/>
                <Image src={'/images/ic_kakao.svg'} width={42} height={42} alt="카카오톡 아이콘"/>
            </div>
        </div>
    )
}