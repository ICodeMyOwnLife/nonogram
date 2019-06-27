import React, { FC, memo, useEffect, useState } from 'react';
import Screen from 'components/Screen';
import { authenticate } from 'services/authService';
import { Route, Redirect, RouteProps } from 'react-router';

const ProtectedRoute: FC<ProtectedRouteProps> = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authenticate().then(isAuthenticated => {
      setIsAuthenticated(isAuthenticated);
      setLoading(false);
    });
  }, []);

  return (
    <Screen loading={loading}>
      {isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />}
    </Screen>
  );
};

export interface ProtectedRouteProps extends RouteProps {}

export default memo(ProtectedRoute);
