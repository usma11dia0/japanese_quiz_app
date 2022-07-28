import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  useTheme,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import ContentPasteSearchRoundedIcon from "@mui/icons-material/ContentPasteSearchRounded";
import { useDispatch, useSelector } from "react-redux";

import {
  initialState,
  selectChoices,
  selectAnswerChoice,
  selectSelectedQuestionChoices,
  selectSelectedAnswerChoice,
} from "../quizSlice";
import styles from "./QuizResult.module.css";
import { AppDispatch } from "../../../app/store";

export const QuizResult = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch: AppDispatch = useDispatch();
  const resultChoices = useSelector(selectChoices);
  const columns = resultChoices[0] && Object.keys(resultChoices[0]);
  const selectChoice = useSelector(selectSelectedAnswerChoice);

  //列名の文字列変換用配列
  const dictionaryColumnArray = [
    {
      source: "quiz_question_text",
      replacement: "設問",
    },
    {
      source: "choice_text",
      replacement: "正答",
    },
    {
      source: "is_correct",
      replacement: "結果",
    },
  ];

  //行の文字列変換用配列
  const dictionaryRowArray = [
    {
      source: "false",
      replacement: "不正解",
    },
    {
      source: "true",
      replacement: "正解",
    },
  ];

  return (
    <>
      <Button onClick={handleOpen}>Open QuizResult Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "150vh",
            height: "80vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h4"
            fontWeight="bold"
            component="h2"
          >
            結 果 発 表
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ここに成績一覧が表示されます。
          </Typography> */}
          <Table size="small" className={styles.table}>
            <TableHead>
              <TableRow>
                {columns.map(
                  (column, colIndex) =>
                    (column === "quiz_question_text" ||
                      column === "choice_text" ||
                      column === "is_correct") && (
                      <TableCell align="center" key={colIndex}>
                        <strong>
                          {dictionaryColumnArray
                            ? dictionaryColumnArray.find((pair) => {
                                return pair.source === column;
                              })!.replacement
                            : ""}
                        </strong>
                      </TableCell>
                    )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {resultChoices.map((row, rowIndex) => (
                <TableRow hover key={rowIndex}>
                  {Object.keys(row).map(
                    (key, colIndex) =>
                      (key === "quiz_question_text" ||
                        key === "choice_text" ||
                        key === "is_correct") &&
                      row["is_correct"] !== undefined && (
                        <TableCell
                          align="center"
                          className={styles.tasklist__hover}
                          key={`${rowIndex}+${colIndex}`}
                          onClick={() => {
                            dispatch(selectAnswerChoice(row));
                          }}
                        >
                          <span>
                            {row[key]?.toString() === "false" ||
                            row[key]?.toString() === "true"
                              ? dictionaryRowArray.find((pair) => {
                                  return pair.source === row[key]?.toString();
                                })!.replacement
                              : row[key]?.toString()}
                          </span>
                        </TableCell>
                      )
                  )}
                  <TableCell align="center">
                    <button
                      className={styles.tasklist__icon}
                      onClick={() => {
                        dispatch(selectAnswerChoice(row));
                      }}
                    >
                      <ContentPasteSearchRoundedIcon />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </>
  );
};
