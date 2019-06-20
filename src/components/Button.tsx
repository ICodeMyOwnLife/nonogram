import React, { FC, memo, MouseEvent, ReactNode } from 'react';
import classnames from 'classnames';
import classes from './Button.module.scss';

const Button: FC<ButtonProps> = ({ className, onClick, type, children }) => {
  return (
    <button
      type={type}
      className={classnames(classes.Button, className)}
      onClick={onClick}
    >
      {children}{' '}
    </button>
  );
};

export interface ButtonProps {
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: 'submit' | 'button' | 'reset';
  children?: ReactNode;
}

export default memo(Button);
