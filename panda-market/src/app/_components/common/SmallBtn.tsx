import Link from "next/link";
import clsx from "clsx";

interface ButtonProps {
  mode?: "40" | "48";
  disabled?: boolean;
  onClick?: (e?: React.FormEvent) => void;
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "outline" | "danger";
  className?: string;
}

export default function Button({
  mode = "40",
  disabled = false,
  children,
  onClick,
  href,
  type = "button",
  variant = "default",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "flex items-center justify-center rounded-lg font-semibold transition-colors w-[92px]";

  const heightStyles = {
    "40": "h-10",
    "48": "h-12",
  };

  const variantStyles = {
    default: clsx(
      "px-6",
      disabled
        ? "bg-secondary-400 text-white cursor-not-allowed"
        : "bg-primary-100 hover:bg-primary-200 active:bg-primary-300 text-white",
    ),
    outline: clsx(
      "px-6",
      disabled
        ? "border border-secondary-400 text-secondary-400 cursor-not-allowed"
        : "border border-primary-100 text-primary-100 hover:bg-primary-50 active:bg-primary-100 active:text-white",
    ),
    danger: clsx(
      "px-6",
      disabled
        ? "bg-red-300 text-white cursor-not-allowed"
        : "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white",
    ),
  };

  const combinedClassName = clsx(
    baseStyles,
    heightStyles[mode],
    variantStyles[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
