import { useState, createContext, useContext } from "react";
import "../";
import "../assets/styles/dropDown.css";
import { deviceContext } from "../App";

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
  const device = useContext(deviceContext);
  const { toggleDropdown } = useContext(DropdownContext);

  const dropdownClass = `Text-lg Regular dropdownToggle`;

  return (
    <>
      <button className={dropdownClass} onClick={toggleDropdown}>
        {device === 2 ? "" : children}
      </button>
    </>
  );
}

export function Dropdown({ dropdwonClass, children }) {
  const [isOpened, setIsOpened] = useState(false);

  const toggleDropdown = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  return (
    <DropdownContext.Provider value={{ isOpened, setIsOpened, toggleDropdown }}>
      <div className={dropdwonClass}>{children}</div>
    </DropdownContext.Provider>
  );
}

export default Dropdown;
