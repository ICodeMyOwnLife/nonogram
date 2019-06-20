import React, { FC, memo } from 'react';
import HintCell from './HintCell';
import classes from './HintCol.module.scss';

const HintCol: FC<HintColProps> = ({ hintCol }) => {
  return (
    <div className={classes.HintCol}>
      {hintCol.length ? (
        hintCol.map((hint, index) => <HintCell key={index} hint={hint} />)
      ) : (
        <HintCell />
      )}
    </div>
  );
};

export interface HintColProps {
  hintCol: number[];
}

export default memo(HintCol);
