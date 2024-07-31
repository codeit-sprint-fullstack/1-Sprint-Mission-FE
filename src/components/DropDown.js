import React, {
  useState,
  createContext,
  useContext,
  cloneElement,
} from "react";
import "../";
import "../assets/styles/dropDown.css";
import { deviceContext } from "../App";
import { MOBILE } from "../utils/constants";

const dropdownContext = createContext();

export function DropdownMenu({ children }) {
  const device = useContext(deviceContext);
  const { isOpened } = useContext(dropdownContext);

  let dropdownMenuClass = `flex-col Text-lg Regular dropdownMenue`;

  if (device === MOBILE) {
    dropdownMenuClass += " mobileMenu";
  }

  const arrChild = React.Children.toArray(children);
  const itemCount = arrChild.length;
  const meneHeight = itemCount * 4.2 + "rem";
  const menuHeightStyle = {
    height: meneHeight,
  };

  return (
    isOpened && (
      <div className={dropdownMenuClass} style={menuHeightStyle}>
        {arrChild.map((child, index) =>
          cloneElement(child, { isLast: index === itemCount - 1 })
        )}
      </div>
    )
  );
}

export function DropdownItem({ onClick, children, isLast }) {
  const { setIsOpened } = useContext(dropdownContext);

  let dropdownItemClass = `dropdownItem`;

  if (isLast) {
    dropdownItemClass += ` lastItem`;
  }

  const onItemClick = () => {
    setIsOpened(false);
    onClick();
  };

  return (
    <p className={dropdownItemClass} onClick={onItemClick}>
      {children}
    </p>
  );
}

export function DropdownToggle({ children }) {
  const device = useContext(deviceContext);
  const { toggleDropdown } = useContext(dropdownContext);

  const dropdownClass = `Text-lg Regular dropdownToggle`;

  return (
    <>
      <button className={dropdownClass} onClick={toggleDropdown}>
        {device === MOBILE ? "" : children}
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
    <dropdownContext.Provider value={{ isOpened, setIsOpened, toggleDropdown }}>
      <div className={dropdwonClass}>{children}</div>
    </dropdownContext.Provider>
  );
}

export default Dropdown;
