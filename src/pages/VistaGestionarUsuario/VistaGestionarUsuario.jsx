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
import InputFiltro from '../../components/InputFiltro/InputFiltro';
import BotonVerde from '../../components/BotonVerde/BotonVerde';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const VistaGestionarUsuario = () => {
  const [openRegistrar, setOpenRegistrar] = useState(false);
  const [openModificar, setOpenModificar] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [filtro, setFiltro] = useState('');

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
      setUsuariosFiltrados(data); // Inicialmente mostrar todos los usuarios
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      setError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el cambio en el filtro
  const handleChange = (event) => {
    const valor = event.target.value;
    setFiltro(valor);

    if (valor.trim() === '') {
      setUsuariosFiltrados(usuarios);
    } else {
      const filtrados = usuarios.filter(usuario =>
        usuario.nombrecompleto.toLowerCase().includes(valor.toLowerCase()) ||
        usuario.nombrerol.toLowerCase().includes(valor.toLowerCase()) ||
        usuario.estadousuario.toLowerCase().includes(valor.toLowerCase())
      );
      setUsuariosFiltrados(filtrados);
    }
  };

  // Cargar usuarios al montar el componente
  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Handlers para modales
  const handleOpenRegistrar = () => setOpenRegistrar(true);
  const handleCloseRegistrar = () => setOpenRegistrar(false);

  const handleOpenModificar = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setOpenModificar(true);
  };

  const handleCloseModificar = () => {
    setOpenModificar(false);
    setUsuarioSeleccionado(null);
  };

  // Función para manejar registro exitoso
  const handleRegistroExitoso = () => {
    handleCloseRegistrar();
    cargarUsuarios();
  };

  // Función para eliminar usuario
  const handleEliminarUsuario = async (numeroIdentificacion) => {
    try {
      const { error } = await supabase.rpc('inactivar_usuario', {
        pnumeroidentificacion: numeroIdentificacion
      });

      if (error) throw error;

      // Recargar los usuarios después de la inactivación
      await cargarUsuarios();
    } catch (err) {
      console.error('Error al inactivar el usuario:', err);
      setError('Error al inactivar el usuario');
    }
  };

  const handleActivar = async (numeroIdentificacion) => {
    try {
      const { error } = await supabase.rpc('activar_usuario', {
        pnumeroidentificacion: numeroIdentificacion
      });

      if (error) throw error;

      // Recargar los usuarios después de la inactivación
      await cargarUsuarios();
    } catch (err) {
      console.error('Error al inactivar el usuario:', err);
      setError('Error al inactivar el usuario');
    }
  };

  // Configuración de columnas para la tabla
  const columns = [
    { id: 'nombreCompleto', label: 'NOMBRE COMPLETO' },
    { id: 'numeroIdentificacion', label: 'NUMERO IDENTIFICACIÓN' },
    { id: 'correoElectronico', label: 'CORREO ELECTRONICO' },
    { id: 'nombreRol', label: 'NOMBRE ROL' },
    { id: 'estadoUsuario', label: 'ESTADO USUARIO' },
    { id: 'opciones', label: 'OPCIONES' },
  ];

  // Preparar datos para la tabla
  const rows = usuariosFiltrados.map((usuario) => ({
    nombreCompleto: usuario.nombrecompleto,
    numeroIdentificacion: usuario.numeroidentificacion,
    correoElectronico: usuario.correoelectronico,
    nombreRol: usuario.nombrerol,
    estadoUsuario: usuario.estadousuario,
    opciones: (
      <Stack direction="row" spacing={3} justifyContent="center">
        <BotonFormulario
          label="MODIFICAR"
          component={ModalFormulario}
          icono={<EditIcon />}
          onClick={() => handleOpenModificar(usuario)}
          propsModal={{
            open: openModificar && usuarioSeleccionado?.numeroidentificacion === usuario.numeroidentificacion,
            handleClose: handleCloseModificar,
            tipo: "Modificar Usuario",
            titulo: "Modificar Usuario",
            nombreUsuario: usuario.numeroidentificacion,
            data: usuario,
            onSuccess: cargarUsuarios
          }}
        />

        <BotonRojo
          onClick={() => {
            const confirmacion = window.confirm('¿Estás seguro de eliminar este usuario?');
            if (confirmacion) {
              handleEliminarUsuario(usuario.numeroidentificacion);
            }
          }}
          label={"ELIMINAR"}
          icono={<DeleteIcon />}
        />

        <BotonVerde
          onClick={() => {
            const confirmacion = window.confirm('¿Estás seguro de activar este usuario?');
            if (confirmacion) {
              handleActivar(usuario.numeroidentificacion);
            }
          }}
          label={"ACTIVAR"}
          icono={<CheckCircleIcon />}
        />
      </Stack>
    ),
  }));

  return (
    <div id='contenedor-gestionar-usuario'>
      <MenuCoordinador />
      <div id='contenedor-opciones'>
        <InputFiltro
          onChange={handleChange}
          placeholder="Búscar Usuario"
          value={filtro}
        />
        <BotonFormulario
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
        />
      </div>
      <div id='contenedor-tabla'>
        <Tabla
          columns={columns}
          rows={rows}
          emptyMessage={usuariosFiltrados.length === 0 ? "No se encontraron usuarios" : null}
        />
      </div>
    </div>
  );
};

export default VistaGestionarUsuario;
