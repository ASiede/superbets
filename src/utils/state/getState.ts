import { StateType } from '../../Types/StateTypes';

export const getUserIdFromState = (state: StateType): string => state.user.id;
