import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import VistaCoordinador from './pages/VistaCoorDinador/VistaCoorDinador';
import VistaGestionarUsuario from './pages/VistaGestionarUsuario/VistaGestionarUsuario';
import VistaGestionarProyecto from './pages/VistaGestionarProyecto/VistaGestionarProyecto';
import VistaDocente from './pages/VistaDocente/VistaDocente';
import VistaGestionarProyectoDocente from './pages/VistaGestionarProyectoDocente/VistaGestionarProyectoDocente';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/VistaCoordinador" element={<VistaCoordinador />} />
         <Route path="/VistaDocente" element={<VistaDocente />} />
        <Route path="/VistaCoordinador/VistaGestionarUsuario" element={<VistaGestionarUsuario />} />
        <Route path="/VistaCoordinador/VistaGestionarProyecto" element={<VistaGestionarProyecto />} />
        <Route path="/VistaDocente/VistaGestionarProyectoDocente" element={<VistaGestionarProyectoDocente />} />
      </Routes>
    </Router>
  );
}

export default App;
