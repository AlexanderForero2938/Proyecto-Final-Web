import React from 'react';
import Input from '@mui/material/Input';
import './InputModificar.css'

const InputModificar = ({ value, onChange, name, placeholder, type = 'text' }) => {
    return (
        <Input className='input'
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            sx={{ input: { textAlign: 'center' } }}
        />
    );
};

export default InputModificar;

