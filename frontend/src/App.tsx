import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { FinalScreen } from "./pages/FinalScreen";
import { Questions } from "./pages/Questions";
import { Settings } from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Routes>
            <Route path="/" element={<Settings />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/score" element={<FinalScreen />} />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  );
}

export default App;
