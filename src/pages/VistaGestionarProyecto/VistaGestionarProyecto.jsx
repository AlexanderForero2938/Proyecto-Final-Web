import React, { useState } from 'react';
import MenuCoordinador from '../../components/MenuCoordinador/MenuCoordinador';
import ComboBox from '../../components/ComboBox/ComboBox';
import BotonFormulario from '../../components/BotonFormulario/BotonFormulario';
import ModalFormulario from '../../components/ModalFormulario/ModalFormulario';
import EditIcon from '@mui/icons-material/Edit';
import Tabla from '../../components/Tabla/Tabla';
import './VistaGestionarProyecto.css';


const VistaGestionarProyecto = () => {

    const [openModificar, setOpenModificar] = useState(false);

    const handleOpenModificar = () => setOpenModificar(true);
    const handleCloseModificar = () => setOpenModificar(false);

    const columns = [
        { id: 'nombreProyecto', label: 'NOMBRE PROYECYO' },
        { id: 'area', label: 'ÁREA' },
        { id: 'estadoProyecto', label: 'ESTADO PROYECTO' },
        { id: 'presupuestoProyecto', label: 'PRESUPUESTO PROYECTO' },
        { id: 'nombreDocente', label: 'NOMBRE DOCENTE' },
        { id: 'nombreInstitucion', label: 'NOMBRE INSTITUCIÓN' },
        { id: 'observacion', label: 'OBSERVACIÓN' },
        { id: 'opciones', label: 'OPCIONES' },
    ];

    const data = [
        {
            nombreProyecto: 'Nombre Uno',
            area: 'Matematicas',
            estadoProyecto: 'Activo',
            presupuestoProyecto: '$2.000',
            nombreDocente: 'Pepito Perez',
            nombreInstitucion: 'I.E. La Industrial',
            observacion: 'Proyecto en marcha',
        },
        {
            nombreProyecto: 'Nombre Dos',
            area: 'Investigación',
            estadoProyecto: 'Inactivo',
            presupuestoProyecto: '$5.500',
            nombreDocente: 'Pepito Perez',
            nombreInstitucion: 'I.E. La Industrial',
            observacion: 'Pendiente de aprobación',
        },

    ];

    const rows = data.map((item) => ({
        ...item,
        opciones: (
            <BotonFormulario
                label="MODIFICAR PROYECTO"
                component={ModalFormulario}
                icono={<EditIcon />}
                onClick={handleOpenModificar}
                propsModal={{
                    open: openModificar,
                    handleClose: handleCloseModificar,
                    tipo: "Modificar Proyecto",
                    titulo: "Formulario Proyecto",
                    data: item,
                }}
            />
        ),
    }));


    return (
        <div id='contenedor-gestionar-proyecto'>
            <MenuCoordinador></MenuCoordinador>
            <div id='contenedor-opciones'>
                <ComboBox></ComboBox>
                <ComboBox></ComboBox>
            </div>
            <div id='contenedor-tabla'>
                <Tabla columns={columns} rows={rows}></Tabla>
            </div>
        </div>
    )
}

export default VistaGestionarProyecto
