import { Dispatch } from 'redux';
import { loadGame } from 'services/gameService';
import { LEVEL_REQUEST, LEVEL_RESPONSE } from 'constants/gameActionTypes';

export const loadGameAction = (level?: number) => async (dispatch: Dispatch) => {
  dispatch({ type: LEVEL_REQUEST });
  const data = await loadGame(level);
  dispatch({ type: LEVEL_RESPONSE, payload: data });
  return data;
};
