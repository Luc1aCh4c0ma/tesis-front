import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles: string[]; // Roles permitidos para acceder
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token'); // Obtener el token (puedes cambiar esto según tu lógica)
  const userRole = localStorage.getItem('role'); // Obtener el rol desde el almacenamiento

  if (!token) {
    // Redirige a login si no está autenticado
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole || '')) {
    // Redirige a página no autorizado si no tiene el rol adecuado
    return <Navigate to="/unauthorized" />;
  }

  // Si cumple los requisitos, renderiza el contenido
  return <>{children}</>;
};

export default ProtectedRoute;
