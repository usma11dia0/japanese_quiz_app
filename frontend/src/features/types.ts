import { StringLiteralLike } from "typescript";

/* SelectField.ts */
export interface TSelectField {
  label: string;
  options: CATEGORY["trivia_categories"] | DIFFICULTY[] | TYPE[] | undefined;
}

/* useAxios.ts */
export interface URL {
  url: string;
}
export interface CATEGORY {
  trivia_categories: [
    {
      id: number;
      name: string;
    }
  ];
}
export interface DIFFICULTY {
  id: string;
  name: string;
}
export interface TYPE {
  id: string;
  name: string;
}
export interface QUIZ {
  response_code: number;
  result: [
    {
      category: string;
      type: string;
      difficulty: string;
      question: string;
      incorrect_answer: string;
      correct_answer: string;
    }
  ];
}
