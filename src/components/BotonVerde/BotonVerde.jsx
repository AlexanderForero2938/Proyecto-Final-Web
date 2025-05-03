import * as React from 'react';
import Button from '@mui/material/Button';

const BotonVerde = ({ label }) => {
  return (
    <Button variant="contained" color="success" id='boton-aceptar'>
      {label}
    </Button>
  )
}

export default BotonVerde;
