import heartIcon from './img/heartIcon.png'

// ProductCard의 내부 jsx
function ProductCardList({ item, variant }) { 
    
    //상위 컴포넌트에 따른 css 적용
    const className = [];
    if (variant === 'bestProduct') {
        className.push('bestProductImg')
        className.push('productName productColor bestProductName')
    } else if (variant === 'saleProduct') {
        className.push('saleProductImg')
        className.push('productName productColor saleProductName')
    }

    //글자 수 20 넘을 시
    let itemName;
    if(variant === 'saleProduct' && item.name.length >= 20) {
        itemName = `${item.name.slice(0, 19)}...`
    } else {
        itemName = item.name;
    }


    return (
        <div>
            <img className={className[0]} src={item.images[0]} alt={item.tags} />
            <div>
                <h3 className={className[1]}>{itemName}</h3>
                <p className='productPrice productColor'>{item.price.toLocaleString("en-US")}</p>
                <div className='productFavoriteContaner'>
                    <img className='heartIcon' src={heartIcon} alt='하트 아이콘' />
                    <p className='productFavoriteCount'>{item.favoriteCount}</p>
                </div>
            </div>
        </div>
    );
} 

function ProductCard({ items, variant }) {

    //상위 컴포넌트에 따른 css 적용
    const className = [];
    if (variant === 'bestProduct') {
        className.push('bestProductCardContaner')
        className.push('bestProductCard')
    } else if (variant === 'saleProduct') {
        className.push('saleProductCardContaner')
        className.push('saleProductCard')
    }

    return (
        <ol className={className[0]}>
            {items.map((item) => (
                <li className={className[1]} key={item.id}>
                    <ProductCardList item={item} variant={variant}/>
                </li>
            ))}
        </ol>
    );
}

export default ProductCard;