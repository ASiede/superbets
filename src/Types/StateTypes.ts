/* eslint-disable no-unused-vars */
export enum ManageTabType {
  CONFIRM = 'CONFIRM',
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  SUBMIT_BET = 'SUBMIT_BET',
  LEADERBOARD = 'LEADERBOARD'
}

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

export interface NavigationType {
  manageTab: ManageTabType;
}

export interface StateType {
  bettor?: string;
  eventMode: EventMode;
  navigation: NavigationType;
  persistingBetEvent: boolean;
  selectedEvent?: EventType;
  toast: any;
  user: UserStateType;
}
