import { useState, useCallback, useEffect, useRef } from 'react';
import moment from 'moment';
import useReduxStore from 'hooks/useStore';
import { loadGameAction, finishGameAction } from 'actions/gameActions';
import { CellStatus, PayloadAction } from 'types/common';
import { RootState } from 'store';
import { ThunkDispatch } from 'redux-thunk';

export default function useGameData() {
  const startTimeRef = useRef<moment.Moment | undefined>(undefined);
  const [valueRows, setValueRows] = useState<number[][] | undefined>(undefined);
  const [resultRows, setResultRows] = useState<CellStatus[][] | undefined>(
    undefined,
  );
  const [statusRows, setStatusRows] = useState<CellStatus[][] | undefined>(
    undefined,
  );
  const [description, setDescription] = useState<string>('Game Over');
  const [succeeded, setSucceeded] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const mapState = useCallback(
    ({ game: { level, loading } }: RootState) => ({ level, loading }),
    [],
  );
  const mapDispatch = useCallback(
    (dispatch: ThunkDispatch<RootState, {}, PayloadAction>) => ({
      loadGame: (level?: number) => dispatch(loadGameAction(level)),
      finishGame: () => dispatch(finishGameAction()),
    }),
    [],
  );
  const {
    stateObject: { level, loading },
    dispatchObject: { loadGame, finishGame },
  } = useReduxStore(mapState, mapDispatch);

  const fetch = useCallback(
    async (level?: number) => {
      const game = await loadGame(level);
      if (!game) {
        await finishGame();
        return setGameOver(true);
      }
      const { gameData, description } = game.attributes;
      const data = JSON.parse(gameData) as number[][];
      const statuses = data.map(row =>
        row.map(() => 'Unselected' as CellStatus),
      );
      const results = data.map(row =>
        row.map(value =>
          value === 1 ? 'Selected' : ('Unselected' as CellStatus),
        ),
      );
      startTimeRef.current = moment();
      setValueRows(data);
      setResultRows(results);
      setStatusRows(statuses);
      setDescription(description);
    },
    [loadGame],
  );

  const updateStatus = useCallback(
    (rowIndex: number, colIndex: number, status: CellStatus) =>
      setStatusRows(
        prevStatusRows =>
          prevStatusRows &&
          prevStatusRows.map((row, rIndex) =>
            rIndex !== rowIndex
              ? row
              : row.map((col, cIndex) => (cIndex !== colIndex ? col : status)),
          ),
      ),
    [setStatusRows],
  );

  const checkSuccess = useCallback(() => {
    if (!valueRows || !statusRows) {
      return setSucceeded(false);
    }

    for (let i = 0; i < valueRows.length; ++i) {
      const valueCols = valueRows[i];
      const statusCols = statusRows[i];

      for (let j = 0; j < valueCols.length; ++j) {
        const value = valueCols[j];
        const status = statusCols[j];

        if (
          (value === 0 && status === 'Selected') ||
          (value === 1 && status === 'Unselected') ||
          (value === 1 && status === 'Flagged')
        ) {
          return setSucceeded(false);
        }
      }
    }

    return setSucceeded(true);
  }, [valueRows, statusRows]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    checkSuccess();
  }, [checkSuccess]);

  return {
    startTimeRef,
    valueRows,
    resultRows,
    statusRows,
    setStatusRows,
    description,
    level,
    loading,
    fetch,
    updateStatus,
    checkSuccess,
    succeeded,
    gameOver,
  };
}
