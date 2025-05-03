import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VistaCoordinador from './pages/vistaCoordinador/vistaCoordinador';
import VistaGestionarUsuario from './pages/VistaGestionarUsuario/VistaGestionarUsuario';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<VistaCoordinador />} />
        <Route path="/VistaCoordinador/VistaGestionarUsuario" element={<VistaGestionarUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;
