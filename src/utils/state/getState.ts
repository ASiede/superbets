import { StateType } from '../../components/Types/StateTypes';

export const getUserIdFromState = (state: StateType): string => state.user.id;
