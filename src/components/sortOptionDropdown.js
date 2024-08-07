import React, { useState, useCallback, useMemo } from "react";
import "assets/styles/App.css";
import arrow from "assets/images/upside-arrow.png";

const SortingOptionBox = React.memo(
  ({ onChange, selectedOption, setCurrentPage, sortingOptions }) => {
    const [isOpen, setIsOpen] = useState(false);

    const currentOption = useMemo(() => {
      return (
        sortingOptions.find((option) => option.value === selectedOption)
          ?.value ||
        (sortingOptions[0]?.value ?? "Select Option")
      );
    }, [selectedOption, sortingOptions]);

    const innerText = useMemo(() => {
      return (
        sortingOptions.find((option) => option.value === currentOption)
          ?.label || "정렬기준 없음"
      );
    }, [currentOption, sortingOptions]);

    const toggleDropdown = useCallback(() => {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }, []);

    const selectOption = useCallback(
      (option) => {
        onChange(option);
        setIsOpen(false);
        setCurrentPage(1);
      },
      [onChange, setCurrentPage]
    );

    return (
      <div className="dropdown">
        <li
          className="dropdown-toggle"
          onClick={toggleDropdown}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {innerText}
          <img
            className={`arrow ${isOpen ? "up" : ""}`}
            src={arrow}
            alt="arrow"
          />
        </li>
        {isOpen && (
          <ul
            className={`dropdown-menu ${isOpen ? "show" : ""}`}
            role="listbox"
          >
            {sortingOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => selectOption(option.value)}
                role="option"
                aria-selected={option.value === currentOption}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

export default SortingOptionBox;
