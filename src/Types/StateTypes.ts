/* eslint-disable no-unused-vars */
export enum ManageTabType {
  CONFIRM = 'CONFIRM',
  CREATE = 'CREATE',
  EDIT = 'EDIT'
}

export interface EventAnswerType {
  answerId: number;
  text: string;
  odds: number;
  confirmed: boolean;
}

export interface EventQuestionType {
  questionId: number;
  text: string;
  answers: Array<EventAnswerType>;
}

export interface EventType {
  name: string;
  questions: Array<EventQuestionType>;
}

export interface NewBetEventType {
  persistingBetEvent: boolean;
  event: EventType;
}

export interface UserStateType {
  loggedIn: boolean;
  username: string;
  id: string;
}

export interface NavigationType {
  manageTab: ManageTabType;
}

export interface StateType {
  navigation: NavigationType;
  newBetEvent: NewBetEventType;
  user: UserStateType;
}
