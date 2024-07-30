import React, { useState, useCallback, useMemo } from "react";
import "assets/styles/App.css";
import arrow from "assets/images/ic_sort.png";

const SortingOptionBoxSmall = React.memo(
  ({ onChange, setCurrentPage, sortingOptions }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Memoize the current option for display purposes
    const currentOption = useMemo(() => {
      return (
        sortingOptions.find(
          (option) => option.value === sortingOptions[0]?.value
        )?.value || "Select Option"
      );
    }, [sortingOptions]);

    // Toggle the dropdown visibility
    const toggleDropdown = useCallback(() => {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }, []);

    // Handle option selection
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
        <button
          className="dropdown-toggle small"
          onClick={toggleDropdown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <img src={arrow} alt="Sort options" />
        </button>
        {isOpen && (
          <ul
            className={`dropdown-menu-small ${isOpen ? "show" : ""}`}
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

export default SortingOptionBoxSmall;
