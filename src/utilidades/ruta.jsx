// src/utilidades/ruta.jsx
import { Navigate } from 'react-router-dom';

const RutaPrivada = ({ children, rolPermitido }) => {
  const rol = sessionStorage.getItem('rol');

  // Si no ha iniciado sesión
  if (!rol) {
    return <Navigate to="/" />;
  }

  // Si el rol no coincide con el permitido
  if (rolPermitido && rol !== rolPermitido) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RutaPrivada;
