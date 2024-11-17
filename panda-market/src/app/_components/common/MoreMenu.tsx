"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

interface MenuItem {
  label: string;
  onClick: () => void;
  variant?: "danger" | "default";
}

interface MoreMenuProps {
  items: MenuItem[];
  buttonClassName?: string;
}

export function MoreMenu({ items, buttonClassName = "" }: MoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (onClick: () => void) => {
    setIsOpen(false);
    onClick();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full p-2 text-secondary-400 hover:bg-secondary-50 ${buttonClassName}`}
        aria-label="더보기 메뉴"
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-32 rounded-lg border bg-white shadow-lg">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item.onClick)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-secondary-50 ${
                item.variant === "danger"
                  ? "text-error-red"
                  : "text-secondary-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
