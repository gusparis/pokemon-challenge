import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
