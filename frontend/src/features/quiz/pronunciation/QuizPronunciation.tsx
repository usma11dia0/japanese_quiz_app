import React, { useEffect, useLayoutEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { VoiceIcon } from "../../../components/button/VoiceIcon";
import { ProgBar } from "../../../components/progbar/ProgBar";
import { ChoiceCard } from "../../../components/card/ChoiceCard";
import { AppDispatch } from "../../../app/store";
import {
  fetchAsyncGetChoices,
  fetchAsyncPostAudio,
  isJudging,
  resetState,
  resetResultPronunciation,
  selectChoices,
  selectAnswerChoice,
  selectSelectedAnswerChoice,
  selectResultPronunciation,
  selectIsLoading,
} from "../quizSlice";
import { READ_CHOICE, RESULT_PRONUNCIATION } from "../../../types/features";

export const QuizPronunciation = () => {
  const dispatch: AppDispatch = useDispatch();
  const choices: READ_CHOICE[] = useSelector(selectChoices);
  const answerChoice: READ_CHOICE = useSelector(selectSelectedAnswerChoice);
  const resultPronunciation: RESULT_PRONUNCIATION = useSelector(
    selectResultPronunciation
  );
  const isloading = useSelector(selectIsLoading);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      video: false,
      audio: true,
      onStart: () => {
        dispatch(resetResultPronunciation());
      },
      onStop: (blobUrl, blob) => {
        dispatch(fetchAsyncPostAudio(blob));
        dispatch(isJudging());
      },
    });

  // 外部APIよりChoiceデータ読込(初回のみ)
  useLayoutEffect(() => {
    dispatch(resetState());
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetChoices());
    };
    fetchBootLoader();
  }, []);

  // 対象Choice選択 (if文は再レンダリング対策)
  if (!isloading && answerChoice.choice_text == "") {
    dispatch(selectAnswerChoice(choices[0]));
  }

  //onStart&onStopで上手く動作しなかったため代用
  useEffect(() => {
    if (status === "recording") {
      setTimer(
        setTimeout(() => {
          const targetIcon = document.querySelector<HTMLElement>(".voice-icon");
          targetIcon?.click();
        }, 3000)
      );
    }
    if (status === "stopped") {
      clearTimeout(timer);
    }
  }, [status]);

  // clearBlobUrl();
  // status: idle, recording, stopped

  return (
    <>
      <Typography variant="h5" fontWeight="bold" mt={-2.0}>
        問. {answerChoice.choice_text}と正しく発音してください。
      </Typography>
      <Typography variant="h6" mt={2.0} mb={1.0}>
        {resultPronunciation.isJudging
          ? "判定中"
          : status == "recording"
          ? "※３秒以内に録音してください"
          : "～ボタンをクリックして録音を開始します～"}
      </Typography>
      <Grid container sx={{ width: "auto" }}>
        {!resultPronunciation.isJudging ? (
          <VoiceIcon
            onClick={status !== "recording" ? startRecording : stopRecording}
            status={status}
            customSx={{
              fontSize: "3.0rem",
              backgroundColor: status !== "recording" ? "#8d6e63" : "#ba2636",
            }}
          />
        ) : (
          ""
        )}
        {status === "recording" ? (
          <ProgBar customSx={{ marginTop: "18px" }} />
        ) : (
          ""
        )}
        {status === "stopped" ? (
          // <div style={{ marginTop: "6px" }}>
          //   <audio src={mediaBlobUrl} controls />
          // </div>
          <></>
        ) : (
          ""
        )}
        {!resultPronunciation.isJudging && resultPronunciation.result !== "" ? (
          <Typography variant="h6">
            {resultPronunciation.result}
            {resultPronunciation.proba}
          </Typography>
        ) : resultPronunciation.isJudging ? (
          <Box mt={1.2} mb={1.2}>
            <CircularProgress />
          </Box>
        ) : (
          ""
        )}
      </Grid>
      <Grid container sx={{ width: "auto" }}>
        <ChoiceCard
          customSx={{ mt: 2, width: "20rem", alignItems: "center" }}
          imgSrc={answerChoice.quiz !== "" ? answerChoice.image_choice_src : ""}
          // isCorrect={isCorrect}
        >
          {answerChoice.quiz !== "" ? answerChoice.choice_text : ""}
        </ChoiceCard>
      </Grid>
    </>
  );
};
