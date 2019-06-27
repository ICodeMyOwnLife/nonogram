import React, { FC, memo, useCallback, useState, useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { authenticate } from 'services/authService';
import Login from 'Login';
import Screen from 'components/Screen';

const LoginContainer: FC<LoginContainerProps> = ({
  match: {
    params: { redirectTo = '/game' },
  },
  history: { push },
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const redirect = useCallback(() => {
    push(redirectTo);
  }, [redirectTo, push]);

  useEffect(() => {
    authenticate().then(isAuthenticated => {
      setIsAuthenticated(isAuthenticated);
      setLoading(false);
    });
  }, []);

  return (
    <Screen loading={loading}>
      {isAuthenticated ? (
        <Redirect to={redirectTo} />
      ) : (
        <Login redirect={redirect} />
      )}
    </Screen>
  );
};

interface LoginContainerProps
  extends RouteComponentProps<{ redirectTo?: string }> {}

export default memo(LoginContainer);
