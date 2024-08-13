import "../assets/styles/tag.css";

export function Tag({ onXClick, children }) {
  const onClick = () => onXClick(children);

  return (
    <div className="Text-lg-line-height24 Regular tag">
      #{children} <button className="btn-delete-tag" onClick={onClick}></button>
    </div>
  );
}

export default Tag;
