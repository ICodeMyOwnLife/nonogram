import React, { FC, memo, useCallback } from 'react';
import classnames from 'classnames';
import classes from './GameCell.module.scss';
import { CellInfo } from 'types/common';

const GameCell: FC<GameCellProps> = ({
  status,
  rowIndex,
  colIndex,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    onClick({ status, rowIndex, colIndex });
  }, [status, rowIndex, colIndex, onClick]);

  return (
    <div
      className={classnames(classes.GameCell, classes[status])}
      onClick={handleClick}
    />
  );
};

export interface GameCellProps extends CellInfo {
  onClick: (cellInfo: CellInfo) => void;
}

export default memo(GameCell);
