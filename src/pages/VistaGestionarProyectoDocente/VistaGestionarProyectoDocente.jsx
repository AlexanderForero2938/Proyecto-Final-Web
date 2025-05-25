import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VistaGestionarProyectoDocente.css';
import MenuDocente from '../../components/MenuDocente/MenuDocente';
import BotonFormulario from '../../components/BotonFormulario/BotonFormulario';
import ModalFormulario from '../../components/ModalFormulario/ModalFormulario';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tabla from '../../components/Tabla/Tabla';
import supabase from '../../supabase';
import BotonVerMas from '../../components/BotonVerMas/BotonVerMas';
import InputFiltro from '../../components/InputFiltro/InputFiltro';

const VistaGestionarProyectoDocente = () => {
  const [openRegistrar, setOpenRegistrar] = useState(false);
  const [proyectos, setProyectos] = useState([]);
  const [filtro, setFiltro] = useState(''); // Estado para el filtro
  const navigate = useNavigate();

  const handleOpenRegistrar = () => setOpenRegistrar(true);
  const handleCloseRegistrar = () => setOpenRegistrar(false);

  const idDocente = parseInt(sessionStorage.getItem('idUsuario'));

  const columns = [
    { id: 'idproyecto', label: 'N°' },
    { id: 'titulo', label: 'TÍTULO' },
    { id: 'area', label: 'ÁREA' },
    { id: 'cronograma', label: 'CRONOGRAMA' },
    { id: 'presupuesto', label: 'PRESUPUESTO' },
    { id: 'institucion', label: 'INSTITUCIÓN' },
    { id: 'mas', label: 'VER MÁS' },
  ];

  // Función para obtener proyectos
  const fetchProyectos = async () => {
    const { data, error } = await supabase.rpc('mostrarproyectodocente', {
      piddocente: idDocente,
    });

    if (error) {
      console.error('Error obteniendo proyectos:', error.message);
    } else {
      setProyectos(data);
    }
  };

  useEffect(() => {
    if (idDocente) {
      fetchProyectos(); // Llama a la función al cargar el componente
    }
  }, [idDocente]);

  const handleChange = (event) => {
    setFiltro(event.target.value); // Actualiza el filtro
  };

  const filteredProyectos = proyectos.filter((proyecto) =>
    proyecto.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
    proyecto.area.toLowerCase().includes(filtro.toLowerCase()) ||
    String(proyecto.presupuesto).toLowerCase().includes(filtro.toLowerCase()) ||
    proyecto.institucion.toLowerCase().includes(filtro.toLowerCase())
  );

  const rows = filteredProyectos.map((item) => ({
    ...item,
    mas: (
      <BotonVerMas ruta={`/VistaProyectoSeleccionado/${item.idproyecto}`} />
    ),
  }));

  return (
    <div id="gestionar-proyecto">
      <MenuDocente />
      <div id="contenedor-filtro">
        <InputFiltro
          onChange={handleChange}
          placeholder="Buscar proyecto..."
          value={filtro}
        />
        <BotonFormulario
          label="REGISTRAR PROYECTO"
          component={ModalFormulario}
          icono={<AddCircleIcon />}
          onClick={handleOpenRegistrar}
          propsModal={{
            open: openRegistrar,
            handleClose: () => {
              handleCloseRegistrar();
              fetchProyectos(); // Recarga los proyectos al cerrar el modal
            },
            tipo: 'Registrar Proyecto',
            titulo: 'Formulario Registrar Proyecto',
          }}
        />
      </div>
      <div id="tabla-proyecto-contenedor">
        <Tabla columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default VistaGestionarProyectoDocente;
