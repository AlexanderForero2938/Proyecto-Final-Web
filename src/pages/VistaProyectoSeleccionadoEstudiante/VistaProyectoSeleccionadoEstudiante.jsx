import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../supabase';
import Acordion from '../../components/According/Acordion';
import './VistaProyectoSeleccionadoEstudiante.css';
import BotonFormulario from '../../components/BotonFormulario/BotonFormulario';
import ModalFormulario from '../../components/ModalFormulario/ModalFormulario';
import MenuEstudiante from '../../components/MenuEstudiante/MenuEstudiante';
import { generateProjectPDF } from '../../utilidades/generarPdf';

const VistaProyectoSeleccionadoEstudiante = () => {
    const { id } = useParams();
    const [proyecto, setProyecto] = useState(null);
    const [estudiantes, setEstudiantes] = useState([]);
    const [objetivos, setObjetivos] = useState([]);
    const [estado, setEstado] = useState('');
    const [historialEstados, setHistorialEstados] = useState([]);

    const [openRegistrar, setOpenRegistrar] = useState(false);
    const handleOpenRegistrar = () => setOpenRegistrar(true);
    const handleCloseRegistrar = () => setOpenRegistrar(false);

    useEffect(() => {
        const fetchProyecto = async () => {
            const proyectoId = parseInt(id);

            const { data: proyectoData, error: proyectoError } = await supabase.rpc('informacion_proyecto', { prid: proyectoId });
            if (proyectoError) {
                console.error('Error al obtener el proyecto:', proyectoError.message);
            } else if (proyectoData?.length) {
                setProyecto(proyectoData[0]);
            }

            const { data: estudiantesData, error: estudiantesError } = await supabase.rpc('informacion_estudiante_proyecto', { prid: proyectoId });
            if (estudiantesError) {
                console.error('Error al obtener los estudiantes:', estudiantesError.message);
            } else {
                setEstudiantes(estudiantesData);
            }

            const { data: objetivosData, error: objetivosError } = await supabase.rpc('informacion_objetivos', { prid: proyectoId });
            if (objetivosError) {
                console.error('Error al obtener los objetivos:', objetivosError.message);
            } else {
                setObjetivos(objetivosData);
            }

            const { data: estadoData, error: estadoError } = await supabase.rpc('estadoproyecto', { pid: proyectoId });
            if (estadoError) {
                console.error('Error al obtener el estado del proyecto:', estadoError.message);
            } else if (estadoData?.length) {
                setEstado(estadoData[0].estado);
            }

            const { data: historialData, error: historialError } = await supabase.rpc('historial_estado', { pid: proyectoId });
            if (historialError) {
                console.error('Error al obtener el historial de estados:', historialError.message);
            } else {
                setHistorialEstados(historialData);
            }
        };

        if (id) fetchProyecto();
    }, [id]);

    return (
        <div id='contenedor-principal-proyecto-estudiante'>
            <MenuEstudiante />
            
            <div id='contenedor-titulo-proyecto'>
                <h1>{proyecto?.titulo || 'Cargando...'}</h1>
                {/* Botón para descargar PDF */}
                <button
                    onClick={() => generateProjectPDF({ proyecto, estudiantes, objetivos, estado, historialEstados })}
                    className='btn-pdf'
                >
                    Descargar PDF
                </button>
            </div>

            <div className='contenedor-informacion'>
                <label className='subtitulo'>Id Proyecto: {proyecto?.id}</label>
                <label className='subtitulo'>Área: {proyecto?.area}</label>
                <label className='subtitulo'>Presupuesto: {proyecto?.presupuesto}</label>
                <label className='subtitulo'>Institución: {proyecto?.institucion}</label>
                <label className='subtitulo'>Docente: {proyecto?.docente}</label>
                <label className='subtitulo'>Observaciones: {proyecto?.observacion}</label>
                <label className='subtitulo'>Estado: {estado || 'No definido'}</label>
            </div>

            <div className='contenedor-informacion'>
                <label className='subtitulo'>Integrantes</label>
                <ul>
                    {estudiantes.length === 0 ? (
                        <li>No hay estudiantes asignados</li>
                    ) : (
                        estudiantes.map((est, index) => (
                            <li key={index}>{est.nombre}</li>
                        ))
                    )}
                </ul>
            </div>

            <div className='contenedor-informacion'>
                <label className='subtitulo'>Objetivos</label>
                <Acordion objetivos={objetivos} />
            </div>

            <div className='contenedor-informacion'>
                <label className='subtitulo'>Histórico de Estados</label>
                <ul>
                    {historialEstados.length === 0 ? (
                        <li>No hay historial registrado</li>
                    ) : (
                        historialEstados.map((item, idx) => (
                            <li key={idx}>
                                <strong>{item.estado}</strong> - {item.observacion || 'Sin observación'}<br />
                                <small>{new Date(item.fecha_cambio).toLocaleString()}</small>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <div id='contenedor-boton'>
                {proyecto && (
                    <BotonFormulario
                        label="AGREGAR AVANCE"
                        component={ModalFormulario}
                        onClick={handleOpenRegistrar}
                        propsModal={{
                            open: openRegistrar,
                            handleClose: handleCloseRegistrar,
                            tipo: 'Agregar Avance',
                            titulo: 'Formulario Avance',
                            nombreUsuario: proyecto.id,
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default VistaProyectoSeleccionadoEstudiante;
