import React from "react";
import { useShuffle } from "../../../hooks/useShuffle";
import { PrononciationQuizs } from "../../../dummyData";

export const QuizResult = () => {
  const { arrayObjectShuffle, orderedArrayObject } = useShuffle();
  // console.log(PrononciationQuizs);
  arrayObjectShuffle(PrononciationQuizs);
  console.log(orderedArrayObject);
  return <div>QuizResult</div>;
};
