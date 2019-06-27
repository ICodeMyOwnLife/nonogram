import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import gameReducer, { GameState } from 'reducers/gameReducer';
import authReducer, { AuthState } from 'reducers/authReducer';
import { PayloadAction } from 'types/common';

const reducer = combineReducers({ game: gameReducer, auth: authReducer });

const store = createStore<RootState, PayloadAction, {}, {}>(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;

export interface RootState {
  game: GameState;
  auth: AuthState;
}
