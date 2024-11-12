"use client";

import React, {
  useState,
  createContext,
  useContext,
  cloneElement,
  ReactNode,
  ReactElement,
} from "react";
import classNames from "classnames";

import { DropdownProps } from "../../types/components";

import style from "./dropdown.module.css";

const DROPDOWN_ITEM_HEIGHT = 4.2; // 4.2rem

interface DropdownContextProps {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDropdown: () => void;
}

interface DropdownItemProps {
  onClick: () => void;
  children: ReactNode;
  isLast?: boolean;
}

const dropdownContext = createContext<DropdownContextProps | undefined>(
  undefined
);

export function DropdownMenu({ children }: { children: ReactNode }) {
  const context = useContext(dropdownContext);

  if (!context) {
    throw new Error("DropdownMenu must be used within a Dropdown");
  }

  const { isOpened } = context;

  let dropdownMenuClass = classNames(
    "flex",
    "flex-col",
    "justify-between",
    "relative",
    "bg-white",
    "box-border",
    "border-1",
    "border-gray-200",
    "rounded-xl",
    "overflow-hidden",
    "z-30",
    "w-dropdown",
    "top-0.8rem",
    "mobile:top-mobile-dropdown-menu-top",
    "mobile:left-mobile-dropdown-menu-left"
  );

  const arrChild = React.Children.toArray(children) as ReactElement[];
  const itemCount = arrChild.length;
  const meneHeight = itemCount * DROPDOWN_ITEM_HEIGHT + "rem";
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

export function DropdownItem({ onClick, children, isLast }: DropdownItemProps) {
  const context = useContext(dropdownContext);

  if (!context) {
    throw new Error("DropdownItem must be used within a Dropdown");
  }

  const { setIsOpened } = context;

  let dropdownItemClass = classNames(
    "box-border",
    "place-content-center",
    "text-center",
    "font-normal",
    "text-lg",
    "text-gray-800",
    "leading-26",
    "cursor-pointer"
  );

  if (!isLast) {
    dropdownItemClass = classNames(
      dropdownItemClass,
      "border-b-1",
      "border-b-gray-200"
    );
  }

  const itemHeight = DROPDOWN_ITEM_HEIGHT + "rem";
  const itemHeightStyle = {
    height: itemHeight,
  };

  const onItemClick = () => {
    setIsOpened(false);
    onClick();
  };

  return (
    <p
      className={dropdownItemClass}
      style={itemHeightStyle}
      onClick={onItemClick}
    >
      {children}
    </p>
  );
}

export function DropdownToggle({ children }: { children: ReactNode }) {
  const context = useContext(dropdownContext);

  if (!context) {
    throw new Error("DropdownToggle must be used within a Dropdown");
  }

  const { toggleDropdown } = context;

  const dropdownToggleClass = classNames(
    "box-border",
    "px-2rem",
    "border-1",
    "border-gray-200",
    "rounded-xl",
    "w-dropdown",
    "h-dropdown",
    "bg-white",
    "text-start",
    "font-normal",
    "text-lg",
    "text-gray-800",
    "leading-26",
    "relative",
    "mobile:text-transparent",
    "mobile:border-none",
    "mobile:w-mobile-dropdown-toggle",
    style["dropdown-toggle"]
  );

  return (
    <>
      <button className={dropdownToggleClass} onClick={toggleDropdown}>
        {children}
      </button>
    </>
  );
}

export function Dropdown({ dropdwonClass, minimise, children }: DropdownProps) {
  const [isOpened, setIsOpened] = useState(false);

  if (minimise) {
    dropdwonClass = classNames("mobile:w-4.2rem");
  }

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
