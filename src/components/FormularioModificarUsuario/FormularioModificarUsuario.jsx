import React, { useState, useEffect } from 'react';
import LabelFormulario from '../LabelFormulario/LabelFormulario';
import BotonVerde from '../BotonVerde/BotonVerde';
import BotonRojo from '../BotonRojo/BotonRojo';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import supabase from '../../supabase';
import './FormularioModificarUsuario.css';
import InputModificar from '../InputModificar/InputModificar';

const FormularioModificarUsuario = ({ onClose, nombreUsuario, onSuccess }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mensaje, setMensaje] = useState('');

    const cargarUsuario = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error: supabaseError } = await supabase
                .rpc('buscar_usuario', {
                    pnumeroidentificacion: nombreUsuario
                });

            if (supabaseError) throw supabaseError;

            if (data && data.length > 0) {
                const usuarioData = data[0];
                setUsuario({
                    numeroIdentificacion: usuarioData.numeroidentificacion || '',
                    nombreCompleto: usuarioData.nombrecompleto || '',
                    correoElectronico: usuarioData.correoelectronico || '',
                    nombreRol: usuarioData.nombrerol || '',
                    estadoUsuario: usuarioData.estadousuario || ''
                });
            } else {
                setError('Usuario no encontrado');
            }
        } catch (err) {
            console.error('Error al cargar usuario:', err);
            setError('Error al cargar el usuario');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarUsuario();
    }, [nombreUsuario]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { numeroIdentificacion, nombreCompleto, correoElectronico } = usuario;

        const { data, error } = await supabase.rpc('modificar_usuario', {
            pnumeroidentificacion: numeroIdentificacion,
            pcorreoelectronico: correoElectronico,
            pnombre: nombreCompleto
        });

        if (error) {
            console.error('Error al modificar usuario:', error);
            setMensaje('Ocurrió un error al modificar el usuario.');
        } else {
            const mensajeExito = data?.[0]?.mensaje;
            setMensaje(mensajeExito || 'Usuario modificado correctamente.');
            if (onSuccess) onSuccess();
            if (onClose) onClose();
        }



    };

    if (loading) {
        return <div className="loading">Cargando información del usuario...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <BotonRojo
                    onClick={onClose}
                    label="CERRAR"
                    icono={<ClearIcon />}
                />
            </div>
        );
    }

    return (
        <div id='contenedor-formulario'>
            <form onSubmit={handleSubmit}>
                <div id='contenedor-superior'>
                    <LabelFormulario label="Nombre Completo" />
                    <InputModificar
                        name="nombreCompleto"
                        value={usuario.nombreCompleto}
                        onChange={handleChange}
                    />

                    <LabelFormulario label="Identificación" />
                    <InputModificar
                        name="numeroIdentificacion"
                        value={usuario.numeroIdentificacion}
                        disabled
                    />

                    <LabelFormulario label="Correo Electrónico" />
                    <InputModificar
                        name="correoElectronico"
                        value={usuario.correoElectronico}
                        onChange={handleChange}
                    />

                    <LabelFormulario label="Rol" />
                    <InputModificar
                        value={usuario.nombreRol}
                        disabled
                    />

                    <LabelFormulario label="Estado" />
                    <InputModificar
                        value={usuario.estadoUsuario}
                        disabled
                    />
                </div>

                {mensaje && <p className="mensaje">{mensaje}</p>}

                <div id='contenedor-boton'>
                    <BotonVerde
                        label="ACEPTAR"
                        icono={<CheckIcon />}
                        type="submit"
                    />
                    <BotonRojo
                        onClick={onClose}
                        label="CANCELAR"
                        icono={<ClearIcon />}
                    />
                </div>
            </form>
        </div>
    );
};

export default FormularioModificarUsuario;
