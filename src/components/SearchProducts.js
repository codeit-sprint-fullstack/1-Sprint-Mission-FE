import "../assets/styles/SearchProducts.css";

export function SearchProducts({
  searchClassName,
  onChange,
  onSubmit,
  inputClassName,
  imgClassName,
  children,
}) {
  const inputChange = (e) => onChange(e);

  const submit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const searchClass = `flex-row search-frame ${searchClassName}`;

  return (
    <form className={searchClass} onSubmit={submit}>
      <input
        onChange={inputChange}
        className={inputClassName}
        placeholder={children}
      ></input>
      <img className={imgClassName} />
    </form>
  );
}

export default SearchProducts;
