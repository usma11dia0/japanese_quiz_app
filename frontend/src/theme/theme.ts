import { createTheme, responsiveFontSizes } from "@mui/material";
import { brown } from "@mui/material/colors";

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
  palette: {
    primary: {
      main: brown["A400"],
      // contrastText: grey[800],
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
