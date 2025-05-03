import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './ModalFormularioRegistrarUsuario.css';
import FormularioRegistrarUsuario from '../FormularioRegistrarUsuario/FormularioRegistrarUsuario';

const ModalFormularioRegistrarUsuario = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-crear-usuario-title"
      aria-describedby="modal-crear-usuario-description"
    >
      <Box className="modal-content">
        <Typography id="modal-crear-usuario-title" variant="h6" component="h2">
          FORMULARIO PARA CREAR UN USUARIO
        </Typography>
        <Typography id="modal-crear-usuario-description" sx={{ mt: 2 }}>
          <FormularioRegistrarUsuario onClose={handleClose} />
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalFormularioRegistrarUsuario;
