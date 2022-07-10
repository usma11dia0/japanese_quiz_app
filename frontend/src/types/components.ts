import { ReactNode } from "react";

export interface BUTTONPROPS {
  children: ReactNode;
  onClick?: () => void;
  customSx?: STYLEPROPATY;
}

export interface CARDPROPS {
  children: ReactNode;
  onClick?: () => void;
  customSx?: STYLEPROPATY;
}

export interface STYLEPROPATY {
  [propaty: string]: string | number;
}
