/* eslint-disable no-unused-vars */
export enum ManageTab {
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

export interface BetEventStateType {
  betEvents: Array<EventType>;
}

export interface UserStateType {
  loggedIn: boolean;
  username: string;
  id: string;
}

export interface StateType {
  betEvents: BetEventStateType;
  persistingBetEvent: boolean;
  manageTab: ManageTab;
  newBetEvent: EventType;
  user: UserStateType;
}
