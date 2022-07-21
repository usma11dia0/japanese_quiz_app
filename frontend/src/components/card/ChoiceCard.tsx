import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { brown } from "@mui/material/colors";

import styles from "./ChoiceCard.module.css";
import { CARDPROPS } from "../../types/components";
import { Container } from "@mui/system";

export const ChoiceCard: FC<CARDPROPS> = (props) => {
  const { children, customSx, imgSrc, isCorrect, onClick } = props;
  return (
    <Container maxWidth="sm">
      <Card sx={customSx} elevation={4}>
        <CardActionArea onClick={onClick}>
          <div className={styles.card}>
            <div className={styles.back}>
              <CardMedia
                component="img"
                image={imgSrc}
                alt="choice image"
                sx={{
                  padding: "2em",
                }}
              />
              <CardContent sx={{ color: "white", backgroundColor: brown[400] }}>
                <Typography
                  variant="h5"
                  component="div"
                  textAlign="center"
                  fontWeight="bold"
                >
                  {children}
                </Typography>
              </CardContent>
            </div>
            <div className={styles.front}>
              <CardMedia
                component="img"
                image={
                  isCorrect
                    ? "../../../assets/icon/correct_mark.jpg"
                    : "../../../assets/icon/incorrect_mark.jpg"
                }
                alt="correct_incorrect_icon"
                sx={{
                  padding: "2em",
                }}
              />
              <CardContent sx={{ color: "white", backgroundColor: "#00558f" }}>
                <Typography
                  variant="h5"
                  component="div"
                  textAlign="center"
                  fontWeight="bold"
                >
                  {isCorrect ? "正解" : "不正解"}
                </Typography>
              </CardContent>
            </div>
          </div>
        </CardActionArea>
      </Card>
    </Container>
  );
};
