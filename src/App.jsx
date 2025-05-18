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

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<Login />} />
        <Route path="/VistaCoordinador" element={<VistaCoordinador />} />
        <Route path="/VistaDocente" element={<VistaDocente />} />

        {/* Rutas del Coordinador */}
        <Route path="/VistaCoordinador/VistaGestionarUsuario" element={<VistaGestionarUsuario />} />
        <Route path="/VistaCoordinador/VistaGestionarProyecto" element={<VistaGestionarProyecto />} />

        {/* Rutas del Docente */}
        <Route path="/VistaDocente/VistaGestionarProyectoDocente" element={<VistaGestionarProyectoDocente />} />

        {/* Ruta dinámica para proyecto seleccionado */}
        <Route path="/VistaProyectoSeleccionado/:id" element={<VistaProyectoSeleccionado />} />
        <Route path='/VistaProyectoSeleccionadoCoordinador/:id' element={<VistaProyectoSeleccionadoCoordinador />} />
      </Routes>
    </Router>
  );
}

export default App;
