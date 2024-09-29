import classNames from "classnames";

export default function SimpleModal({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  const modalTextClass = classNames(
    "text-2lg",
    "text-gray-800",
    "leading-26",
    "medium"
  );

  return (
    <div className="simple-modal">
      <p className={modalTextClass}>{children}</p>
      <button className="btn-simple-modal" onClick={onClose} />
    </div>
  );
}
