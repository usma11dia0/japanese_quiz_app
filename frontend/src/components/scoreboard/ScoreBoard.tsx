import { Container, Typography } from "@mui/material";
import { FC } from "react";

import { SCOREBOARD_PROPS } from "../../types/components";
import styles from "./ScoreBoard.module.css";

export const ScoreBoard: FC<SCOREBOARD_PROPS> = (props) => {
  const { children } = props;
  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center" }}>
      <div className={styles.wrapper}>
        <div className={styles.scorebox}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ margin: "0", padding: "0" }}
          >
            {children}
          </Typography>
        </div>
      </div>
    </Container>
  );
};
