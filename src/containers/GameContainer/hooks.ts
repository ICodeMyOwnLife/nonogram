import {
  useState,
  useCallback,
  useEffect,
  useRef,
  MutableRefObject,
} from 'react';
import moment, { Duration, Moment } from 'moment';
import { loadGameAction, finishGameAction } from 'actions/gameActions';
import { CellStatus, CellInfo } from 'types/common';
import { RootState } from 'store';
import useShallowEqualSelector from 'hooks/useShallowEqualSelector';
import useThunkDispatch from 'hooks/useThunkDispatch';
import useCheatMode from 'hooks/useCheatMode';
import useInterval from 'hooks/useInterval';

export const selector = ({ game: { level, loading } }: RootState) => ({
  level,
  loading,
});

export function useGameData() {
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
  const { level, loading } = useShallowEqualSelector(selector);
  const dispatch = useThunkDispatch();

  const fetch = useCallback(async (level?: number) => {
    const game = await dispatch(loadGameAction(level));
    if (!game) {
      await dispatch(finishGameAction());
      return setGameOver(true);
    }
    const { gameData, description } = game.attributes;
    const data = JSON.parse(gameData) as number[][];
    const statuses = data.map(row => row.map(() => 'Unselected' as CellStatus));
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
  }, []);

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

export function useCellClickCallback(
  updateStatus: (
    rowIndex: number,
    colIndex: number,
    status: CellStatus,
  ) => void,
) {
  return useCallback(
    ({ status, rowIndex, colIndex }: CellInfo) => {
      const nextStatus: CellStatus =
        status === 'Unselected'
          ? 'Selected'
          : status === 'Selected'
          ? 'Flagged'
          : 'Unselected';

      updateStatus(rowIndex, colIndex, nextStatus);
    },
    [updateStatus],
  );
}

export function useShowResultCheatMode() {
  return useCheatMode(e => e.key.toLowerCase() === 'c' && e.shiftKey);
}

export function useGetNextLevelCallback(
  fetch: (level: number) => void,
  level: number,
) {
  return useCallback(() => fetch(level + 1), [fetch, level]);
}

export function useUpdateDuration(
  startTimeRef: MutableRefObject<Moment | undefined>,
  setDuration: TypedFunction<[Duration]>,
  interval: number,
) {
  useInterval(() => {
    const diff = startTimeRef.current ? moment().diff(startTimeRef.current) : 0;
    setDuration(moment.duration(diff));
  }, interval);
}

export function usePassLevel(setStatusRows: TypedFunction<[CellStatus[]|undefined]>, resultRows: CellStatus[]|undefined) {
  
}