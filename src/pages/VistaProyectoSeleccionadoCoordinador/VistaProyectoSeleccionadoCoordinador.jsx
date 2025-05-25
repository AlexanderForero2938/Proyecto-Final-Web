import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VistaProyectoSeleccionadoCoordinador.css';
import MenuCoordinador from '../../components/MenuCoordinador/MenuCoordinador';
import supabase from '../../supabase';
import BotonFormulario from '../../components/BotonFormulario/BotonFormulario';
import ModalFormulario from '../../components/ModalFormulario/ModalFormulario';
// Importa la función para generar PDF
import { generateProjectPDF } from '../../utilidades/generarPdf';
import Acordion from '../../components/According/Acordion';

const VistaProyectoSeleccionadoCoordinador = () => {
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

      // Traer información del proyecto
      const { data: proyectoData, error: errorProyecto } = await supabase.rpc('informacion_proyecto', { prid: proyectoId });
      if (errorProyecto) {
        console.error('Error al traer proyecto:', errorProyecto);
      } else if (proyectoData?.length > 0) {
        setProyecto(proyectoData[0]);
      }

      // Traer estudiantes asignados
      const { data: estudiantesData, error: errorEstudiantes } = await supabase.rpc('informacion_estudiante_proyecto', { prid: proyectoId });
      if (errorEstudiantes) {
        console.error('Error al traer estudiantes:', errorEstudiantes);
      } else {
        setEstudiantes(estudiantesData || []);
      }

      // Traer objetivos
      const { data: objetivosData, error: errorObjetivos } = await supabase.rpc('informacion_objetivos', { prid: proyectoId });
      if (errorObjetivos) {
        console.error('Error al traer objetivos:', errorObjetivos);
      } else {
        setObjetivos(objetivosData || []);
      }

      // Traer estado actual
      const { data: estadoData, error: errorEstado } = await supabase.rpc('estadoproyecto', { pid: proyectoId });
      if (errorEstado) {
        console.error('Error al traer estado:', errorEstado);
      } else if (estadoData?.length > 0) {
        setEstado(estadoData[0].estado);
      }

      // Traer historial de estados
      const { data: historialData, error: errorHistorial } = await supabase.rpc('historial_estado', { pid: proyectoId });
      if (errorHistorial) {
        console.error('Error al traer historial:', errorHistorial);
      } else {
        setHistorialEstados(historialData || []);
      }
    };

    if (id) fetchProyecto();
  }, [id]);

  return (
    <div id='contenedor-principal-proyecto-coordinado'>
      <MenuCoordinador />

      <div id='contenedor-titulo-proyecto'>
        <h1>{proyecto?.titulo || 'Cargando...'}</h1>

        {/* Botón Descargar PDF */}
        <button
          className='btn-pdf'
          onClick={() => generateProjectPDF({ proyecto, estudiantes, objetivos, estado, historialEstados })}
        >
          Descargar PDF
        </button>
      </div>

      <div className='contenedor-informacion'>
        <label className='subtitulo'>N° Proyecto: {proyecto?.id}</label>
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

      <div className='contenedor-boton'>
        {proyecto && (
          <BotonFormulario
            label="AGREGAR ESTADO"
            component={ModalFormulario}
            onClick={handleOpenRegistrar}
            propsModal={{
              open: openRegistrar,
              handleClose: handleCloseRegistrar,
              tipo: 'Agregar Estado',
              titulo: 'Formulario Estado Proyecto',
              nombreUsuario: proyecto.id,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default VistaProyectoSeleccionadoCoordinador;
