import React, { useState } from 'react';
import InputFormulario from '../InputFormulario/InputFormulario';
import BotonVerde from '../BotonVerde/BotonVerde';
import BotonRojo from '../BotonRojo/BotonRojo';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import './FormularioRegistrarUsuario.css';
import supabase from '../../supabase';

const FormularioRegistrarUsuario = ({ onClose }) => {
    const [primerNombre, setPrimerNombre] = useState('');
    const [segundoNombre, setSegundoNombre] = useState('');
    const [primerApellido, setPrimerApellido] = useState('');
    const [segundoApellido, setSegundoApellido] = useState('');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [mensaje, setMensaje] = useState(''); // ✅ Aquí lo defines

    const handleChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Formulario enviado");
    
        const { data, error } = await supabase.rpc('registrar_usuario', {
            pprimernombrepersona: primerNombre,
            psegundonombrepersona: segundoNombre,
            pprimerapellidopersona: primerApellido,
            psegundoapellidopersona: segundoApellido,
            pnumeroidentificacionpersona: numeroIdentificacion
        });
    
        if (error) {
            setMensaje('Ocurrió un error al registrar el usuario.');
        } else {
            const mensajeExito = data?.[0]?.mensaje;
            setMensaje(mensajeExito);
    
            // Este if debe estar DENTRO del bloque else
            if (mensajeExito === 'Se registró el usuario exitosamente') {
                setPrimerNombre('');
                setSegundoNombre('');
                setPrimerApellido('');
                setSegundoApellido('');
                setNumeroIdentificacion('');
            }
        }
    };


    return (
        <>
            <div id='contenedor-formulario'>
                <form onSubmit={handleSubmit}> {/* ✅ Debes vincular handleSubmit al form */}
                    <div id='contenedor-superior'>
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
                            placeholder="Número Identificación"
                        />
                    </div>
                    <div id='contenedor-boton'>
                        <BotonVerde label="ACEPTAR" icono={<CheckIcon />} />
                        <BotonRojo onClick={onClose} label={"CANCELAR"} icono={<ClearIcon />} />
                    </div>
                    {mensaje && <p className="mensaje">{mensaje}</p>} {/* ✅ Mostrar mensaje */}
                </form>
            </div>
        </>
    );
};

export default FormularioRegistrarUsuario;
