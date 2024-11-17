interface ButtonProps {
  mode?: "large" | "medium";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  mode = "large",
  disabled = false,
  children,
  onClick,
  className = "",
}: ButtonProps) {
  const modeStyles = {
    large: "w-[357px] h-[56px] py-4 px-[124px] text-[20px]",
    medium: "w-[240px] h-[48px] py-3 px-[71px] text-[18px]",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${modeStyles[mode]} flex items-center justify-center rounded-[40px] font-[600] text-secondary-100 transition-colors ${
        disabled
          ? "cursor-not-allowed bg-secondary-400"
          : "bg-primary-100 hover:bg-primary-200 active:bg-primary-300"
      } text-white ${className}`}
    >
      {children}
    </button>
  );
}
