import React from "react";
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

export const Appbar = () => {
  const Logout = () => {
    localStorage.removeItem("localJWT");
    window.location.href = "/";
  };
  return (
    <>
      <Box sx={{ flexGlow: 1 }}>
        <AppBar position="fixed" sx={{ width: "100%" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              日本語同音異義語クイズ
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* Navibar用 */}
      {/* <a href="https://www.vecteezy.com/free-vector/nature">
        Nature Vectors by Vecteezy
      </a> */}
    </>
  );
};
