import { Action } from 'redux';

export interface CellData {
  value: number;
  status: CellStatus;
}

export interface CellInfo {
  status: CellStatus;
  rowIndex: number;
  colIndex: number;
}

export type ResultData<T> = {
  result: T;
};

export interface LevelData {
  level: number;
  gameData: string;
  description: string;
  objectId: string;
  className: string;
}

export type CellStatus = 'Unselected' | 'Selected' | 'Flagged';

export interface PayloadAction<TType = any, TPayload = any>
  extends Action<TType> {
  payload: TPayload;
}
