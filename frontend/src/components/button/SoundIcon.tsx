import { FC } from "react";
import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import { BUTTON_PROPS } from "../../types/components";
import styles from "./SoundIcon.module.css";

export const SoundIcon: FC<BUTTON_PROPS> = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      aria-label="play volume"
      disableRipple={true}
      onClick={onClick}
      className="sound-icon"
    >
      <VolumeUpIcon
        color="primary"
        className={styles.volumeUpIcon}
        sx={{ marginTop: "2", fontSize: "40px" }}
      />
    </IconButton>
  );
};
