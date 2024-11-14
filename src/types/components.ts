import { ReactNode } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

export interface MiddleBannerProps {
  isLeftImage: boolean;
  imagePath: string;
  textSetWidth: string;
  topText: string;
  middleText: string;
  bottomText: string;
}

export interface InputEmailProps {
  register: UseFormRegister<{ [key: string]: string }>;
  errors: FieldErrors<{ email?: string }>;
}

export interface InputPasswordProps {
  register: UseFormRegister<{ [key: string]: string }>;
  errors: FieldErrors<{ password?: string }>;
}

export interface InputNicknameProps {
  register: UseFormRegister<{ [key: string]: string }>;
  errors: FieldErrors<{ nickname?: string }>;
}

export interface InputPasswordConfirmProps {
  register: UseFormRegister<{ [key: string]: string }>;
  errors: FieldErrors<{ password?: string; passwordConfirm?: string }>;
}

export interface SignBottomTextProps {
  message: string;
  linkText: string;
  linkPath: string;
}

export interface DropdownProps {
  dropdwonClass?: string;
  minimise?: string | boolean;
  children: ReactNode;
}
