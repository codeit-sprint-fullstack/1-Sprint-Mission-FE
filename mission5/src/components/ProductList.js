import './ProductList.css';

function ProductBest({item, setOrderBy, setPageSize}) {
  const ORDER = 'favorite';
  const LIMIT = 4;
  setOrderBy(ORDER);
  setPageSize(LIMIT);
  return (
    <div className='BestProduct-item '>
      <img src={item.images} alt={item.name} />
      <div className='BestProduct-content '>
        <div className='description'>{item.description}</div>
        <div className='price'>{(item.price).toLocaleString()}원</div>
        <div className='favoriteCount'><span> ♡ </span>{item.favoriteCount}</div>
      </div>
    </div>
  );
}

function ProductList({items, setOrderBy, setPageSize}) {
  return (
    <div className='ProductList'>
     
        <div className='BestProduct-container'>
          <h3 className='BestProduct-Title'>베스트 상품</h3>
          <div className='BestProduct-items'>
            {items.map((item) => {
                return (
                  <ProductBest 
                  key={item.id} 
                  item={item} 
                  setOrderBy={setOrderBy} 
                  setPageSize={setPageSize}/>
                );
              })}
          </div>
        </div>

        <div className='OnSaleProduct-container'>
          
        </div>
    </div>
  );
}

export default ProductList;