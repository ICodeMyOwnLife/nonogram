import { Dispatch } from 'redux';
import { loadGame, finishGame } from 'services/gameService';
import {
  LEVEL_REQUEST,
  LEVEL_RESPONSE,
  FINISH_REQUEST,
  FINISH_RESPONSE,
} from 'constants/gameActionTypes';

export const loadGameAction = (level?: number) => async (
  dispatch: Dispatch,
) => {
  dispatch({ type: LEVEL_REQUEST });
  const game = await loadGame(level);
  dispatch({ type: LEVEL_RESPONSE, payload: game });
  return game;
};

export const finishGameAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: FINISH_REQUEST });
  const finish = await finishGame();
  dispatch({ type: FINISH_RESPONSE, payload: finish });
  return finish;
};
