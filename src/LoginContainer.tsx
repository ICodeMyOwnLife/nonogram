import React, { FC, memo, useCallback } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { authenticate } from 'services/authService';
import Login from 'Login';

const LoginContainer: FC<LoginContainerProps> = ({
  match: {
    params: { redirectTo = '/game' },
  },
  history: { push },
}) => {
  const isAuthenticated = authenticate();
  const redirect = useCallback(() => {
    push(redirectTo);
  }, [redirectTo, push]);

  return isAuthenticated ? (
    <Redirect to={redirectTo} />
  ) : (
    <Login redirect={redirect} />
  );
};

interface LoginContainerProps
  extends RouteComponentProps<{ redirectTo?: string }> {}

export default memo(LoginContainer);
