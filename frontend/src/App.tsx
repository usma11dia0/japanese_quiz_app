import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/system";
import { Container, Grid, styled } from "@mui/material";

import ErrorBoundary from "./components/ErrorBoundary";
// import { Questions } from "./pages/Questions";
// import { Settings } from "./pages/Settings";
import { QuizMenu } from "./features/quiz/menu/QuizMenu";
import { QuizQuestion } from "./features/quiz/question/QuizQuestion";
// import { QuizResult } from "./features/quiz/result/QuizResult";
import { Auth } from "./features/auth/Auth";
import { Appbar } from "./components/appbar/Appbar";
import { QuizResult } from "./features/quiz/result/QuizResult";

const App: FC = () => {
  const jwt = localStorage.getItem("localJWT");

  const BackgroundContainer = styled("div")({
    // width: "auto",
    // minheight: "100vh",
    // backgroundImage: `url(
    //   "../assets/background/japanese-paper_00372.jpg"
    // )`,
    // backgroundSize: "cover",
    // backgroundPosition: "center",
  });

  return (
    <ErrorBoundary>
      <Appbar />
      <BackgroundContainer>
        <Grid container spacing={0}>
          <Grid item xs />
          <Grid item xs={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
                mt: 12,
                minheight: "100vh",
              }}
            >
              <Routes>
                <Route path="/" element={jwt ? <QuizMenu /> : <Auth />} />
                {/* <Route path="/setting" element={<Settings />} /> */}
                <Route
                  path="/questions"
                  element={jwt ? <QuizQuestion /> : <Auth />}
                />
                <Route
                  path="/result"
                  element={jwt ? <QuizResult /> : <Auth />}
                />
                {/* <Route
                  path="/score"
                  element={jwt ? <FinalScreen /> : <Auth />}
                /> */}
                {/* <Route
              path="/pron_practice"
              element={jwt ? <Practice /> : <Auth />}
            /> */}
              </Routes>
            </Box>
          </Grid>
          <Grid item xs />
        </Grid>
      </BackgroundContainer>
    </ErrorBoundary>
  );
};

export default App;
