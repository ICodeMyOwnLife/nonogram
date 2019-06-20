import React, { FC, memo } from 'react';
import classes from './Loading.module.scss';

const Loading: FC = () => {
  return <div className={classes.Loading}>Loading...</div>;
};

export default memo(Loading);
