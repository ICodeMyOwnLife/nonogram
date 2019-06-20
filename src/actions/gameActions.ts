import { Dispatch } from 'redux';
import { getLevel } from 'services/gameService';
import { LEVEL_REQUEST, LEVEL_RESPONSE } from 'constants/gameActionTypes';

export const getLevelAction = (level: number) => async (dispatch: Dispatch) => {
  dispatch({ type: LEVEL_REQUEST });
  const data = await getLevel(level);
  dispatch({ type: LEVEL_RESPONSE, payload: data });
  return data;
};
