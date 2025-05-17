// src/pages/VistaGestionarProyectoDocente/VistaGestionarProyectoDocente.jsx
import React, { useEffect, useState } from 'react';
import './VistaGestionarProyectoDocente.css';
import MenuDocente from '../../components/MenuDocente/MenuDocente';
import BotonFormulario from '../../components/BotonFormulario/BotonFormulario';
import ModalFormulario from '../../components/ModalFormulario/ModalFormulario';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddIcon from '@mui/icons-material/Add';
import Tabla from '../../components/Tabla/Tabla';
import supabase from '../../supabase'; // Asegúrate de tener esta configuración correctamente exportada

const VistaGestionarProyectoDocente = () => {
  const [openRegistrar, setOpenRegistrar] = useState(false);
  const [openModificar, setOpenModificar] = useState(false);
  const [proyectos, setProyectos] = useState([]);

  const handleOpenRegistrar = () => setOpenRegistrar(true);
  const handleCloseRegistrar = () => setOpenRegistrar(false);
  const handleOpenModificar = () => setOpenModificar(true);
  const handleCloseModificar = () => setOpenModificar(false);

  const idDocente = parseInt(sessionStorage.getItem('idUsuario')); // Suponiendo que guardaste el id en sessionStorage

  const columns = [
    { id: 'idproyecto', label: 'N°' },
    { id: 'titulo', label: 'TÍTULO' },
    { id: 'area', label: 'ÁREA' },
    { id: 'cronograma', label: 'CRONOGRAMA' },
    { id: 'presupuesto', label: 'PRESUPUESTO' },
    { id: 'institucion', label: 'INSTITUCIÓN' },
    { id: 'mas', label: 'VER MÁS' },
  ];

  useEffect(() => {
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

    if (idDocente) {
      fetchProyectos();
    }
  }, [idDocente]);

  const rows = proyectos.map((item) => ({
    ...item,
    mas: (
      <BotonFormulario
        component={ModalFormulario}
        icono={<AddIcon />}
        onClick={handleOpenModificar}
        propsModal={{
          open: openModificar,
          handleClose: handleCloseModificar,
          tipo: 'Modificar Proyecto',
          titulo: 'Formulario Modificar Proyecto',
          data: item,
        }}
      />
    ),
  }));

  return (
    <div id="contenedor-gestionar-usuario">
      <MenuDocente />
      <div id="contenedor-opciones">
        <BotonFormulario
          label="REGISTRAR PROYECTO"
          component={ModalFormulario}
          icono={<PersonAddIcon />}
          onClick={handleOpenRegistrar}
          propsModal={{
            open: openRegistrar,
            handleClose: handleCloseRegistrar,
            tipo: 'Registrar Proyecto',
            titulo: 'Formulario Registrar Proyecto',
          }}
        />
      </div>
      <div id="contenedor-tabla">
        <Tabla columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default VistaGestionarProyectoDocente;
