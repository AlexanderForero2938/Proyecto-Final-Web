import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import './BotonVerMas.css';

const BotonVerMas = ({ ruta }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ruta);
  };

  return (
    <Button className='boton-vermas'
      variant="contained"
      color="success"
      id="boton-formulario"
      startIcon={<RemoveRedEyeIcon />}
      onClick={handleClick}
    />
  );
};

export default BotonVerMas;
