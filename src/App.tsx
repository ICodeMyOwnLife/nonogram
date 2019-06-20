import React, { FC } from 'react';
import ErrorBoundary from 'ErrorBoundary';
import Routes from 'Routes';
import StoreContext from 'StoreContext';
import store from 'store';
import classes from './App.module.scss';

const App: FC = () => {
  return (
    <div className={classes.App}>
      <ErrorBoundary>
        <StoreContext.Provider value={store}>
          <Routes />
        </StoreContext.Provider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
