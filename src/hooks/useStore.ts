import { RootState } from 'store';
import { ThunkDispatch } from 'redux-thunk';
import StoreContext from 'StoreContext';
import { useContext, useEffect, useState, useMemo } from 'react';
import { PayloadAction } from 'types/common';

export default function useStore<TState, TDispatch>(
  mapState: (rootState: RootState) => TState,
  mapDispatch: (
    dispatch: ThunkDispatch<RootState, {}, PayloadAction>,
  ) => TDispatch,
) {
  const { subscribe, dispatch, getState } = useContext(StoreContext);
  const [stateObject, setStateObject] = useState(() => mapState(getState()));
  const dispatchObject = useMemo(() => mapDispatch(dispatch), [
    dispatch,
    mapDispatch,
  ]);

  useEffect(() => {
    return subscribe(() => setStateObject(mapState(getState())));
  }, [getState, mapState, subscribe]);

  return { stateObject, dispatchObject };
}
