import React from 'react';
import Button from '@mui/material/Button';
import './BotonFormulario.css';

const BotonFormulario = ({ label, component, icono, onClick, propsModal }) => {
  return (
    <>
      <Button 
        variant="contained" 
        color="success" 
        id='boton-formulario' 
        startIcon={icono} 
        onClick={onClick}
      >
        {label}
      </Button>
      {component && React.createElement(component, propsModal)}
    </>
  );
};

export default BotonFormulario;