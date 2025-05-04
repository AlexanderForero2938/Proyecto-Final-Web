import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VistaCoordinador from './pages/VistaCoorDinador/VistaCoorDinador';
import VistaGestionarUsuario from './pages/VistaGestionarUsuario/VistaGestionarUsuario';
import VistaGestionarProyecto from './pages/VistaGestionarProyecto/VistaGestionarProyecto';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<VistaCoordinador />} />
        <Route path="/VistaCoordinador/VistaGestionarUsuario" element={<VistaGestionarUsuario />} />
        <Route path="/VistaCoordinador/VistaGestionarProyecto" element={<VistaGestionarProyecto />} />
      </Routes>
    </Router>
  );
}

export default App;
