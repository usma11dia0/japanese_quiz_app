import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { Box } from "@mui/system";

import { FinalScreen } from "./pages/FinalScreen";
import { Questions } from "./pages/Questions";
import { Settings } from "./pages/Settings";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Routes>
            <Route path="/" element={<Settings />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/score" element={<FinalScreen />} />
          </Routes>
        </Box>
      </Container>
    </ErrorBoundary>
  );
}

export default App;
