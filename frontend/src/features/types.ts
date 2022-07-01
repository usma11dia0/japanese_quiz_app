import { BooleanLiteral, StringLiteralLike } from "typescript";

/* AuthSlice.ts */
export interface LOGIN_USER {
  id: number;
  username: string;
}
//fileを扱うための型定義
export interface FILE extends Blob {
  readonly lastModified: number;
  readonly name: string;
}
export interface PROFILE {
  id: number;
  user_profile: number;
}
// CRED:CREDENTIALの略
export interface CRED {
  username: string;
  password: string;
}
export interface JWT {
  refresh: string;
  access: string;
}
export interface USER {
  id: number;
  username: string;
}
export interface AUTH_STATE {
  isLoginView: boolean;
  loginUser: LOGIN_USER;
  profiles: PROFILE[];
}

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
  results: [
    {
      category: string;
      type: string;
      difficulty: string;
      question: string;
      incorrect_answers: string[];
      correct_answer: string;
    }
  ];
}

/* reducer.ts */
export interface TState {
  question_category: string;
  question_difficulty: string;
  question_type: string;
  amount_of_question: number;
  score: number;
}
