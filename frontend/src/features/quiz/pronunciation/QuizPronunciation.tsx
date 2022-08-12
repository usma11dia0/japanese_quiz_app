import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Grid, Typography } from "@mui/material";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

export const QuizPronunciation = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ video: false, audio: true });

  // clearBlobUrl();

  return (
    <>
      <Typography variant="h5" fontWeight="bold" mt={-2.5}>
        問. ダイゴさん(人名)と正しく発音してください。
      </Typography>
      <KeyboardVoiceIcon />
      <div>
        <p>{status}</p>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        <audio src={mediaBlobUrl} autoPlay controls></audio>
      </div>
    </>
  );
};
