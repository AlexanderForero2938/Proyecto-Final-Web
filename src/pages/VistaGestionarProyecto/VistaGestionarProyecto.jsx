import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuCoordinador from '../../components/MenuCoordinador/MenuCoordinador';
import InputFiltro from '../../components/InputFiltro/InputFiltro';
import Tabla from '../../components/Tabla/Tabla';
import supabase from '../../supabase';
import './VistaGestionarProyecto.css';
import BotonVerMas from '../../components/BotonVerMas/BotonVerMas';

const VistaGestionarProyecto = () => {
  const [proyectos, setProyectos] = useState([]);
  const [filtro, setFiltro] = useState(''); // Estado para el filtro
  const navigate = useNavigate();

  const columns = [
    { id: 'idproyecto', label: 'N°' },
    { id: 'titulo', label: 'TÍTULO' },
    { id: 'area', label: 'ÁREA' },
    { id: 'cronograma', label: 'CRONOGRAMA' },
    { id: 'presupuesto', label: 'PRESUPUESTO' },
    { id: 'institucion', label: 'INSTITUCIÓN' },
    { id: 'docente', label: 'DOCENTE' },
    { id: 'opciones', label: 'OPCIONES' },
  ];

  useEffect(() => {
    const fetchProyectos = async () => {
      const { data, error } = await supabase.rpc('mostrarproyectos');

      if (error) {
        console.error('Error al obtener proyectos:', error.message);
      } else {
        setProyectos(data);
      }
    };

    fetchProyectos();
  }, []);

  const handleChange = (event) => {
    setFiltro(event.target.value); // Actualiza el filtro
  };

  // Filtrar los proyectos según el filtro ingresado
  const filteredProyectos = proyectos.filter((proyecto) =>
    proyecto.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
    proyecto.area.toLowerCase().includes(filtro.toLowerCase()) ||
    String(proyecto.presupuesto).toLowerCase().includes(filtro.toLowerCase()) ||
    proyecto.institucion.toLowerCase().includes(filtro.toLocaleLowerCase()) ||
    proyecto.docente.toLowerCase().includes(filtro.toLocaleLowerCase())
  );


  const rows = filteredProyectos.map((item) => ({
    ...item,
    opciones: (
      <BotonVerMas ruta={`/VistaProyectoSeleccionadoCoordinador/${item.idproyecto}`}/>
    ),
  }));

  return (
    <div id="contenedor-gestionar-proyecto">
      <MenuCoordinador />
      <div id="contenedor-filtro-proyecto">
        <InputFiltro
          onChange={handleChange}
          placeholder="Buscar proyecto..."
          value={filtro}
        />
      </div>
      <div id="contenedor-tabla-proyecto">
        <Tabla columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default VistaGestionarProyecto;
