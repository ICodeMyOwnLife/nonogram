import React, { FC, memo, Suspense, lazy } from 'react';
import { Route, RouteProps, Redirect, Switch, Router } from 'react-router-dom';
import history from 'routing/history';
import ProtectedRoute from 'routing/ProtectedRoute';
import LoadingScreen from 'components/LoadingScreen';

const GameContainer = lazy(() => import('containers/GameContainer'));
const GameCreationContainer = lazy(() =>
  import('containers/GameCreationContainer'),
);
const LoginContainer = lazy(() => import('LoginContainer'));

const Routes: FC = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Router history={history}>
        <Switch>
          <ProtectedRoute path="/game" component={GameContainer} exact />
          <ProtectedRoute
            path="/create-game"
            component={GameCreationContainer}
            exact
          />
          <Route<RouteProps> path="/login" component={LoginContainer} exact />
          <Route<RouteProps> path="/loading" component={LoadingScreen} exact />
          <Route<RouteProps> path="/" exact>
            <Redirect to="/game" />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default memo(Routes);
