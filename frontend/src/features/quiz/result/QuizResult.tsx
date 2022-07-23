import React from "react";
import { useShuffle } from "../../../hooks/useShuffle";
import { PrononciationQuizs } from "../../../dummyData";

export const QuizResult = () => {
  const { orderedArrayObject, setArrayObjectShuffle } = useShuffle();
  // console.log(PrononciationQuizs);
  setArrayObjectShuffle(PrononciationQuizs);
  console.log(orderedArrayObject);
  return <div>QuizResult</div>;
};
