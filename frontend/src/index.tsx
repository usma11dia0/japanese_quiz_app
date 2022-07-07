import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import reportWebVitals from "./reportWebVitals";

import App from "./App";
import { Auth } from "./features/auth/Auth";
import { store } from "./app/store";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";

const container = document.getElementById("root")!;
const root = createRoot(container);

let theme = createTheme({
  typography: {
    fontFamily: ["Kameron", "serif", "Noto Sans JP", "sans-serif"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: "Kameron", "serif";
          font-family: 'Noto Sans JP', sans-serif;
      `,
    },
  },
});
theme = responsiveFontSizes(theme);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/quizzes/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
