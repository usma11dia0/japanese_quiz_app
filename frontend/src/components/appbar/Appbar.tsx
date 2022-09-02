import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";

import styles from "./Appbar.module.css";

export const Appbar = () => {
  const navigate = useNavigate();

  const handleClickLogout = () => {
    localStorage.removeItem("localJWT");
    window.location.href = "/";
  };

  const handleClickToMenu = () => {
    navigate("/quizzes");
    // store内のRedux stateをリセット
    window.location.reload();
  };

  return (
    <>
      <Box sx={{ flexGlow: 1 }}>
        <AppBar position="fixed" sx={{ width: "100%", opacity: "0.9" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 0, top: "4px" }}
              disableRipple={true}
            >
              <Link to="/quizzes/" style={{ textDecoration: "none" }}>
                <img
                  src="../../../assets/icon/favicon.jpg"
                  alt="favicon"
                  className={styles.topbarImg}
                />
              </Link>
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              mt={-0.2}
              onClick={handleClickToMenu}
            >
              日本語同音異義語クイズ
            </Typography>
            <Box
              onClick={handleClickLogout}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <LogoutIcon />
              <Button
                color="inherit"
                sx={{ paddingLeft: "3px", justifyContent: "flex-start" }}
              >
                <Typography variant="h5" component="div" mt={-0.5}>
                  退出
                </Typography>
              </Button>
            </Box>
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
