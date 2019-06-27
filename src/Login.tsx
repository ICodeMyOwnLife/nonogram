import React, { FC, memo, useCallback } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import Button from 'components/Button';
import useReduxStore from 'hooks/useStore';
import { RootState } from 'store';
import { loginByCodeAction } from 'actions/authActions';
import { LoginByCodeParams } from 'services/authService';
import { PayloadAction } from 'types/common';
import logoSrc from 'assets/grab-logo.png';
import classes from 'Login.module.scss';
import Loading from 'components/Loading';

const Login: FC<LoginProps> = ({ redirect }) => {
  const mapState = useCallback(
    ({ auth: { loading } }: RootState) => ({ loading }),
    [],
  );
  const mapDispatch = useCallback(
    (dispatch: ThunkDispatch<RootState, {}, PayloadAction>) => ({
      loginByCode: (params: LoginByCodeParams) =>
        dispatch(loginByCodeAction(params)),
    }),
    [],
  );
  const {
    stateObject: { loading },
    dispatchObject: { loginByCode },
  } = useReduxStore(mapState, mapDispatch);

  const loginCallback = useCallback(
    async (response: AccountKit.LoginResponse) => {
      console.log(response);

      switch (response.status) {
        case 'PARTIALLY_AUTHENTICATED':
          const user = await loginByCode({
            code: response.code,
            csrf: response.state,
          });
          if (user) {
            redirect();
          }
          break;

        case 'NOT_AUTHENTICATED':
          break;

        case 'BAD_PARAMS':
          break;
        default:
          break;
      }
    },
    [loginByCode, redirect],
  );

  const loginWithSms = useCallback(() => {
    window.AccountKit.login('PHONE', {}, loginCallback);
  }, [loginCallback]);

  const loginWithEmail = useCallback(() => {
    window.AccountKit.login('EMAIL', {}, loginCallback);
  }, [loginCallback]);

  return (
    <div className={classes.Login}>
      <Loading show={loading} />
      <div className={classes.Logo}>
        <img className={classes.LogoImage} src={logoSrc} alt="logo  " />
      </div>
      <h1 className={classes.Title}>Have fun with our puzzle challenges!!!</h1>
      <a
        className={classes.HowToPlay}
        href="https://www.nonograms.org/instructions"
        target="_blank"
        rel="noopener noreferrer"
      >
        How to play
      </a>
      <div className={classes.LoginForm}>
        <div>
          <Button kind="primary" onClick={loginWithSms}>
            Login with SMS
          </Button>
        </div>
        <div>
          <Button kind="secondary" onClick={loginWithEmail}>
            Login with Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);

interface LoginProps {
  redirect: VoidFunction;
}
