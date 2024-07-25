import "../assets/styles/input.css";

export function Input({ className, defaultText }) {
  return (
    <>
      <input className={className}>{defaultText}</input>
    </>
  );
}

export default Input;
