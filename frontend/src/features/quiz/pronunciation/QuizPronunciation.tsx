import React, { useEffect, useLayoutEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { VoiceIcon } from "../../../components/button/VoiceIcon";
import { ProgBar } from "../../../components/progbar/ProgBar";
import { ChoiceCard } from "../../../components/card/ChoiceCard";
import { AppDispatch } from "../../../app/store";
import { fetchAsyncGetChoices, resetState, selectChoices } from "../quizSlice";
import { READ_CHOICE } from "../../../types/features";

export const QuizPronunciation = () => {
  const dispatch: AppDispatch = useDispatch();
  const choices: READ_CHOICE[] = useSelector(selectChoices);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ video: false, audio: true });
  const clickTimer = null;

  // 外部APIよりChoiceデータ読込(初回のみ)
  useLayoutEffect(() => {
    dispatch(resetState());
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetChoices());
    };
    fetchBootLoader();
  }, []);

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
        問. {choices[0].choice_text}と正しく発音してください。
      </Typography>
      <Typography variant="h6" mt={2.0} mb={1.0}>
        ～ボタンをクリックして録音を開始します～
      </Typography>
      <VoiceIcon
        onClick={status !== "recording" ? startRecording : stopRecording}
        status={status}
        customSx={{
          fontSize: "3.0rem",
          backgroundColor: status !== "recording" ? "#8d6e63" : "#ba2636",
        }}
      />
      {status === "recording" ? <ProgBar /> : ""}
      {/* <Grid container spacing={15}>
        <Grid item xs={6}> */}
      {status === "stopped" ? (
        <div>
          <audio src={mediaBlobUrl} autoPlay controls />
        </div>
      ) : (
        ""
      )}
      <Grid container sx={{ width: "auto" }}>
        <ChoiceCard
          customSx={{ mt: 2, width: "20rem", alignItems: "center" }}
          imgSrc={choices[0].quiz !== "" ? choices[0].image_choice_src : ""}
          // isCorrect={isCorrect}
        >
          {choices[0].quiz !== "" ? choices[0].choice_text : ""}
        </ChoiceCard>
      </Grid>
      {/* </Grid>
      </Grid> */}
    </>
  );
};
