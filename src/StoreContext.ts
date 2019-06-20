import { createContext } from 'react';
import { Store } from 'redux';
import store, { RootState } from 'store';
import { PayloadAction } from 'types/common';

const StoreContext = createContext<Store<RootState, PayloadAction<string>>>(
  store,
);

export default StoreContext;
