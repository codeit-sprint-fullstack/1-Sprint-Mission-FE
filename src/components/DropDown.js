import { useState, createContext, useContext } from "react";
import "../assets/styles/dropDown.css";

const DropdownContext = createContext();

export function DropdownMenu({ children }) {
  const { isOpened } = useContext(DropdownContext);

  const dropdownMenuClass = `flex-col Text-lg Regular  dropdownMenue`;

  return isOpened && <div className={dropdownMenuClass}>{children}</div>;
}

export function DropdownItem({ onClick, children }) {
  const { setIsOpened } = useContext(DropdownContext);
  const dropdownItemClass = `dropdownItem`;

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

  const dropdownClass = `Text-lg Regular dropdownToggle`;

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
