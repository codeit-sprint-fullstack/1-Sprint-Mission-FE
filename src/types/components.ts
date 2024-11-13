import { ReactNode } from "react";

export interface MiddleBannerProps {
  isLeftImage: boolean;
  imagePath: string;
  textSetWidth: string;
  topText: string;
  middleText: string;
  bottomText: string;
}

export interface DropdownProps {
  dropdwonClass?: string;
  minimise?: string | boolean;
  children: ReactNode;
}
