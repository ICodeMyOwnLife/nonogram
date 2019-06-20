import React, { FC, memo } from 'react';
import HintCol from 'components/HintCol';
import classes from './HintCols.module.scss';

const HintCols: FC<HintColsProps> = ({ valueRows }) => {
  const hintCols: number[][] = [];

  for (let i = 0; i < valueRows[0].length; ++i) {
    const hints = [];
    let count = 0;

    for (let j = 0; j < valueRows.length; ++j) {
      const value = valueRows[j][i];

      if (value) {
        ++count;

        if (j === valueRows.length - 1) {
          hints.push(count);
        }
      } else {
        if (count > 0) {
          hints.push(count);
          count = 0;
        }
      }
    }

    hintCols.push(hints);
  }

  return (
    <div className={classes.HintCols}>
      {hintCols.map((hintCol, index) => (
        <HintCol key={index} hintCol={hintCol} />
      ))}
    </div>
  );
};

export interface HintColsProps {
  valueRows: number[][];
}

export default memo(HintCols);
