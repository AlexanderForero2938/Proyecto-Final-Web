import React from 'react';
import './InputFecha.css';

const InputFecha = ({ value, onChange }) => {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  return (
      <input
        type="date"
        id="fecha"
        name="fecha"
        value={value || ''}
        onChange={handleChange}
      />
  );
};

export default InputFecha;
