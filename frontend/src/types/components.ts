import { ReactNode } from "react";

export interface BUTTONPROPS {
  children: ReactNode;
  customSx?: STYLEPROPATY;
  onClick?: () => void;
}

export interface CARDPROPS {
  children: ReactNode;
  customSx?: STYLEPROPATY;
  imgSrc?: string;
  onClick?: () => void;
}

export interface STYLEPROPATY {
  [propaty: string]: string | number;
}
