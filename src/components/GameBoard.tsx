import React, { FC, memo } from 'react';
import GameRow from 'components/GameRow';
import classes from './GameBoard.module.scss';
import { CellInfo, CellStatus } from 'types/common';

const Game: FC<GameBoardProps> = ({ statusRows, onCellClick }) => {
  return (
    <div className={classes.GameBoard}>
      {statusRows.map((_, index) => {
        const statusCols = statusRows[index];
        return (
          <GameRow
            key={index}
            rowIndex={index}
            statusCols={statusCols}
            onCellClick={onCellClick}
          />
        );
      })}
    </div>
  );
};

export interface GameBoardProps {
  statusRows: CellStatus[][];
  onCellClick: (cellInfo: CellInfo) => void;
}

export default memo(Game);
