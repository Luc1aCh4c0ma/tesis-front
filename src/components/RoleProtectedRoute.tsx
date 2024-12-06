import React from 'react';
import { Navigate } from 'react-router-dom';

// Definimos los tipos de las props del componente
interface RoleProtectedRouteProps {
  element: React.ReactNode; // Tipo para el elemento (React component)
  requiredRole: string;     // Tipo para el rol requerido
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ element, requiredRole }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const isTokenValid = (token: string | null): boolean => {
      if (!token) return false;
      try {
        const { exp } = JSON.parse(atob(token.split('.')[1])); // Decodifica el token y verifica la expiración
        return Date.now() < exp * 1000;
      } catch (error) {
        console.error('Token inválido:', error);
        return false;
      }
    };
  
    return <>{element}</>;
  } catch (error) {
    console.error('Error decoding token:', error);
    return <Navigate to="/login" />;
  }
};

export default RoleProtectedRoute;
