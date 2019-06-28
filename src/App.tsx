import React, { FC, useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import store from 'store';
import ErrorBoundary from 'ErrorBoundary';
import Routes from 'routing/Routes';
import StoreContext from 'StoreContext';
import Screen from 'components/Screen';
import { initAccountKit } from 'services/authService';
import config from 'config';
import coverSrc from 'assets/cover.png'
import classes from './App.module.scss';

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
    <div>
      <Helmet>
        <meta property="og:url" content={config.FE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Grab Tech Expo Event - Nonogram Game" />
        <meta property="og:description" content="Grab is hiring. Come to Grab booth at Tech Expo Event to play games, get gifts and take the opportunity to join Grab." />
        <meta property="og:image" content={coverSrc} />
      </Helmet>
      <Screen loading={loading}>
        <div className={classes.App}>
          <ErrorBoundary>
            <StoreContext.Provider value={store}>
              <Routes />
            </StoreContext.Provider>
          </ErrorBoundary>
        </div>
      </Screen>
    </div>
  );
};

export default App;
