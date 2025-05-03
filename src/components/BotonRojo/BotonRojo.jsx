import React from 'react'
import Button from '@mui/material/Button';
import './BotonRojo.css'

const BotonRojo = ({onClose, label}) => {
  return (
    <Button variant="contained" color="success" id='boton-cancelar' onClick={onClose}>
    {label}
  </Button>
  )
}

export default BotonRojo
