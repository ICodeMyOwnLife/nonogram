import {
  AUTH_ACTION_TYPES,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from 'constants/authActionTypes';
import { Reducer } from 'redux';
import { PayloadAction } from 'types/common';

const initialState: AuthState = {
  loading: false,
};

const authReducer: Reducer<AuthState, PayloadAction<AUTH_ACTION_TYPES>> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userID: action.payload && action.payload.userID,
      };

    default:
      return initialState;
  }
};

export default authReducer;

export interface AuthState {
  loading: boolean;
  userID?: string;
}
