import { EventAnswerType, StateType } from '../../Types/StateTypes';

export const getUserIdFromState = (state: StateType): string => state.user.id;

export const getAnswer = (
  state: StateType,
  questionId: number
): EventAnswerType[] => {
  const foundQuestion = state.selectedEvent?.questions?.find(
    (question) => question.questionId === questionId
  );
  return foundQuestion?.answers || [];
};
