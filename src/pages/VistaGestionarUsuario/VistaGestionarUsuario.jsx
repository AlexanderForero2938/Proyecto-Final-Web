import React from 'react'
import MenuCoordinador from '../../components/MenuCoordinador/MenuCoordinador'
import BotonCrear from '../../components/BotonCrear/BotonCrear'
import ComboBox from '../../components/ComboBox/ComboBox'
import Tabla from '../../components/Tabla/Tabla'
import './VistaGestionarUsuario.css'

const VistaGestaionarUsuario = () => {

  const columns = [
    { id: 'name', label: 'Nombre' },
    { id: 'email', label: 'Email' },
    { id: 'rol', label: 'Rol' },
  ];

  const rows = [
    { name: 'Juan', email: 'juan@mail.com', rol: 'Admin' },
    { name: 'Ana', email: 'ana@mail.com', rol: 'Usuario' },
    { name: 'Carlos', email: 'carlos@mail.com', rol: 'Editor' },
  ];
  return (
    <>
      <div id='contenedor-gestionar-usuario'>
        <MenuCoordinador></MenuCoordinador>
        <div id='contenedor-opciones'>
          <BotonCrear label="CREAR USUARIO"></BotonCrear>
          <ComboBox></ComboBox>
          <ComboBox></ComboBox>
        </div>
        <div id='contenedor-tabla'>
          <Tabla columns={columns} rows={rows}></Tabla>
        </div>
      </div>

    </>

  )
}

export default VistaGestaionarUsuario