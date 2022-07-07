import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Box, Container } from "@mui/system";

import { FinalScreen } from "./pages/FinalScreen";
import { Questions } from "./pages/Questions";
import { Settings } from "./pages/Settings";
import ErrorBoundary from "./components/ErrorBoundary";

import { QuizMenu } from "./features/quiz/menu/QuizMenu";
import { QuizQuestion } from "./features/quiz/question/QuizQuestion";
import { QuizResult } from "./features/quiz/result/QuizResult";
import { Auth } from "./features/auth/Auth";
import { createTheme, styled } from "@mui/material";
import { url } from "inspector";
import { CorporateFareRounded } from "@mui/icons-material";

const App: FC = () => {
  const jwt = localStorage.getItem("localJWT");

  const CustomContainer = styled("div")({
    width: "auto",
    minHeight: "100vh",
    backgroundImage: `url(
      "../assets/background/New_Years_Card_254_D.jpg"
    )`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  });

  return (
    <ErrorBoundary>
      <CustomContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "sm",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
            // mt: 12,
          }}
          // textAlign="center"
        >
          <Routes>
            <Route path="/" element={jwt ? <QuizMenu /> : <Auth />} />
            <Route path="/setting" element={<Settings />} />
            <Route path="/questions" element={jwt ? <Questions /> : <Auth />} />
            <Route path="/score" element={jwt ? <FinalScreen /> : <Auth />} />
            {/* <Route
              path="/pron_practice"
              element={jwt ? <Practice /> : <Auth />}
            /> */}
          </Routes>
        </Box>
      </CustomContainer>
    </ErrorBoundary>
  );
};

export default App;
