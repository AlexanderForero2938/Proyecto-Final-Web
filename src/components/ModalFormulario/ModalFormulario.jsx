import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './ModalFormulario.css';
import FormularioRegistrarUsuario from '../FormularioRegistrarUsuario/FormularioRegistrarUsuario';
import FormularioModificarUsuario from '../FormularioModificarUsuario/FormularioModificarUsuario';
import FormularioModificarEstadoProyecto from '../FormularioModificarEstadoProyecto/FormularioModificarEstadoProyecto';
import FormularioRegistrarProyecto from '../FormularioRegistrarProyecto/FormularioRegistrarProyecto';

const ModalFormulario = ({ open, handleClose, tipo, titulo, nombreUsuario, onSuccess }) => {
  // Función para renderizar el formulario adecuado basado en el tipo
  const renderFormulario = () => {
    switch (tipo) {
      case "Registrar Usuario":
        return <FormularioRegistrarUsuario onClose={handleClose}  onSuccess={onSuccess} />;
      case "Modificar Usuario":
        return <FormularioModificarUsuario onClose={handleClose} nombreUsuario={nombreUsuario} onSuccess={onSuccess} />;
      case "Modificar Proyecto":
        return <FormularioModificarEstadoProyecto onClose={handleClose} />;
      case "Registrar Proyecto":
        return <FormularioRegistrarProyecto onClose={handleClose} onSuccess={onSuccess} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-dinamico-title"
      aria-describedby="modal-dinamico-description"
    >
      <Box className="modal-content">
        {/* Título del modal */}
        <Typography id="modal-dinamico-title" variant="h6" component="h2" textAlign="center" fontWeight="bold">
          {titulo}
        </Typography>

        {/* Contenido del formulario */}
        <Box id="modal-dinamico-description" sx={{ mt: 2 }}>
          {renderFormulario()}
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalFormulario;
