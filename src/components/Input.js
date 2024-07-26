import "../assets/styles/input.css";

export function Input({
  onChange,
  onEnter,
  inputClassName,
  imgClassName,
  children,
}) {
  const inputChange = (e) => onChange(e);
  const inputEnter = (e) => {
    if (e.key === "Enter") {
      return onEnter();
    }
  };

  return (
    <div className="flex-row input-frame">
      <input
        onChange={inputChange}
        onKeyDown={inputEnter}
        className={inputClassName}
        placeholder={children}
      ></input>
      <img className={imgClassName} />
    </div>
  );
}

export default Input;
