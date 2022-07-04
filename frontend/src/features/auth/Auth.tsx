import React, { ChangeEvent, FC, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import styles from ".Auth.module.css";
import { AppDispatch } from "../../app/store";
import {
  toggleMode,
  fetchAsyncLogin,
  fetchAsyncRegister,
  selectIsLoginView,
} from "./authSlice";
import { CRED } from "../types";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    matgin: theme.spacing(3),
  },
}));

export const Auth: FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const isLoginView = useSelector(selectIsLoginView);
  const [credential, setCredential] = useState<CRED>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setCredential({ ...credential, [name]: value });
  };
  const login = async () => {
    if (isLoginView) {
      await dispatch(fetchAsyncLogin(credential));
    } else {
      const result = await dispatch(fetchAsyncRegister(credential));
      if (fetchAsyncRegister.fulfilled.match(result)) {
        await dispatch(fetchAsyncLogin(credential));
      }
    }
  };

  return (
    <div className={styles.auth__root}>
      <h1>{isLoginView ? "Login" : "Register"}</h1>
      <br />
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        id="username"
        name="username"
        label="Username"
        type="text"
        value={credential.username}
        onChange={handleInputChange}
      />
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        id="password"
        name="password"
        label="Password"
        type="text"
        value={credential.password}
        onChange={handleInputChange}
      />
      <Button
        id="send-login"
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        onClick={login}
      >
        {isLoginView ? "Login" : "Register"}
      </Button>
      <span onClick={() => dispatch(toggleMode())}>
        {isLoginView ? "Create new account ?" : "Back to Login"}
      </span>
    </div>
  );
};
