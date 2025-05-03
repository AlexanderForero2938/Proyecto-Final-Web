import React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import './BotonCrearUsuario.css'

const BotonCrearUsuario = () => {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <IconButton aria-label="delete" size="large" className='boton'>
        <Typography variant="body1" sx={{ mr: 1 }}>Crear Usuario</Typography>
        <AddIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  );
}

export default BotonCrearUsuario;
