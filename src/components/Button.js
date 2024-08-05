import "../assets/styles/button.css";

export function Button({ className, onClick, children }) {
  const buttonClick = () => onClick();

  return (
    <>
      <button className={className} onClick={buttonClick}>
        {children}
      </button>
    </>
  );
}

export default Button;
