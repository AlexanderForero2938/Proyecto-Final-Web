import React, { useState, useEffect } from 'react';
import MenuCoordinador from '../../components/MenuCoordinador/MenuCoordinador';
import BotonFormulario from '../../components/BotonFormulario/BotonFormulario';
import BotonRojo from '../../components/BotonRojo/BotonRojo';
import Tabla from '../../components/Tabla/Tabla';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModalFormulario from '../../components/ModalFormulario/ModalFormulario';
import Stack from '@mui/material/Stack';
import './VistaGestionarUsuario.css';
import supabase from '../../supabase';

const VistaGestionarUsuario = () => {
  const [openRegistrar, setOpenRegistrar] = useState(false);
  const [openModificar, setOpenModificar] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar usuarios
  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: supabaseError } = await supabase.rpc('mostrar_usuario');
      
      if (supabaseError) {
        throw supabaseError;
      }
      
      setUsuarios(data);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      setError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  // Cargar usuarios al montar el componente
  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Handlers para modales
  const handleOpenRegistrar = () => setOpenRegistrar(true);
  const handleCloseRegistrar = () => setOpenRegistrar(false);
  const handleOpenModificar = () => setOpenModificar(true);
  const handleCloseModificar = () => setOpenModificar(false);

  // Función para manejar registro exitoso
  const handleRegistroExitoso = () => {
    handleCloseRegistrar();
    cargarUsuarios(); // Recargar la lista de usuarios
  };

  // Configuración de columnas para la tabla
  const columns = [
    { id: 'nombreUsuario', label: 'NOMBRE USUARIO' },
    { id: 'nombreCompleto', label: 'NOMBRE COMPLETO' },
    { id: 'numeroIdentificacion', label: 'NUMERO IDENTIFICACIÓN' },
    { id: 'opciones', label: 'OPCIONES' },
  ];

  // Preparar datos para la tabla
  const rows = usuarios.map((usuario) => ({
    nombreUsuario: usuario.nombreusuario,
    nombreCompleto: usuario.nombrecompleto,
    numeroIdentificacion: usuario.numeroidentificacion,
    opciones: (
      <Stack direction="row" spacing={2} justifyContent="center">
        <BotonFormulario
          label="MODIFICAR"
          component={ModalFormulario}
          icono={<EditIcon />}
          onClick={handleOpenModificar}
          propsModal={{
            open: openModificar,
            handleClose: handleCloseModificar,
            tipo: "Modificar Usuario",
            titulo: "Formulario Modificar Usuario",
            data: usuario,
            onSuccess: cargarUsuarios // Recargar después de modificar
          }}
        />
        <BotonRojo
          onClick={async () => {
            // Aquí podrías agregar la lógica para eliminar
            // await supabase.from('usuario').delete()...
            // Y luego:
            await cargarUsuarios(); // Recargar después de eliminar
          }}
          label={"ELIMINAR"}
          icono={<DeleteIcon />}
        />
      </Stack>
    ),
  }));

  // Renderizado condicional
  if (loading) {
    return (
      <div id='contenedor-gestionar-usuario'>
        <MenuCoordinador />
        <div className="cargando">Cargando usuarios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div id='contenedor-gestionar-usuario'>
        <MenuCoordinador />
        <div className="error">{error}</div>
        <button onClick={cargarUsuarios}>Reintentar</button>
      </div>
    );
  }

  return (
    <div id='contenedor-gestionar-usuario'>
      <MenuCoordinador />
      <div id='contenedor-opciones'>
        {<BotonFormulario
          label="REGISTRAR USUARIO"
          component={ModalFormulario}
          icono={<PersonAddIcon />}
          onClick={handleOpenRegistrar}
          propsModal={{
            open: openRegistrar,
            handleClose: handleCloseRegistrar,
            tipo: "Registrar Usuario",
            titulo: "Formulario Registrar Usuario",
            onSuccess: handleRegistroExitoso
          }}
        />}
      </div>
      <div id='contenedor-tabla'>
        {<Tabla columns={columns} rows={rows} />}
      </div>
    </div>
  );
};

export default VistaGestionarUsuario;