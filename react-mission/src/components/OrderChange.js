import { useEffect, useState } from 'react';
import orderChangeArrow from './img/orderChangeArrow.png'
import mobileOrderArrow from './img/mobileOrderChangeArrow.png'

function OrderChange({ orderName, onClick }) {
    const [className, setClassName] = useState('orderBoxNone')
    const [ orderArrow, setOrderArrow] = useState(null)

    const { orderChangeRecent, orderChangeFavorite } = onClick

    const handleClassChange = () => className === 'orderBoxNone'? setClassName('orderBox'): setClassName('orderBoxNone');

    function handleResize() {
        const length = window.innerWidth;
        
        if (length >= 768) {
            setOrderArrow(orderChangeArrow)
        } else if (length >= 375 && length < 768) {
            setOrderArrow(mobileOrderArrow);
        }
    }
       
    useEffect(() => {
        // 초기 사이즈 설정
        handleResize();
        
        // 윈도우 리사이즈 이벤트 핸들러 등록
        window.addEventListener("resize", handleResize);

        // 컴포넌트 언마운트 시 이벤트 핸들러 제거
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className='orderChange'>
            <div onClick={handleClassChange}>
                <p className='mobileOrderChange'>{orderName}</p>
                <img className='orderArrow' src={orderArrow} alt='화살표'/>
            </div>
            <div className={className}>
                <p className='orderRecent' onClick={orderChangeRecent}>최신순</p>
                <p className='orderLine'/>
                <p className='orderFavorite' onClick={orderChangeFavorite}>좋아요순</p>
            </div>
        </div>
    );
}

export default OrderChange;