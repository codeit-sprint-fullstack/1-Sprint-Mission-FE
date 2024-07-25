import "../assets/styles/dropList.css";

export function DropList({ className, items }) {
  const lastIndex = items.length - 1;

  return (
    <>
      {items.map((item, index) => {
        let liClass = className;
        if (index === 0) {
          liClass += " firstDropItem";
        } else if (index === lastIndex) {
          liClass += " lastDropItem";
        }

        return (
          <button key={item.id} className={liClass} onClick={() => item.func()}>
            {item.label}
          </button>
        );
      })}
    </>
  );
}

export default DropList;
