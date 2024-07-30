import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import api from "./api";

function BestProduct() {
    const [ items, setItems ] = useState([])
    const [ lodingError, setLodingError ] = useState(null)
    const [ lodingErrorTag, setLodingErrorTag] = useState(false)
    const [ pageSize, setPageSize ] = useState(null)
    
    //api 호출
    const handleItemList = async (params) => {
        try {
            setLodingError(null);
            setLodingErrorTag(false)
            const { list } = await api(params);
            setItems(list);
        } catch(e) {
            setLodingError(e);
            setLodingErrorTag(true)
            return;
        }
    };

    function handleResize() {
        const length = window.innerWidth;
        
        if (length >= 1200) {
            setPageSize(4);
        } else if (length < 1200 && length >= 768 ) {
            setPageSize(2);
        } else if (length >= 375 && length < 768) {
            setPageSize(1);
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

    //첫 랜더링 시 실행
    useEffect(() => {
        if (pageSize !== null) {
            handleItemList({ orderBy: 'favorite', pageSize: pageSize });
        }
    }, [ pageSize ])

    return (
        <>
        {lodingError?.message && <span>{lodingError.message}</span>}
        {lodingErrorTag || 
        <div className="ProductMobile">
            <div className='bestProductContaner'>
                <h2 className='productFont bestProductFont'>베스트 상품</h2>
                <ProductCard items={items} variant='bestProduct' />
            </div>

        </div>
        }
        </>
    );
}

export default BestProduct;