import React, { FC, memo } from 'react';
import HintRow from './HintRow';
import classes from './HintRows.module.scss';

const HintRows: FC<HintRowsProps> = ({ valueRows }) => {
  const hintRows: number[][] = [];

  for (let i = 0; i < valueRows.length; ++i) {
    const row = valueRows[i];
    const hints = [];
    let count = 0;

    for (let j = 0; j < row.length; ++j) {
      const value = row[j];

      if (value) {
        ++count;

        if (j === row.length - 1) {
          hints.push(count);
        }
      } else {
        if (count > 0) {
          hints.push(count);
          count = 0;
        }
      }
    }

    hintRows.push(hints);
  }

  return (
    <div className={classes.HintRows}>
      {hintRows.map((hintCols, index) => (
        <HintRow key={index} hintCols={hintCols} />
      ))}
    </div>
  );
};

export interface HintRowsProps {
  valueRows: number[][];
}

export default memo(HintRows);
