import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VistaProyectoSeleccionado.css';
import MenuDocente from '../../components/MenuDocente/MenuDocente';
import supabase from '../../supabase';

const VistaProyectoSeleccionado = () => {
  const { id } = useParams(); // Obtener el id del proyecto desde la URL
  const [proyecto, setProyecto] = useState(null);
  const [estudiantes, setEstudiantes] = useState([]);
  const [objetivos, setObjetivos] = useState([]);

  useEffect(() => {
    const fetchProyecto = async () => {
      const proyectoId = parseInt(id);

      // Obtener información del proyecto
      const { data: proyectoData, error: proyectoError } = await supabase.rpc('informacion_proyecto', {
        prid: proyectoId
      });

      if (proyectoError) {
        console.error('Error al obtener el proyecto:', proyectoError.message);
      } else if (proyectoData && proyectoData.length > 0) {
        setProyecto(proyectoData[0]);
      }

      // Obtener los estudiantes del proyecto
      const { data: estudiantesData, error: estudiantesError } = await supabase.rpc('informacion_estudiante_proyecto', {
        prid: proyectoId
      });

      if (estudiantesError) {
        console.error('Error al obtener los estudiantes:', estudiantesError.message);
      } else {
        setEstudiantes(estudiantesData);
      }

      // Obtener los objetivos del proyecto
      const { data: objetivosData, error: objetivosError } = await supabase.rpc('informacion_objetivos', {
        prid: proyectoId
      });

      if (objetivosError) {
        console.error('Error al obtener los objetivos:', objetivosError.message);
      } else {
        setObjetivos(objetivosData);
      }
    };

    if (id) fetchProyecto();
  }, [id]);

  return (
    <div id='contenedor-principal'>
      <MenuDocente />
      <div id='contenedor-titulo'>
        <h1>{proyecto?.titulo || 'Cargando...'}</h1>
        <button>Editar</button>
      </div>

      <div id='contenedor-informacion'>
        <label className='subtitulo'>Área: {proyecto?.area}</label>
        <label className='subtitulo'>Presupuesto: {proyecto?.presupuesto}</label>
        <label className='subtitulo'>Institución: {proyecto?.institucion}</label>
        <label className='subtitulo'>Docente: {proyecto?.docente}</label>
        <label className='subtitulo'>Observaciones: {proyecto?.observacion}</label>
      </div>

      <div className='contenedor'>
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

      <div className='contenedor'>
        <label className='subtitulo'>Objetivos</label>
        <ul>
          {objetivos.length === 0 ? (
            <li>No hay objetivos registrados</li>
          ) : (
            objetivos.map((obj, index) => (
              <li key={index}>{obj.nombre}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default VistaProyectoSeleccionado;
