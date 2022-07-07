import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  createTheme,
  Grid,
  styled,
  ThemeProvider,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./QuizMenu.module.css";
import ErrorBoundary from "../../../components/ErrorBoundary";

import {
  fetchAsyncGetQuizzes,
  fetchAsyncGetChoices,
  selectQuizzes,
  selectChoices,
} from "../../quiz/quizSlice";

export const QuizMenu: FC = () => {
  return <div>QuizMenu</div>;
};
