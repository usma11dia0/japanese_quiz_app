import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

import { selectSelectedAnswerChoice } from "../quizSlice";
import styles from "./QuizDisplay.module.css";

export const QuizDisplay = () => {
  const selectedChoice = useSelector(selectSelectedAnswerChoice);
  const rows = [
    { item: "設問", data: selectedChoice.quiz_question_text },
    { item: "正答", data: selectedChoice.choice_text },
    // { item: "結果", data: selectedChoice.is_correct },
    { item: "音声", data: selectedChoice.audio_choice_src },
    { item: "音階", data: selectedChoice.image_choice_src },
    { item: "解説", data: selectedChoice.answer_explanation },
  ];

  if (!selectedChoice.quiz) {
    return null;
  }

  return (
    <>
      <h2>詳細画面</h2>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.item}>
              <TableCell align="center">
                <strong>{row.item}</strong>
              </TableCell>
              <TableCell align="center">
                {row.item === "音階" ? (
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
    </>
  );
};
