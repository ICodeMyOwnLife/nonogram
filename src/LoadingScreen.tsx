import React, { FC, memo } from 'react';
import Loading from 'components/Loading';
import classes from './LoadingScreen.module.scss';

const LoadingScreen: FC = () => {
  return (
    <div className={classes.LoadingScreen}>
      <Loading />
    </div>
  );
};


export default memo(LoadingScreen);
