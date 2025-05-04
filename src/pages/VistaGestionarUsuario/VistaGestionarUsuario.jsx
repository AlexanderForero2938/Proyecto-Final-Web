import React, { useState } from 'react';  // Agrega { useState } al import
import MenuCoordinador from '../../components/MenuCoordinador/MenuCoordinador'
import BotonFormulario from '../../components/BotonFormulario/BotonFormulario'
import BotonRojo from '../../components/BotonRojo/BotonRojo'
import Tabla from '../../components/Tabla/Tabla'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModalFormulario from '../../components/ModalFormulario/ModalFormulario'
import Stack from '@mui/material/Stack';
import './VistaGestionarUsuario.css'

const VistaGestionarUsuario = () => {

  const [openRegistrar, setOpenRegistrar] = useState(false);
  const [openModificar, setOpenModificar] = useState(false);

  const handleOpenRegistrar = () => setOpenRegistrar(true);
  const handleCloseRegistrar = () => setOpenRegistrar(false);

  const handleOpenModificar = () => setOpenModificar(true);
  const handleCloseModificar = () => setOpenModificar(false);


  const columns = [
    { id: 'nombreUsuario', label: 'NOMBRE USUARIO' },
    { id: 'nombrePersona', label: 'NOMBRE COMPLETO' },
    { id: 'numeroIdentificacion', label: 'NUMERO IDENTIFICACIÓN' },
    { id: 'opciones', label: 'OPCIONES' },
  ];

  const data = [
    {
        nombreUsuario: '1117546716',
        nombrePersona: 'Jhon Alexander Moreno Forero',
        numeroIdentificacion: '1117546716',
    },
    {
        nombreUsuario: '2222333344',
        nombrePersona: 'María Fernanda López García',
        numeroIdentificacion: '2222333344',
    },
];

const rows = data.map((item) => ({
    ...item,
    opciones: (
        <Stack direction="row" spacing={2} justifyContent="center">
            <BotonFormulario
                label="MODIFICAR USUARIO"
                component={ModalFormulario}
                icono={<EditIcon />}
                onClick={handleOpenModificar}
                propsModal={{
                    open: openModificar,
                    handleClose: handleCloseModificar,
                    tipo: "Modificar Usuario",
                    titulo: "Formulario Modificar Usuario",
                    data: item, // Puedes pasar el usuario aquí si lo necesitas dentro del modal
                }}
            />
            <BotonRojo
                onClick={() => alert(`Has hecho clic en ELIMINAR: ${item.nombreUsuario}`)}
                label={"ELIMINAR"}
                icono={<DeleteIcon />}
            />
        </Stack>
    ),
}));


  return (
    <>
      <div id='contenedor-gestionar-usuario'>
        <MenuCoordinador></MenuCoordinador>
        <div id='contenedor-opciones'>
          <BotonFormulario
            label="REGISTRAR USUARIO"
            component={ModalFormulario}
            icono={<PersonAddIcon />}
            onClick={handleOpenRegistrar}
            propsModal={{
              open: openRegistrar, // Usa su propio estado
              handleClose: handleCloseRegistrar,
              tipo: "Registrar Usuario",
              titulo: "Formulario Registrar Usuario",
            }}
          />
        </div>
        <div id='contenedor-tabla'>
          <Tabla columns={columns} rows={rows}></Tabla>
        </div>
      </div>

    </>

  )
}

export default VistaGestionarUsuario