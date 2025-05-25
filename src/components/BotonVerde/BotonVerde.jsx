import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './BotonVerde.css';

const BotonVerde = ({ label, icono, onClick, type = 'button' }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        color="success"
        id="boton-aceptar"
        startIcon={icono}
        type={type}         // por defecto es 'button', pero puedes pasar 'submit'
        onClick={onClick}   // ejecuta la función si se pasa
      >
        {label}
      </Button>
    </Stack>
  );
};

export default BotonVerde;
