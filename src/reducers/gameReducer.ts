import { Reducer } from 'redux';
import {
  GAME_ACTION_TYPES,
  LEVEL_REQUEST,
  LEVEL_RESPONSE,
} from 'constants/gameActionTypes';
import { PayloadAction } from 'types/common';

const initialState: GameState = {
  loading: false,
  level: 0,
};

const gameReducer: Reducer<GameState, PayloadAction<GAME_ACTION_TYPES>> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case LEVEL_REQUEST:
      return { ...state, loading: true };

    case LEVEL_RESPONSE:
      return {
        ...state,
        loading: false,
        level: action.payload && action.payload.level,
        data: action.payload && JSON.parse(action.payload.gameData),
      };

    default:
      return initialState;
  }
};

export default gameReducer;

export interface GameState {
  loading: boolean;
  level: number;
  data?: number[][];
}
