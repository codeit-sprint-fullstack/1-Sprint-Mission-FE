import { ButtonHTMLAttributes } from "react";

interface ButtonStyles {
  width: string;
  height: string;
  background: string;
  color: string;
  rounded: string;
  text: string;
  font: string;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
  styles: ButtonStyles;
}

export default function Button({ buttonText, styles, ...props }: ButtonProps) {
  const { width, height, color, rounded, text, font, background } = styles;

  return (
    <button
      style={{
        width,
        height,
        backgroundColor: background,
        color,
        borderRadius: rounded,
        fontSize: text,
        fontWeight: font,
      }}
      {...props}
    >
      {buttonText}
    </button>
  );
}
