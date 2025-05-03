import React from 'react';
import Input from '@mui/material/Input';

const InputFormulario = ({ value, onChange, name, placeholder, type = 'text' }) => {
  return (
    <Input
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
