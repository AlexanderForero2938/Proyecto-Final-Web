import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './BotonRojo.css';

const BotonRojo = ({ onClick, label, icono }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="error" id='boton-cancelar' onClick={onClick} startIcon={icono}>
        {label}
      </Button>
    </Stack>
  );
};

export default BotonRojo;
