import React, { FC, memo, ReactNode } from 'react';
import classnames from 'classnames';
import classes from './Loading.module.scss';

const Loading: FC<LoadingProps> = ({ show, children = 'Loading...' }) => {
  return (
    <div className={classnames(classes.Loading, { [classes.show]: show })}>
      {children}
    </div>
  );
};

export default memo(Loading);

export interface LoadingProps {
  show: boolean;
  children?: ReactNode;
}
