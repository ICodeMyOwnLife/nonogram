import { Action } from 'redux';

export interface CellInfo {
  status: CellStatus;
  rowIndex: number;
  colIndex: number;
}

export type CellStatus = 'Unselected' | 'Selected' | 'Flagged';

export interface PayloadAction<TType = any, TPayload = any>
  extends Action<TType> {
  payload: TPayload;
}

export interface AppConfig {
  BE_BASE_URL: string;
  FE_URL: string;
}