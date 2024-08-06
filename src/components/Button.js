import "../assets/styles/button.css";

export function Button({ className, onClick, children }) {
  const buttonClick = () => onClick();

  const btnClass = `${className}`;

  return (
    <>
      <button className={btnClass} onClick={buttonClick}>
        {children}
      </button>
    </>
  );
}

export default Button;
