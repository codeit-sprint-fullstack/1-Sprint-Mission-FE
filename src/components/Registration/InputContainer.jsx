import './InputContainer.css';

export default function InputContainer({ children, className }) {
  const classNames = `InputContainer ${className}`;
  return <div className={classNames}>{children}</div>;
}
