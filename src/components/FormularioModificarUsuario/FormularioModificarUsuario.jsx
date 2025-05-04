import React, { useState } from 'react';
import InputFormulario from '../InputFormulario/InputFormulario';
import BotonVerde from '../BotonVerde/BotonVerde';
import BotonRojo from '../BotonRojo/BotonRojo';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const FormularioModificarUsuario = ({ onClose }) => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [primerNombre, setPrimerNombre] = useState('');
    const [segundoNombre, setSegundoNombre] = useState('');
    const [primerApellido, setPrimerApellido] = useState('');
    const [segundoApellido, setSegundoApellido] = useState('');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'nombreUsuario':
                setNombreUsuario(value);
                break;
            case 'primerNombre':
                setPrimerNombre(value);
                break;
            case 'segundoNombre':
                setSegundoNombre(value);
                break;
            case 'primerApellido':
                setPrimerApellido(value);
                break;
            case 'segundoApellido':
                setSegundoApellido(value);
                break;
            case 'numeroIdentificacion':
                setNumeroIdentificacion(value);
                break;
            default:
                break;
        }
    };


    return (
        <>
            <div id='contenedor-formulario'>
                <form action="">
                    <div id='contenedor-superior'>
                        <InputFormulario
                            name="nombreUsuario"
                            value={nombreUsuario}
                            onChange={handleChange}
                            placeholder="Nombre Usuario"
                        />
                        <InputFormulario
                            name="primerNombre"
                            value={primerNombre}
                            onChange={handleChange}
                            placeholder="Primer Nombre"
                        />
                        <InputFormulario
                            name="segundoNombre"
                            value={segundoNombre}
                            onChange={handleChange}
                            placeholder="Segundo Nombre"
                        />
                        <InputFormulario
                            name="primerApellido"
                            value={primerApellido}
                            onChange={handleChange}
                            placeholder="Primer Apellido"
                        />
                        <InputFormulario
                            name="segundoApellido"
                            value={segundoApellido}
                            onChange={handleChange}
                            placeholder="Segundo Apellido"
                        />
                        <InputFormulario
                            name="numeroIdentificacion"
                            value={numeroIdentificacion}
                            onChange={handleChange}
                            placeholder="Núnero Identificación"
                        />
                    </div>
                    <div id='contenedor-boton'>
                        <BotonVerde label="ACEPTAR" icono={<CheckIcon />} />
                        <BotonRojo onClick={onClose} label={"CANCELAR"} icono={<ClearIcon />} />
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormularioModificarUsuario