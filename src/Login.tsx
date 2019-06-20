import React, {
  FC,
  memo,
  useState,
  ChangeEvent,
  useCallback,
  FormEvent,
  useEffect,
} from 'react';
import classes from './Login.module.scss';
import { login } from 'services/authService';
import logoSrc from 'assets/grab-logo.png';
import Button from 'components/Button';

const Login: FC<LoginProps> = ({ redirect }) => {
  const [contact, setContact] = useState('');

  const handleContactChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setContact(e.target.value);
    },
    [setContact],
  );

  const requestLogin = useCallback(
    async (contact?: string) => {
      const { isAuthenticated } = await login(contact);
      if (isAuthenticated) {
        redirect();
      }
    },
    [redirect],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await requestLogin(contact);
    },
    [requestLogin, contact],
  );

  useEffect(() => {
    // requestLogin();
  }, [requestLogin]);

  return (
    <div className={classes.Login}>
      <div className={classes.Logo}>
        <img className={classes.LogoImage} src={logoSrc} alt="Logo" />
      </div>
      <h1 className={classes.Title}>Have fun with our puzzle challenges!!!</h1>
      <form className={classes.LoginForm} onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="contact"
            id="contact"
            value={contact}
            placeholder="Phone number or email"
            onChange={handleContactChange}
          />
        </div>
        <div>
          <Button type="submit">LOGIN</Button>
        </div>
      </form>
    </div>
  );
};

export default memo(Login);

interface LoginProps {
  redirect: VoidFunction;
}
