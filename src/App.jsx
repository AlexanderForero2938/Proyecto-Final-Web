// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import VistaCoordinador from './pages/VistaCoorDinador/VistaCoorDinador';
import VistaGestionarUsuario from './pages/VistaGestionarUsuario/VistaGestionarUsuario';
import VistaGestionarProyecto from './pages/VistaGestionarProyecto/VistaGestionarProyecto';
import VistaDocente from './pages/VistaDocente/VistaDocente';
import VistaGestionarProyectoDocente from './pages/VistaGestionarProyectoDocente/VistaGestionarProyectoDocente';
import VistaProyectoSeleccionado from './pages/VistaProyectoSeleccionado/VistaProyectoSeleccionado';
import VistaProyectoSeleccionadoCoordinador from './pages/VistaProyectoSeleccionadoCoordinador/VistaProyectoSeleccionadoCoordinador';
import VistaEstudiante from './pages/VistaEstudiante/VistaEstudiante';
import VistaGestionarProyectoEstudiante from './pages/VistaGestionarProyectoEstudiante/VistaGestionarProyectoEstudiante';
import VistaProyectoSeleccionadoEstudiante from './pages/VistaProyectoSeleccionadoEstudiante/VistaProyectoSeleccionadoEstudiante';

import RutaPrivada from './utilidades/ruta';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Coordinador */}
        <Route path="/VistaCoordinador" element={
          <RutaPrivada rolPermitido="coordinador">
            <VistaCoordinador />
          </RutaPrivada>
        } />
        <Route path="/VistaCoordinador/VistaGestionarUsuario" element={
          <RutaPrivada rolPermitido="coordinador">
            <VistaGestionarUsuario />
          </RutaPrivada>
        } />
        <Route path="/VistaCoordinador/VistaGestionarProyecto" element={
          <RutaPrivada rolPermitido="coordinador">
            <VistaGestionarProyecto />
          </RutaPrivada>
        } />
        <Route path='/VistaProyectoSeleccionadoCoordinador/:id' element={
          <RutaPrivada rolPermitido="coordinador">
            <VistaProyectoSeleccionadoCoordinador />
          </RutaPrivada>
        } />

        {/* Docente */}
        <Route path="/VistaDocente" element={
          <RutaPrivada rolPermitido="docente">
            <VistaDocente />
          </RutaPrivada>
        } />
        <Route path="/VistaDocente/VistaGestionarProyectoDocente" element={
          <RutaPrivada rolPermitido="docente">
            <VistaGestionarProyectoDocente />
          </RutaPrivada>
        } />
        <Route path="/VistaProyectoSeleccionado/:id" element={
          <RutaPrivada rolPermitido="docente">
            <VistaProyectoSeleccionado />
          </RutaPrivada>
        } />

        {/* Estudiante */}
        <Route path="/VistaEstudiante" element={
          <RutaPrivada rolPermitido="estudiante">
            <VistaEstudiante />
          </RutaPrivada>
        } />
        <Route path="/VistaEstudiante/VistaGestionarProyecto/Estudiante" element={
          <RutaPrivada rolPermitido="estudiante">
            <VistaGestionarProyectoEstudiante />
          </RutaPrivada>
        } />
        <Route path="/VistaProyectoSeleccionadoEstudiante/:id" element={
          <RutaPrivada rolPermitido="estudiante">
            <VistaProyectoSeleccionadoEstudiante />
          </RutaPrivada>
        } />
      </Routes>
    </Router>
  );
}

export default App;
