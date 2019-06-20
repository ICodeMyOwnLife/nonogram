import { useState, useCallback, useEffect, useRef } from 'react';
import moment from 'moment';
import useStore from 'hooks/useStore';
import { getLevelAction } from 'actions/gameActions';
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
    ({ game: { level } }: RootState) => ({ level }),
    [],
  );
  const mapDispatch = useCallback(
    (dispatch: ThunkDispatch<RootState, {}, PayloadAction>) => ({
      getLevel: (level: number) => dispatch(getLevelAction(level)),
    }),
    [],
  );
  const {
    stateObject: { level },
    dispatchObject: { getLevel },
  } = useStore(mapState, mapDispatch);

  const fetch = useCallback(
    async (level = 0) => {
      const result = await getLevel(level);
      if (!result) {
        return setGameOver(true);
      }
      const { gameData, description } = result;
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
    [getLevel],
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
    description,
    level,
    fetch,
    updateStatus,
    checkSuccess,
    succeeded,
    gameOver,
  };
}
