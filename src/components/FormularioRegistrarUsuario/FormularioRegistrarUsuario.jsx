import React, { useState } from 'react';
import InputFormulario from '../InputFormulario/InputFormulario';
import ComboBox from '../ComboBox/ComboBox';
import BotonVerde from '../BotonVerde/BotonVerde';
import BotonRojo from '../BotonRojo/BotonRojo';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import './FormularioRegistrarUsuario.css';
import supabase from '../../supabase';

const FormularioRegistrarUsuario = ({ onClose, onSuccess }) => {
    const [nombreCompletoPersona, setNombreCompletoPersona] = useState('');
    const [apellidoCompletoPersona, setApellidoCompletoPersona] = useState('');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [rolUsuario, setRolUsuario] = useState('');
    const [grado, setGrado] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'nombreCompletoPersona':
                setNombreCompletoPersona(value);
                break;
            case 'apellidoCompletoPersona':
                setApellidoCompletoPersona(value);
                break;
            case 'numeroIdentificacion':
                setNumeroIdentificacion(value);
                break;
            case 'correoElectronico':
                setCorreoElectronico(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.rpc('registrar_usuario', {
            pidentificacion: numeroIdentificacion,
            pnombre: nombreCompletoPersona,
            papellido: apellidoCompletoPersona,
            pemail: correoElectronico,
            prol: rolUsuario.toLowerCase(), // Asegúrate de que coincida con el enum en la DB
            pgrado: rolUsuario === 'Estudiante' ? grado : null
        });

        console.log({
            pidentificacion: numeroIdentificacion,
            pnombre: nombreCompletoPersona,
            papellido: apellidoCompletoPersona,
            pemail: correoElectronico,
            prol: rolUsuario.toLowerCase(),
            pgrado: rolUsuario === 'Estudiante' ? grado : null
        });

        if (error) {
            console.error(error);
            setMensaje('Ocurrió un error al registrar el usuario.');
        } else {
            const mensajeExito = data?.[0]?.mensaje;
            setMensaje(mensajeExito);
            if (mensajeExito === 'Se registró el usuario exitosamente') {
                setNombreCompletoPersona('');
                setApellidoCompletoPersona('');
                setNumeroIdentificacion('');
                setCorreoElectronico('');
                setRolUsuario('');
                setGrado('');
                if (onSuccess) onSuccess();
                if (onClose) onClose();
            }
        }
    };

    return (
        <div id='contenedor-formulario'>
            <form onSubmit={handleSubmit} id='formulario-registro-usuario'>
                <div id='contenedor-superior'>
                    <InputFormulario
                        name="nombreCompletoPersona"
                        value={nombreCompletoPersona}
                        onChange={handleChange}
                        placeholder="Nombre"
                    />
                    <InputFormulario
                        name="apellidoCompletoPersona"
                        value={apellidoCompletoPersona}
                        onChange={handleChange}
                        placeholder="Apellido"
                    />
                    <InputFormulario
                        name="numeroIdentificacion"
                        value={numeroIdentificacion}
                        onChange={handleChange}
                        placeholder="Número de Identificación"
                    />
                    <InputFormulario
                        name="correoElectronico"
                        value={correoElectronico}
                        onChange={handleChange}
                        placeholder="Correo Electrónico"
                    />
                    <ComboBox
                        label="Seleccionar usuario"
                        options={['Estudiante', 'Docente', 'Coordinador']}
                        value={rolUsuario}
                        onChange={(newValue) => setRolUsuario(newValue)}
                        placeholder="Selecciona un Rol"
                    />

                    {rolUsuario === 'Estudiante' && (
                        <ComboBox
                            label="Seleccionar grado"
                            options={['6°', '7°', '8°', '9°', '10°', '11°']}
                            value={grado}
                            onChange={(newValue) => setGrado(newValue)}
                            placeholder="Selecciona un Grado"
                        />
                    )}

                </div>

                <div id='contenedor-boton'>
                    <BotonVerde label="ACEPTAR" icono={<CheckIcon />} type="submit" />
                    <BotonRojo onClick={onClose} label="CANCELAR" icono={<ClearIcon />} />
                </div>

                <div id='contenedor-mensaje'>
                    <p className={`mensaje ${mensaje === 'Se registró el usuario exitosamente' ? 'exito' : mensaje ? 'error' : ''}`}>
                        {mensaje || '\u00A0'}
                    </p>
                </div>
            </form>
        </div>
    );
};

export default FormularioRegistrarUsuario;
