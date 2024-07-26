import "../assets/styles/input.css";

export function Input({ inputClassName, imgClassName, children }) {

  return (
    <div className="flex-row input-frame">
      <input className={inputClassName} placeholder={children}></input>
      <img className={imgClassName}/>
    </div>
  );
}

export default Input;
