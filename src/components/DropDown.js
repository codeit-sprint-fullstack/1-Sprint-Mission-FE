import { useState } from "react";
import "../assets/styles/dropDown.css";

function DropDownItems({ className, items }) {
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

export function DropDown({dropItems})
{
  const [dropList, setDropList] = useState(false);

  return (
    <ul
      className="flex-col Text-lg Regular dropdown-product-sort"
      onClick={() => setDropList(!dropList)}
    >
      최신순
      {dropList && (
        <DropDownItems
          className="dropdown-product-sort-item"
          items={dropItems}
        />
      )}
    </ul>
  );
}

export default DropDown;
