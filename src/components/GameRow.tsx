import React, { FC, memo } from 'react';
import GameCell from 'components/GameCell';
import classes from './GameRow.module.scss';
import { CellInfo, CellStatus } from 'types/common';

const GameRow: FC<GameRowProps> = ({ statusCols, rowIndex, onCellClick }) => {
  return (
    <div className={classes.GameRow}>
      {statusCols.map((_, index) => {
        const status = statusCols[index];
        return (
          <GameCell
            key={index}
            status={status}
            rowIndex={rowIndex}
            colIndex={index}
            onClick={onCellClick}
          />
        );
      })}
    </div>
  );
};

export interface GameRowProps {
  statusCols: CellStatus[];
  rowIndex: number;
  onCellClick: (cellInfo: CellInfo) => void;
}

export default memo(GameRow);
