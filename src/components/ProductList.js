function formatDate(value) {
  const data = value.toLocaleString('ko');
  return data;
}

function ProductListItem({item, field}) {
  const { images, name, price, favoriteCount } = item;
  
  field += 'Item';

  return (
    <div className={field}>
      <img src={images} alt={name} />
      <div>
        <div className="name">{name}</div>
        <div className="price">{formatDate(price)}원</div>
        <div className="favoriteCount">♡ {favoriteCount}</div>
      </div>
    </div>
  )
}

function ProductList({items, field}) {
  field += 'List';
  return (
    <ul className={field}>
      {items.map((item) => (
         <li key={item.id}>
           <ProductListItem item={item} field={field}/>
         </li>
      ))}
    </ul>
  );
}

export default ProductList;