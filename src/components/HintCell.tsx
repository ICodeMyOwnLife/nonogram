import React, { FC, memo } from 'react';
import classes from './HintCell.module.scss';

const HintCell: FC<HintCellProps> = ({ hint = 0 }) => {
  return <div className={classes.HintCell}>{hint}</div>;
};

export interface HintCellProps {
  hint?: number;
}

export default memo(HintCell);
