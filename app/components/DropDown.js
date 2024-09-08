"use client";

import React, {
  useState,
  createContext,
  useContext,
  cloneElement,
} from "react";

import { DeviceContext } from "../components/DeviceProvider";

import { MOBILE } from "../constants/device";

import style from "./dropdown.module.css";

const dropdownContext = createContext();

export function DropdownMenu({ children }) {
  const { device } = useContext(DeviceContext);
  const { isOpened } = useContext(dropdownContext);

  let dropdownMenuClass = `flex flex-col font-normal ${style["dropdown-menu"]}`;

  if (device === MOBILE) {
    dropdownMenuClass += ` ${style["mobile-menu"]}`;
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

  let dropdownItemClass = `${style["dropdown-item"]}`;

  if (isLast) {
    dropdownItemClass += ` ${style["last-item"]}`;
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
  const { device } = useContext(DeviceContext);
  const { toggleDropdown } = useContext(dropdownContext);

  const dropdownClass = `font-normal ${style["dropdown-toggle"]}`;

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
