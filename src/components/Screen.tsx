import React, { FC, memo, ReactNode } from 'react';
import LoadingScreen from 'components/LoadingScreen';

const Screen: FC<ScreenProps> = ({ loading, children }) => {
  return loading ? <LoadingScreen /> : <>{children}</>;
};

export interface ScreenProps {
  loading: boolean;
  children: ReactNode;
}

export default memo(Screen);
