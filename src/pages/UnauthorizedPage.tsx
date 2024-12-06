import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>403 - Acceso Denegado</h1>
      <p>No tienes los permisos necesarios para acceder a esta página.</p>
      <button onClick={() => navigate('/login')} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Volver al Login
      </button>
    </div>
  );
};

export default UnauthorizedPage;
