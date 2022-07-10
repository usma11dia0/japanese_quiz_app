import { FC } from "react";

import { BUTTONPROPS } from "../../types/components";
import styles from "./PrimaryButton.module.css";

export const PrimaryButton: FC<BUTTONPROPS> = (props) => {
  const { children, onClick, customSx } = props;
  return (
    <div className={styles.button} onClick={onClick} style={customSx}>
      {children}
    </div>
  );
};
