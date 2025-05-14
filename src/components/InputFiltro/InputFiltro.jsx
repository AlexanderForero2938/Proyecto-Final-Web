import React from 'react';
import './InputFiltro.css'

const InputFiltro = ({ placeholder, type = 'text', onChange, value }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default InputFiltro;
