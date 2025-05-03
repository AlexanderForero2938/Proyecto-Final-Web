import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import './BotonCrear.css'
import ModalFormularioRegistrarUsuario from '../ModalFormularioRegistrarUsuario/ModalFormularioRegistrarUsuario';

const BotonCrear = ({label}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <IconButton aria-label="delete" size="large" className='boton'  onClick={handleOpen}>
          <Typography variant="body1" sx={{ mr: 1 }}>{label}</Typography>
          <AddIcon fontSize="inherit" />
        </IconButton>
      </Stack>
      <ModalFormularioRegistrarUsuario open={open} handleClose={handleClose}></ModalFormularioRegistrarUsuario>
    </>
  );
}

export default BotonCrear;
