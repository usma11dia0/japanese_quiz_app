import React, { useState } from "react";
import {
  Button,
  Grid,
  Modal,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectResultPronunciation,
  selectScore,
  selectSelectedAnswerChoice,
} from "../quizSlice";
import { RESULT_PRONUNCIATION } from "../../../types/features";
import styles from "./QuizPronunciationResult.module.css";

import { SoundIcon } from "../../../components/button/SoundIcon";
import { useAudio } from "../../../hooks/useAudio";

export const QuizPronunciationResult = () => {
  const [open, setOpen] = useState(false);
  const score = useSelector(selectScore);
  const resultPronunciation: RESULT_PRONUNCIATION = useSelector(
    selectResultPronunciation
  );
  const navigate = useNavigate();
  const selectedChoice = useSelector(selectSelectedAnswerChoice);
  const { playAudio } = useAudio();
  const rows = [
    { item: "設問", data: selectedChoice.quiz_question_text },
    { item: "正答", data: selectedChoice.choice_text },
    // { item: "結果", data: selectedChoice.is_correct },
    { item: "音声", data: selectedChoice.audio_choice_src },
    { item: "画像", data: selectedChoice.image_choice_src },
    { item: "解説", data: selectedChoice.answer_explanation },
  ];

  if (selectedChoice.quiz === "") {
    return null;
  }

  const handleOpen = () => setOpen(true);

  return (
    <>
      <Button onClick={handleOpen} className="open-modal">
        Open QuizPronunciationResult Modal
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80vh",
            height: "95vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            overflowWrap: "break-word",
            p: 5,
          }}
        >
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Typography
              id="modal-modal-title"
              variant="h3"
              fontWeight="bold"
              component="h1"
              sx={{ mt: 0, ml: 3 }}
            >
              判定　
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h2"
              fontWeight="bold"
              component="h1"
              color={score === 1 ? "#ba2636" : "#00558f"}
              sx={{ mt: 0, ml: 5 }}
            >
              {score === 1 ? `正解` : `不正解`}
            </Typography>
          </Grid>
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="flex-end"
            justifyContent="center"
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              fontWeight="bold"
              component="h1"
              sx={{ mt: 2, ml: 3 }}
            >
              合致率
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h4"
              fontWeight="bold"
              component="h1"
              color={"#3f312b"}
              sx={{ mt: 4, ml: 5 }}
            >
              {`${parseFloat(resultPronunciation.proba.toFixed(2))} %`}
            </Typography>
          </Grid>
          <Table className={styles.table} sx={{ mt: 2 }}>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.item}>
                  <TableCell align="center" className={styles.table_head}>
                    <strong>{row.item}</strong>
                  </TableCell>
                  <TableCell align="center">
                    {row.item === "音声" ? (
                      <SoundIcon
                        onClick={() => {
                          playAudio(row.data, 1.0);
                        }}
                        customSx={{
                          top: "-5px",
                          fontSize: "2.5rem",
                          backgroundColor: "#8d6e63",
                        }}
                      />
                    ) : row.item === "画像" ? (
                      <img
                        src={`${row.data}`}
                        alt="音階画像データ"
                        className={styles.img}
                      />
                    ) : (
                      <div>{row.data}</div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* <Grid container spacing={2} direction="row" justifyContent="center">
            <Typography
              id="modal-modal-title"
              variant="h3"
              fontWeight="bold"
              component="h1"
              sx={{ mt: 2, ml: 3 }}
            >
              成績　
            </Typography>
          </Grid>
          <Grid container spacing={2} direction="row" justifyContent="center">
            <Grid
              item
              spacing={2}
              direction="row"
              alignItems="flex-end"
              justifyContent="center"
            >
              <Typography
                id="modal-modal-title"
                variant="h4"
                fontWeight="bold"
                component="h1"
                sx={{ mt: 2, ml: 3 }}
              >
                判定
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="h2"
                fontWeight="bold"
                component="h1"
                color={score === 1 ? "#ba2636" : "#00558f"}
                sx={{ mt: 2, ml: 5 }}
              >
                {score === 1 ? `正解` : `不正解`}
              </Typography>
            </Grid>
            <Grid
              item
              // container
              spacing={2}
              direction="row"
              alignItems="flex-end"
              justifyContent="center"
            >
              <Typography
                id="modal-modal-title"
                variant="h4"
                fontWeight="bold"
                component="h1"
                sx={{ mt: 2, ml: 3 }}
              >
                合致率
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="h2"
                fontWeight="bold"
                component="h1"
                color={"#3f312b"}
                sx={{ mt: 2, ml: 5 }}
              >
                {`${parseFloat(resultPronunciation.proba.toFixed(2))} %`}
              </Typography>
            </Grid>
            <Grid item spacing={2}>
              <Button
                variant="contained"
                disableElevation
                onClick={() => {
                  navigate("/quizzes/pronunciation");
                  // store内のRedux stateをリセット
                  window.location.reload();
                }}
                // sx={{ ml: 7 }}
              >
                再挑戦
              </Button>
              <Button
                variant="contained"
                disableElevation
                onClick={() => {
                  navigate("/quizzes/");
                  // store内のRedux stateをリセット
                  window.location.reload();
                }}
                sx={{ ml: 7 }}
              >
                戻る
              </Button>
            </Grid>
          </Grid> */}
        </Box>
      </Modal>
    </>
  );
};
