/* eslint-disable no-unused-vars */

export enum EventMode {
  CONFIRM = 'CONFIRM',
  GUESS = 'GUESS',
  NEW = 'NEW',
  EDIT = 'EDIT'
}

export interface EventAnswerType {
  answerId: number;
  text: string;
  odds?: number;
  confirmed?: boolean;
  guessed?: boolean;
}

export interface EventQuestionType {
  questionId: number;
  text?: string;
  answers: Array<EventAnswerType>;
}

export interface EventType {
  _id?: string;
  name?: string;
  questions?: Array<EventQuestionType>;
}

export interface UserStateType {
  loggedIn: boolean;
  username: string;
  id: string;
  events: Array<EventType>;
}

export interface StateType {
  bettor?: string;
  eventMode: EventMode;
  persistingBetEvent: boolean;
  selectedEvent?: EventType;
  toast: any;
  user: UserStateType;
}
