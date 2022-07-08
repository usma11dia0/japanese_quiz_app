import { FC } from "react";

import { ButtonProps } from "../../types/components";
import styles from "./PrimaryButton.module.css";

export const PrimaryButton: FC<ButtonProps> = (props) => {
  const { children, onClick } = props;
  return (
    <div className={styles.button} onClick={onClick}>
      {children}
    </div>
  );
};
