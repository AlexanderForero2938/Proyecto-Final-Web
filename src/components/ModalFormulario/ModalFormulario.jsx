import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './ModalFormulario.css';
import FormularioRegistrarUsuario from '../FormularioRegistrarUsuario/FormularioRegistrarUsuario'
import FormularioModificarUsuario from '../FormularioModificarUsuario/FormularioModificarUsuario';

const ModalFormulario = ({ open, handleClose, tipo, titulo }) => {
  console.log("Tipo recibido:", tipo);
  const renderFormulario = () => {
    switch (tipo) {
      case "Registrar Usuario":
        return <FormularioRegistrarUsuario onClose={handleClose} />;
      case "Modificar Usuario":
        return <FormularioModificarUsuario onClose={handleClose} />;
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
        <Typography id="modal-dinamico-title" variant="h6" component="h2">
          {titulo}
        </Typography>
        <Box id="modal-dinamico-description" sx={{ mt: 2 }}>
          {renderFormulario()}
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalFormulario;
