import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuCoordinador from '../../components/MenuCoordinador/MenuCoordinador';
import ComboBox from '../../components/ComboBox/ComboBox';
import BotonFormulario from '../../components/BotonFormulario/BotonFormulario';
import ModalFormulario from '../../components/ModalFormulario/ModalFormulario';
import EditIcon from '@mui/icons-material/Edit';
import Tabla from '../../components/Tabla/Tabla';
import supabase from '../../supabase';
import './VistaGestionarProyecto.css';

const VistaGestionarProyecto = () => {
  const [proyectos, setProyectos] = useState([]);
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

  const rows = proyectos.map((item) => ({
    ...item,
    opciones: (
      <button
        onClick={() => navigate(`/VistaProyectoSeleccionadoCoordinador/${item.idproyecto}`)}
        className="btn-vermas"
      >
        Ver Más
      </button>
    ),
  }));

  return (
    <div id='contenedor-gestionar-proyecto'>
      <MenuCoordinador />
      <div id='contenedor-opciones'>
      </div>
      <div id='contenedor-tabla'>
        <Tabla columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default VistaGestionarProyecto;
