function formatDate(value) {
  const data = value.toLocaleString('ko');
  return data;
}

function ProductListItem({item, field}) {
  const { images, name, price, favoriteCount } = item;

  return (
    <div className={`${field}ListItem`}>
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
  return (
    <ul className={`${field}List`}>
      {items.map((item) => (
         <li key={item.id}>
           <ProductListItem item={item} field={field}/>
         </li>
      ))}
    </ul>
  );
}

export default ProductList;