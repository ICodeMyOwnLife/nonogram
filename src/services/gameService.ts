import backendService from './backendService';
import { ResultData, LevelData } from 'types/common';

export async function getLevel(level: number) {
  const {
    data: { result },
  } = await backendService.post<ResultData<LevelData | null>>(
    'functions/nextLevel',
    {
      level,
    },
  );
  return result;
}

export async function log(type: string) {}
