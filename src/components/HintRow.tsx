import React, { FC, memo } from 'react';
import HintCell from './HintCell';
import classes from './HintRow.module.scss';

const HintRow: FC<HintRowProps> = ({ hintCols }) => {
  return (
    <div className={classes.HintRow}>
      {hintCols.length ? (
        hintCols.map((hint, index) => <HintCell key={index} hint={hint} />)
      ) : (
        <HintCell />
      )}
    </div>
  );
};

export interface HintRowProps {
  hintCols: number[];
}

export default memo(HintRow);
