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

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: supabaseError } = await supabase.rpc('mostrar_usuario');

      if (supabaseError) {
        throw supabaseError;
      }

      setUsuarios(data);
      setUsuariosFiltrados(data);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      setError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const valor = event.target.value;
    setFiltro(valor);

    if (valor.trim() === '') {
      setUsuariosFiltrados(usuarios);
    } else {
      const filtrados = usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(valor.toLowerCase()) ||
        usuario.apellido.toLowerCase().includes(valor.toLowerCase()) ||
        usuario.nombrerol.toLowerCase().includes(valor.toLowerCase()) ||
        usuario.estadousuario.toLowerCase().includes(valor.toLowerCase())
      );
      setUsuariosFiltrados(filtrados);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

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

  const handleRegistroExitoso = () => {
    handleCloseRegistrar();
    cargarUsuarios();
  };

  const handleEliminarUsuario = async (numeroIdentificacion) => {
    try {
      const { error } = await supabase.rpc('inactivar_usuario', {
        pnumeroidentificacion: numeroIdentificacion
      });

      if (error) throw error;

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

      await cargarUsuarios();
    } catch (err) {
      console.error('Error al activar el usuario:', err);
      setError('Error al activar el usuario');
    }
  };

  const columns = [
    { id: 'nombre', label: 'NOMBRE' },
    { id: 'apellido', label: "APELLIDO" },
    { id: 'grado', label: 'GRADO' },
    { id: 'numeroIdentificacion', label: 'NÚMERO IDENTIFICACIÓN' },
    { id: 'correoElectronico', label: 'CORREO ELECTRÓNICO' },
    { id: 'nombreRol', label: 'ROL' },
    { id: 'estadoUsuario', label: 'ESTADO' },
    { id: 'opciones', label: 'OPCIONES' },
  ];

  const rows = usuariosFiltrados.map((usuario) => ({
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    grado: usuario.grado,
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

        {usuario.estadousuario.toLowerCase() === 'activo' && (
          <BotonRojo
            onClick={() => {
              const confirmacion = window.confirm('¿Estás seguro de eliminar este usuario?');
              if (confirmacion) {
                handleEliminarUsuario(usuario.numeroidentificacion);
              }
            }}
            label="ELIMINAR"
            icono={<DeleteIcon />}
          />
        )}

        {usuario.estadousuario.toLowerCase() !== 'activo' && (
          <BotonVerde
            onClick={() => {
              const confirmacion = window.confirm('¿Estás seguro de activar este usuario?');
              if (confirmacion) {
                handleActivar(usuario.numeroidentificacion);
              }
            }}
            label="ACTIVAR"
            icono={<CheckCircleIcon />}
          />
        )}
      </Stack>
    )
  }));

  return (
    <div id='contenedor-gestionar-usuario'>
      <MenuCoordinador />
      <div id='contenedor-filtro-usuario'>
        <InputFiltro
          onChange={handleChange}
          placeholder="Buscar usuario..."
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
      <div id='contenedor-tabla-usuario'>
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
