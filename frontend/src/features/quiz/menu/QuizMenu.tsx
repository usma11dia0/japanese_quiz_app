import { FC } from "react";
import { Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";

import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { useNavigate } from "react-router-dom";

export const QuizMenu: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h2" mt={0}>
        日本語
      </Typography>
      <Typography variant="h2" mt={2}>
        同音異義語クイズ
      </Typography>

      <PrimaryButton
        onClick={() => navigate("/quizzes/questions")}
        customSx={{ marginTop: "70px" }}
      >
        聞き分け練習
      </PrimaryButton>

      <PrimaryButton
        onClick={() => navigate("/quizzes/pronunciation")}
        customSx={{ marginTop: "50px" }}
      >
        発声練習
      </PrimaryButton>
    </>
  );
};
