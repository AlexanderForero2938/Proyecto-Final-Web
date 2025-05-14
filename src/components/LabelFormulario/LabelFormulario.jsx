import React from 'react';
import './LabelFormulario.css'

const LabelFormulario = ({ label, valor }) => {
    return (
        <div className="label-formulario">
            <strong>{label}</strong> {valor}
        </div>
    );
};

export default LabelFormulario;
