import React, {
  FC,
  memo,
  useState,
  ChangeEvent,
  useCallback,
  FormEvent,
  useRef,
} from 'react';
import classnames from 'classnames';
import { CellStatus, CellInfo } from 'types/common';
import classes from './GameCreationContainer.module.scss';
import GameBoard from 'components/GameBoard';

const GameCreationContainer: FC = () => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [statusRows, setStatusRows] = useState<CellStatus[][]>([]);
  const mappedStatusRows = statusRows.map(row =>
    row.map(col => (col === 'Selected' ? 1 : 0)),
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleRowsChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRows(Number(e.target.value));
    },
    [setRows],
  );

  const handleColsChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCols(Number(e.target.value));
    },
    [setCols],
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const statuses: CellStatus[][] = Array(rows)
        .fill(0)
        .map(() => Array(cols).fill('Unselected'));
      setStatusRows(statuses);
    },
    [setStatusRows, rows, cols],
  );

  const handleCellClick = useCallback(
    ({ status, rowIndex, colIndex }: CellInfo) => {
      const nextStatus: CellStatus =
        status === 'Unselected' ? 'Selected' : 'Unselected';
      setStatusRows(prevStatusRows =>
        prevStatusRows.map((row, rIndex) =>
          rIndex !== rowIndex
            ? row
            : row.map((col, cIndex) =>
                cIndex !== colIndex ? col : nextStatus,
              ),
        ),
      );
    },
    [],
  );

  const handleCopy = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('copy');
    }
  }, []);

  return (
    <div className={classes.GameCreationContainer}>
      <form className={classes.Form} onSubmit={handleSubmit}>
        <div className={classes.FormGroup}>
          <label htmlFor="rows">Rows:</label>
          <input
            type="number"
            name="rows"
            id="rows"
            value={rows}
            onChange={handleRowsChange}
          />
        </div>
        <div className={classes.FormGroup}>
          <label htmlFor="cols">Cols:</label>
          <input
            type="number"
            name="cols"
            id="cols"
            value={cols}
            onChange={handleColsChange}
          />
        </div>
        <div className={classes.SubmitGroup}>
          <button className={classes.Button} type="submit">
            Generate
          </button>
        </div>
      </form>

      <div className={classes.Game}>
        <GameBoard statusRows={statusRows} onCellClick={handleCellClick} />
      </div>

      <textarea
        ref={textareaRef}
        className={classes.Statuses}
        value={JSON.stringify(mappedStatusRows)}
        readOnly
        rows={10}
      />

      <div>
        <button
          className={classnames(classes.Button, classes.CopyButton)}
          onClick={handleCopy}
        >
          Copy To Clipboard
        </button>
      </div>
    </div>
  );
};

export default memo(GameCreationContainer);
