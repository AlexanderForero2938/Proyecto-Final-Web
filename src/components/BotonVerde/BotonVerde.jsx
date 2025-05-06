import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const BotonVerde = ({ label, icono }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="success" id='boton-aceptar' startIcon={icono} type="submit">
        {label}
      </Button>
    </Stack>
  )
}

export default BotonVerde;
