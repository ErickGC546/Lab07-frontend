import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, hasRole } = useAuth();
  
  // Si no está autenticado, redirigir a login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  // Si se requieren roles específicos y el usuario no tiene el rol necesario
  if (roles && !hasRole(roles)) {
    return <Navigate to="/" replace />;
  }
  
  // Si está autenticado y tiene el rol adecuado (o no se requieren roles específicos)
  return children;
};

export default ProtectedRoute;