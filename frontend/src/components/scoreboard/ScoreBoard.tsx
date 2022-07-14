import { Container, Typography } from "@mui/material";
import styles from "./ScoreBoard.module.css";

export const ScoreBoard = () => {
  return (
    <Container maxWidth="sm">
      <div className={styles.wrapper}>
        <div className={styles.box17}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ margin: "0", padding: "0" }}
          >
            得点 3/5
          </Typography>
        </div>
      </div>
    </Container>
  );
};
