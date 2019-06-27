import { Dispatch } from 'redux';
import { loginByCode, LoginByCodeParams } from 'services/authService';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../constants/authActionTypes';
import { User } from 'parse';

export const loginByCodeAction = (params: LoginByCodeParams) => async (
  dispatch: Dispatch,
) => {
  dispatch({ type: LOGIN_REQUEST });
  let user: User | null = null;
  let error: any = null;

  try {
    user = await loginByCode(params);
  } catch (err) {
    error = err;
  }

  if (!user) {
    dispatch({ type: LOGIN_FAILED, payload: error });
  } else {
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  }

  return user;
};
