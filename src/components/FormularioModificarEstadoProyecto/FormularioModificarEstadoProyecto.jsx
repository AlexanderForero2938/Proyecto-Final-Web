import React, { useState, useEffect } from 'react';
import LabelFormulario from '../LabelFormulario/LabelFormulario';
import BotonVerde from '../BotonVerde/BotonVerde';
import BotonRojo from '../BotonRojo/BotonRojo';

const FormularioModificarEstadoProyecto = ({onClose}) => {
    return (
        <div id='contenedor-formulario'>
            <form>
                <div id='contenedor-superior'>
                    <LabelFormulario
                        label="Titulo Proyecto"
                    />
                    <LabelFormulario
                        label="Nombre Completo"
                        valor={usuario.nombreCompleto}
                    />
                    <LabelFormulario
                        label="Número De Identificación"
                        valor={usuario.numeroIdentificacion}
                    />
                    <LabelFormulario
                        label="Nombre Rol"
                        valor={usuario.nombreRol}
                    />
                    <LabelFormulario
                        label="Estado Usuario"
                        valor={usuario.estadoUsuario}
                    />
                </div>
                <div id='contenedor-boton'>
                    <BotonVerde
                        label="ACEPTAR"
                        icono={<CheckIcon />}
                    />
                    <BotonRojo
                        onClick={onClose}
                        label="CANCELAR"
                        icono={<ClearIcon />}
                    />
                </div>
            </form>
        </div>
    )
}

export default FormularioModificarEstadoProyecto
