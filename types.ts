export interface QuestionType {
  _id: string;
  question: string;
  answerOne: string;
  answerTwo: string;
  answerThree: string;
  answerFour: string;
  correctAnswer: string;
  category: string;
  publish: boolean;
}
export interface MessageType {
  _id: string;
  sender: string;
  receiver: string;
  message: string;
  createdAt: string;
}
