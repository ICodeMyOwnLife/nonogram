import React, { FC, memo } from 'react';

const ProtectedRoute: FC<ProtectedRouteProps> = ({}) => {
  return (
    <div></div>
  );
};

export interface ProtectedRouteProps {}

export default memo(ProtectedRoute);
