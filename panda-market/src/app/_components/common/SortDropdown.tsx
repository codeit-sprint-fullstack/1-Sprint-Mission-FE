"use client";

import { ChevronDown, ArrowDownWideNarrow } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type SortOption = "latest" | "likes";

interface SortValue {
  value: SortOption;
  label: string;
}

const SORT_OPTIONS: SortValue[] = [
  { value: "latest", label: "최신순" },
  { value: "likes", label: "좋아요 순" },
];

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLabel = SORT_OPTIONS.find(
    (option) => option.value === value,
  )?.label;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-12 tablet:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border-secondary-300 flex h-11 w-full items-center justify-center rounded-md border bg-white p-2 text-sm hover:bg-secondary-50 tablet:px-4 tablet:py-2"
      >
        <span className="hidden pr-1 tablet:inline">{currentLabel}</span>
        <ArrowDownWideNarrow className="h-5 w-5 tablet:hidden" />
        <ChevronDown
          className={`hidden h-4 w-4 transition-transform tablet:inline ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 z-50 mt-1 w-36 overflow-hidden rounded-xl border border-secondary-200 bg-white shadow-lg"
          >
            <ul className="m-0 list-none p-0">
              {SORT_OPTIONS.map((option, index) => (
                <li
                  key={option.value}
                  className={`font-normal hover:bg-secondary-100 ${
                    index === 0 ? "rounded-t-xl" : ""
                  } ${
                    index === SORT_OPTIONS.length - 1
                      ? "rounded-b-xl"
                      : "border-b border-secondary-200"
                  }`}
                >
                  <button
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className="w-full rounded-[12px] px-4 py-2 text-[16px]"
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
