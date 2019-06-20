import React, { FC, memo, Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Route,
  RouteProps,
  Redirect,
  Switch,
} from 'react-router-dom';
import LoadingScreen from 'LoadingScreen';

const GameContainer = lazy(() => import('containers/GameContainer'));
const GameCreationContainer = lazy(() =>
  import('containers/GameCreationContainer'),
);
const LoginContainer = lazy(() => import('LoginContainer'));

const Routes: FC = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <BrowserRouter>
        <Switch>
          <Route<RouteProps> path="/game" component={GameContainer} exact />
          <Route<RouteProps>
            path="/create-game"
            component={GameCreationContainer}
            exact
          />
          <Route<RouteProps> path="/login" component={LoginContainer} exact />
          <Route<RouteProps> path="/" exact>
            <Redirect to="/login" />
          </Route>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default memo(Routes);
