import { useNavigate } from 'react-router-dom';

export function ItemsTextBox({ Children }) {
  return <div className="title">{Children}</div>;
}

export function Items({ item }) {
  return (
    <div className="item-box">
      <img
        className="item-img"
        src={
          'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpreviews.123rf.com%2Fimages%2Fjulynx%2Fjulynx1408%2Fjulynx140800023%2F30746516-%25EC%2582%25AC%25EC%259A%25A9%25ED%2595%25A0-%25EC%2588%2598-%25EC%2597%2586%25EA%25B1%25B0%25EB%2582%2598-%25EC%259D%25B4%25EB%25AF%25B8%25EC%25A7%2580-%25EC%2582%25AC%25EC%25A7%2584-%25EC%2597%2586%25EC%259D%258C.jpg&type=sc960_832'
        }
        alt={item.name}
      />
      <div className="item-name">{item.name}</div>
      <div className="item-price">{item.price}원</div>
      <div className="item-favorite-count">
        <div className="favorite" />
        {item.favoriteCount}
      </div>
    </div>
  );
}

export function ItemList({ items }) {
  return (
    <div className="grid-box">
      {items.map((item) => {
        return <Items key={item.id} item={item}></Items>;
      })}
    </div>
  );
}

export function InputTemplete({ input }) {
  const {
    inputName,
    inputTitle,
    type,
    errMessage,
    textarea,
    placeholder,
    onChange,
  } = input;
  return (
    <>
      <label htmlFor={inputName}>{inputTitle}</label>
      {textarea ? (
        <textarea
          type={type}
          id={inputName}
          name={inputName}
          placeholder={placeholder}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          type={type}
          id={inputName}
          name={inputName}
          placeholder={placeholder}
          onChange={onChange}
        ></input>
      )}
      <div className="err-text">{errMessage}</div>
    </>
  );
}

export const Button = ({ path, name, text }) => {
  const navigate = useNavigate();

  const btnClick = () => {
    navigate(path);
  };
  return (
    <button className={name} onClick={btnClick}>
      {text}
    </button>
  );
};
