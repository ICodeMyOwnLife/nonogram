import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

export default function useThunkDispatch<
  TState,
  TAction extends Action<any> = Action<any>
>() {
  return useDispatch<ThunkDispatch<TState, {}, TAction>>();
}
