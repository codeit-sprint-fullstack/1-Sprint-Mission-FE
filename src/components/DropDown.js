import { useState, createContext, useContext } from "react";
import "../assets/styles/dropDown.css";

// function DropDownItems({ className, items }) {
//   const lastIndex = items.length - 1;

//   return (
//     <>
//       {items.map((item, index) => {
//         let liClass = className;
//         if (index === 0) {
//           liClass += " firstDropItem";
//         } else if (index === lastIndex) {
//           liClass += " lastDropItem";
//         }

//         return (
//           <li key={item.id} className={liClass} onClick={() => item.func()}>
//             {item.label}
//           </li>
//         );
//       })}
//     </>
//   );
// }

// export function DropDown({ dropItems }) {
//   const [dropList, setDropList] = useState(false);

//   return (
//     <ul
//       className="flex-col Text-lg Regular dropdown-product-sort"
//       onClick={() => setDropList(!dropList)}
//     >
//       최신순
//       {dropList && (
//         <DropDownItems
//           className="dropdown-product-sort-item"
//           items={dropItems}
//         />
//       )}
//     </ul>
//   );
// }
const DropdownContext = createContext();

export function DropdownMenu({ children }) {
  const { isOpened } = useContext(DropdownContext);

  const dropdownMenuClass = `flex-col dropdownMenue`;

  return isOpened && <div className={dropdownMenuClass}>{children}</div>;
}

export function DropdownItem({ onClick, children }) {
  const { setIsOpened } = useContext(DropdownContext);
  const dropdownItemClass = `Text-lg Regular dropdownItem`;

  const onItemClick = () => {
    setIsOpened();
    onClick();
  };

  return (
    <a className={dropdownItemClass} onClick={onItemClick}>
      {children}
    </a>
  );
}

export function DropdownToggle({ children }) {
  const { toggleDropdown } = useContext(DropdownContext);

  const dropdownClass = `Text-lg Regular dropdown`;

  return (
    <>
      <button className={dropdownClass} onClick={toggleDropdown}>
        {children}
      </button>
    </>
  );
}

export function Dropdown({ children }) {
  const [isOpened, setIsOpened] = useState(false);

  const toggleDropdown = () => {
    console.log(isOpened);
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  return (
    <DropdownContext.Provider value={{ isOpened, setIsOpened, toggleDropdown }}>
      <div>{children}</div>
    </DropdownContext.Provider>
  );
}

export default Dropdown;
