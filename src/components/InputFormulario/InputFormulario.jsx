import React from 'react';
import Input from '@mui/material/Input';
import './InputFormulario.css'

const InputFormulario = ({ value, onChange, name, placeholder, type = 'text' }) => {
  return (
    <Input className='input'
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default InputFormulario;
