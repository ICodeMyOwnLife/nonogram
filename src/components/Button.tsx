import React, {
  FC,
  memo,
  MouseEvent,
  ReactNode,
  ButtonHTMLAttributes,
} from 'react';
import classnames from 'classnames';
import classes from './Button.module.scss';

const Button: FC<ButtonProps> = ({
  className,
  onClick,
  type,
  children,
  kind = 'primary',
  ...props
}) => {
  return (
    <button
      type={type}
      className={classnames(classes.Button, className, classes[kind])}
      onClick={onClick}
      {...props}
    >
      {children}{' '}
    </button>
  );
};

export interface ButtonProps extends ButtonHTMLAttributes<any> {
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: 'submit' | 'button' | 'reset';
  children?: ReactNode;
  kind?: 'primary' | 'secondary';
}

export default memo(Button);
