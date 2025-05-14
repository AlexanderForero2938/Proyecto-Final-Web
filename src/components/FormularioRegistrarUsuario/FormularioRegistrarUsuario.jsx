import React, { useState, useEffect } from 'react';
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
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [rolUsuario, setRolUsuario] = useState('');
    const [roles, setRoles] = useState([]);
    const [mensaje, setMensaje] = useState('');

    // Función para cargar roles
    const cargarRoles = async () => {
        try {
            const { data, error } = await supabase.rpc('mostrar_rol');
            if (error) {
                console.error('Error al cargar los roles:', error);
                return;
            }
            setRoles(data); // Aquí cada item es { nombrerol: '...' }
        } catch (err) {
            console.error('Error inesperado al cargar los roles:', err);
        }
    };

    useEffect(() => {
        cargarRoles();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'nombreCompletoPersona':
                setNombreCompletoPersona(value);
                break;
            case 'numeroIdentificacion':
                setNumeroIdentificacion(value);
                break;
            case 'correoElectronico':
                setCorreoElectronico(value);
            default:
                break;
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Formulario enviado");

        const { data, error } = await supabase.rpc('registrar_usuario', {
            pnombre: nombreCompletoPersona,
            pnumeroidentificacion: numeroIdentificacion,
            pcorreoelectronico: correoElectronico,
            prol: rolUsuario

        });
        console.log({
            pnombre: nombreCompletoPersona,
            pnumeroidentificacion: numeroIdentificacion,
            pcorreoelectronico: correoElectronico,
            prol: rolUsuario
        });


        if (error) {
            setMensaje('Ocurrió un error al registrar el usuario.');
        } else {
            const mensajeExito = data?.[0]?.mensaje;
            setMensaje(mensajeExito);
            if (mensajeExito === 'Se registró el usuario exitosamente') {
                setNombreCompletoPersona('');
                setNumeroIdentificacion('');
                setCorreoElectronico('');
                setRolUsuario('');

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
                        placeholder="Nombre Completo Persona"
                    />
                    <InputFormulario
                        name="numeroIdentificacion"
                        value={numeroIdentificacion}
                        onChange={handleChange}
                        placeholder="Número Identificación"
                    />
                    <InputFormulario
                        name="correoElectronico"
                        value={correoElectronico}
                        onChange={handleChange}
                        placeholder="Correo Electronico"
                    />
                    <ComboBox
                        label="Seleccionar usuario"
                        options={roles.map((rol) => rol.nombrerol)}
                        value={rolUsuario}
                        onChange={(newValue) => setRolUsuario(newValue)}
                        placeholder="Selecciona un Rol"
                    />
                </div>
                <div id='contenedor-boton'>
                    <BotonVerde label="ACEPTAR" icono={<CheckIcon />} type="submit"/>
                    <BotonRojo onClick={onClose} label={"CANCELAR"} icono={<ClearIcon />} />
                </div>
                <div id='contenedor-mensaje'>
                    <p className={`mensaje ${mensaje === 'Se registró el usuario exitosamente'
                        ? 'exito'
                        : mensaje ? 'error' : ''
                        }`}>
                        {mensaje || '\u00A0'}
                    </p>
                </div>

            </form>
        </div>
    );
};

export default FormularioRegistrarUsuario;