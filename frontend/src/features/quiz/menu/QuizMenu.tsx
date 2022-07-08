import { FC } from "react";
import { Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./QuizMenu.module.css";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { useNavigate } from "react-router-dom";

export const QuizMenu: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h2" fontWeight="bold" mt={15}>
        日本語
      </Typography>
      <Typography variant="h2" fontWeight="bold" mt={2}>
        同音異義語クイズ
      </Typography>
      <PrimaryButton onClick={() => navigate("/")}>テスト</PrimaryButton>
    </>
  );
};
