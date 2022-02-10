/* eslint-disable no-unused-vars */
export enum ManageTabType {
  CONFIRM = 'CONFIRM',
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  PLACE_BET = 'PLACE_BET'
}

export enum EventMode {
  CONFIRM = 'CONFIRM',
  GUESS = 'GUESS',
  NEW = 'NEW',
  EDIT = 'EDIT'
}

export interface EventAnswerType {
  answerId: number;
  text?: string;
  odds?: number;
  confirmed?: boolean;
}

export interface EventQuestionType {
  questionId: number;
  text?: string;
  answers?: Array<EventAnswerType>;
}

export interface EventType {
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
  navigation: NavigationType;
  persistingBetEvent: boolean;
  selectedEvent?: EventType;
  eventMode: EventMode;
  user: UserStateType;
}
