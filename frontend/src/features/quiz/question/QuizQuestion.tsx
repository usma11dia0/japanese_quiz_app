/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid, CircularProgress, Box } from "@mui/material";

import { ChoiceCard } from "../../../components/card/ChoiceCard";
import {
  initialState,
  selectCard,
  fetchAsyncGetChoices,
  selectChoices,
  addIsCorrect,
  addIsInCorrect,
  incrementScore,
  resetState,
  selectSelectedQuestionChoices,
  selectSelectedAnswerChoice,
  selectSelectedCard,
  selectIsLoading,
  selectScore,
  selectQuestionChoices,
  selectAnswerChoice,
} from "../quizSlice";
import { AppDispatch } from "../../../app/store";
import { useAudio } from "../../../hooks/useAudio";
import { usePrepareQuiz } from "../../../hooks/usePrepareQuiz";
import { READ_CHOICE, SELECT_CARD } from "../../../types/features";
import { useNavigate } from "react-router-dom";
import { ScoreBoard } from "../../../components/scoreboard/ScoreBoard";
import { SoundIcon } from "../../../components/button/SoundIcon";

export const QuizQuestion = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const choices: READ_CHOICE[] = useSelector(selectChoices);
  const selectedQuestionChoices: READ_CHOICE[] = useSelector(
    selectSelectedQuestionChoices
  );
  const selectedAnswerChoice: READ_CHOICE = useSelector(
    selectSelectedAnswerChoice
  );
  const selectedCard: SELECT_CARD = useSelector(selectSelectedCard);
  const isloading = useSelector(selectIsLoading);
  const score: number = useSelector(selectScore);
  const [choiceIndex, setChoiceIndex] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const { playAudio } = useAudio();
  const { targetChoices, targetAnswer, prepareQuiz } = usePrepareQuiz();

  const NumberOfQuestion = 5;

  // 外部APIよりChoicesデータ読込(初回のみ)
  useLayoutEffect(() => {
    dispatch(resetState());
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetChoices());
    };
    fetchBootLoader();
  }, []);

  // 読み込んだChoicesデータを一つずつ抽出(choiceIndexのstate変更時に都度実行)
  useLayoutEffect(() => {
    //stateの初期化
    dispatch(selectCard(initialState.selectedCard));
    setIsCorrect(undefined);
    //choiceIndexのchoice(正解の選択肢)に対して、対となるchoice(不正解の選択肢)を抽出
    //正解+不正解の選択肢をまとめたtargetChoicesの順番(右左)をランダムに並び替え
    prepareQuiz(choices, choiceIndex);
    dispatch(
      selectQuestionChoices(
        targetChoices ? targetChoices : initialState.selectedQuestionChoices
      )
    );
    dispatch(
      selectAnswerChoice(
        targetAnswer ? targetAnswer : initialState.selectedAnswerChoice
      )
    );
  }, [choices[0].quiz, choiceIndex, targetAnswer]);

  //初回読み込み時は自動で音声を再生
  useLayoutEffect(() => {
    if (choices[0].quiz !== "" && document.readyState === "complete") {
      const targetIcon = document.querySelector<HTMLElement>(".sound-icon");
      targetIcon?.click();
    }
  }, [selectedAnswerChoice]);

  const handleClickAudio = () => {
    playAudio(
      selectedAnswerChoice ? selectedAnswerChoice.audio_choice_src : "",
      1.0
    );
  };

  //正誤判定
  const handleClickAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target instanceof HTMLElement) {
      switch (e.target.innerText) {
        case "":
          if (e.target instanceof HTMLImageElement) {
            if (
              e.target.currentSrc === selectedAnswerChoice?.image_choice_src
            ) {
              // alert("正解です");
              // console.log(e.target.currentSrc);
              // console.log(selectedAnswerChoice?.image_choice_src);
              setIsCorrect(true);
              dispatch(incrementScore());
              dispatch(addIsCorrect(selectedAnswerChoice));
              playAudio("../../../../assets/audio/seikai_1.mp3", 0.1);
            } else {
              // alert("不正解です");
              // console.log(e.target.currentSrc);
              // console.log(selectedAnswerChoice?.image_choice_src);
              setIsCorrect(false);
              dispatch(addIsInCorrect(selectedAnswerChoice));
              playAudio("../../../../assets/audio/huseikai_2.mp3", 0.1);
            }
          }
          break;
        default:
          if (
            e.target.innerText.toUpperCase() ===
            selectedAnswerChoice?.choice_text.toUpperCase()
          ) {
            // alert("正解です");
            // console.log(e.target.innerText);
            // console.log(selectedAnswerChoice?.choice_text);
            setIsCorrect(true);
            dispatch(incrementScore());
            dispatch(addIsCorrect(selectedAnswerChoice));
            playAudio("../../../../assets/audio/seikai_1.mp3", 0.1);
          } else {
            // alert("不正解です");
            // console.log(e.target.innerText);
            // console.log(selectedAnswerChoice?.choice_text);
            setIsCorrect(false);
            dispatch(addIsInCorrect(selectedAnswerChoice));
            playAudio("../../../../assets/audio/huseikai_2.mp3", 0.1);
          }
          break;
      }

      if (choiceIndex + 1 < NumberOfQuestion) {
        setTimeout(() => {
          setChoiceIndex(choiceIndex + 1);
        }, 1500);
      } else {
        setTimeout(() => {
          navigate("/quizzes/result");
        }, 1500);
      }
    }
  };

  if (isloading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h5" fontWeight="bold" mt={-2.0}>
        問.{choiceIndex + 1} 正しい
        {selectedAnswerChoice ? selectedAnswerChoice.quiz_question_text : ""}
        を選択してください。
      </Typography>
      <SoundIcon
        onClick={handleClickAudio}
        customSx={{
          marginTop: "2",
          fontSize: "2.8rem",
          backgroundColor: "#8d6e63",
        }}
      />
      <Grid container spacing={15}>
        <Grid item xs={6}>
          <ChoiceCard
            customSx={{ mt: 2 }}
            imgSrc={
              selectedQuestionChoices[0].quiz !== ""
                ? selectedQuestionChoices[0].image_choice_src
                : ""
            }
            isCorrect={isCorrect}
            isClicked={selectedCard.right ? true : false}
            onClick={(e) => {
              handleClickAnswer(e);
              dispatch(selectCard({ right: true }));
            }}
          >
            {selectedQuestionChoices[0].quiz !== ""
              ? selectedQuestionChoices[0].choice_text
              : ""}
          </ChoiceCard>
        </Grid>
        <Grid item xs={6}>
          <ChoiceCard
            customSx={{ mt: 2 }}
            imgSrc={
              selectedQuestionChoices[0].quiz !== ""
                ? selectedQuestionChoices[1].image_choice_src
                : ""
            }
            isCorrect={isCorrect}
            isClicked={selectedCard.left ? true : false}
            onClick={(e) => {
              handleClickAnswer(e);
              dispatch(selectCard({ left: true }));
            }}
          >
            {selectedQuestionChoices[0].quiz !== ""
              ? selectedQuestionChoices[1].choice_text
              : ""}
          </ChoiceCard>
        </Grid>
      </Grid>
      <ScoreBoard>
        {score} / {NumberOfQuestion}{" "}
      </ScoreBoard>
    </>
  );
};
