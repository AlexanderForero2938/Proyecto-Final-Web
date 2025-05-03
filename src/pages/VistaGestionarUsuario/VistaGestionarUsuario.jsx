import React from 'react'
import ResponsiveAppBar from '../../components/ResponsiveAppBar/ResponsiveAppBar'
import BotonCrearUsuario from '../../components/BotonCrearUsuario/BotonCrearUsuario'
import './VistaGestionarUsuario.css'

const VistaGestaionarUsuario = () => {
  return (
    <>
      <div id='contenedor-gestionar-usuario'>
        <ResponsiveAppBar></ResponsiveAppBar>
        <div id='contenedor-opciones'>
          <BotonCrearUsuario></BotonCrearUsuario>
        </div>
      </div>

    </>

  )
}

export default VistaGestaionarUsuario