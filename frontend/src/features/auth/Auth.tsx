import React, { FormEvent, ChangeEvent, FC, useState, useRef } from "react";
import { TextField, Button, Box, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Auth.module.css";
import { AppDispatch } from "../../app/store";
import {
  toggleMode,
  fetchAsyncLogin,
  fetchAsyncRegister,
  selectIsLoginView,
} from "./authSlice";
import { CRED } from "../types";

export const Auth: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoginView = useSelector(selectIsLoginView);
  const [isInputError, setIsInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [credential, setCredential] = useState<CRED>({
    username: "",
    password: "",
  });
  const username = useRef<HTMLInputElement>(null);
  const password1 = useRef<HTMLInputElement>(null);
  const password2 = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoginView) {
      const credential = {
        username: username.current!.value,
        password: password1.current!.value,
      };
      await dispatch(fetchAsyncLogin(credential));
    } else {
      if (password1.current!.value !== password2.current!.value) {
        setIsInputError(!isInputError);
        password2.current!.setCustomValidity("パスワードが違います。");
      } else {
        const credential = {
          username: username.current!.value,
          password: password1.current!.value,
        };
        const result = await dispatch(fetchAsyncRegister(credential));
        if (fetchAsyncRegister.fulfilled.match(result)) {
          await dispatch(fetchAsyncLogin(credential));
        }
      }
    }
  };

  return (
    <div className={styles.auth__root}>
      <h1>{isLoginView ? "Login" : "Register"}</h1>
      <br />
      <form className="textFieldWrapper" onSubmit={(e) => handleSubmit(e)}>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          id="username"
          name="username"
          label="Username"
          type="text"
          variant="standard"
          autoComplete="username"
          required
          fullWidth
          ref={username}
        />
        <br />
        <TextField
          error={isInputError}
          InputLabelProps={{
            shrink: true,
          }}
          id="password1"
          name="password1"
          label={isLoginView ? "Password" : "Password1"}
          type="password"
          variant="standard"
          autoComplete="new-password"
          required
          fullWidth
          inputRef={password1}
          // helperText="test"
          sx={{
            mt: 3,
          }}
        />
        <br />
        {isLoginView ? (
          ""
        ) : (
          <TextField
            error={isInputError}
            InputLabelProps={{
              shrink: true,
            }}
            id="password2"
            name="password2"
            label="Password2"
            type="password"
            variant="standard"
            autoComplete="new-password"
            required
            fullWidth
            inputRef={password2}
            // helperText={`${errorMessage}`}
            sx={{
              mt: 3,
            }}
          />
        )}
        <Button
          id="send-login"
          variant="contained"
          type="submit"
          color="primary"
          size="small"
          sx={{
            display: "flex",
            justifyContent: "center",
            y: 3,
            m: "auto",
            mt: 3,
            //(theme) => theme.spacing(3)と同じ
          }}
        >
          {isLoginView ? "Login" : "Register"}
        </Button>
      </form>
      <br />
      <span onClick={() => dispatch(toggleMode())}>
        {isLoginView ? "Create new account ?" : "Back to Login"}
      </span>
    </div>
  );
};
