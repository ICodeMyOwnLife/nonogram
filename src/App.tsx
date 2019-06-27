import React, { FC, useEffect, useState } from 'react';
import ErrorBoundary from 'ErrorBoundary';
import Routes from 'routing/Routes';
import StoreContext from 'StoreContext';
import store from 'store';
import classes from './App.module.scss';
import Screen from 'components/Screen';
import { initAccountKit } from 'services/authService';

const App: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.AccountKit_OnInteractive = () => {
      initAccountKit();
      setLoading(false);
    };
    const scriptEle = document.createElement('script');
    scriptEle.src = 'https://sdk.accountkit.com/en_US/sdk.js';
    document.body.appendChild(scriptEle);
  }, []);

  return (
    <Screen loading={loading}>
      <div className={classes.App}>
        <ErrorBoundary>
          <StoreContext.Provider value={store}>
            <Routes />
          </StoreContext.Provider>
        </ErrorBoundary>
      </div>
    </Screen>
  );
};

export default App;
