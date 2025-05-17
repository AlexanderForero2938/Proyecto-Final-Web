import React from 'react'
import MenuDocente from '../../components/MenuDocente/MenuDocente';

const VistaDocente = () => {
    const idUsuario = sessionStorage.getItem('idUsuario');
  return (
    <MenuDocente></MenuDocente>
  )
}

export default VistaDocente