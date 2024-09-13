import React, { useState, useRef, useEffect } from "react";
import styles from "./Input.module.css";
import Image from "next/image";

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input className={`${styles.input} ${className}`} ref={ref} {...props} />
  );
});

Input.displayName = "Input";

export const Select = React.forwardRef(
  ({ className, children, defaultValue = "최신순", ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isClosing, setIsClosing] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          closeDropdown();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    useEffect(() => {
      const defaultOption = React.Children.toArray(children).find(
        (child) => child.props.value === defaultValue
      );
      if (defaultOption && !selectedOption) {
        setSelectedOption(defaultOption);
        if (props.onChange) {
          props.onChange({ target: { value: defaultValue } });
        }
      }
    }, [children, defaultValue, props.onChange, selectedOption]);

    const toggleDropdown = () => {
      if (isOpen) {
        closeDropdown();
      } else {
        setIsOpen(true);
      }
    };

    const closeDropdown = () => {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      });
    };

    const handleOptionClick = (option) => {
      setSelectedOption(option);
      closeDropdown();
      if (props.onChange) {
        props.onChange({ target: { value: option.props.value } });
      }
    };

    return (
      <div className={`${styles.selectWrapper} ${className}`} ref={dropdownRef}>
        <div
          className={`${styles.selectHeader} ${isOpen ? styles.open : ""}`}
          onClick={toggleDropdown}
        >
          {selectedOption ? selectedOption.props.children : defaultValue}
          <Image
            src="/images/ic_arrow_down.svg"
            alt="Arrow Down"
            width={24}
            height={24}
          />
        </div>
        {isOpen && (
          <ul
            className={`${styles.optionList} ${
              isClosing ? styles.closing : ""
            }`}
          >
            {React.Children.map(children, (child) => (
              <li
                key={child.props.value}
                onClick={() => handleOptionClick(child)}
                className={`${styles.optionItem} ${
                  selectedOption === child ? styles.selected : ""
                }`}
              >
                {child.props.children}
              </li>
            ))}
          </ul>
        )}
        <select
          className={styles.hiddenSelect}
          ref={ref}
          {...props}
          value={selectedOption ? selectedOption.props.value : defaultValue}
          onChange={() => {}}
        >
          {children}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
