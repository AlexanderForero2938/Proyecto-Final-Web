import React, { useState } from 'react';
import { Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, Button, Modal, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import './Estudiante.css';

const ObjetivoItem = ({ objetivo, index }) => {
  const [mostrarCarga, setMostrarCarga] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [archivos, setArchivos] = useState([]);
  const [avanceGuardado, setAvanceGuardado] = useState(false);
  const [fechaRegistro, setFechaRegistro] = useState('');
  const [estado, setEstado] = useState('Pendiente');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); 

  const manejarCambioArchivo = (e) => {
    const nuevosArchivos = Array.from(e.target.files);
    setArchivos((prev) => [...prev, ...nuevosArchivos]); 
  };

  const eliminarArchivo = (nombreArchivo) => {
    const nuevos = archivos.filter((archivo) => archivo.name !== nombreArchivo);
    setArchivos(nuevos);
  };

  const guardarAvance = () => {
    if (!descripcion.trim() || archivos.length === 0) {
      alert('Por favor, completa la descripción y selecciona al menos un archivo.');
      return;
    }

    const hoy = new Date().toLocaleDateString();
    setFechaRegistro(hoy);
    setEstado('Enviado');
    setAvanceGuardado(true);
  };

  const iniciarEdicionAvance = () => {
    setAvanceGuardado(false);
    setMostrarCarga(true); 
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const confirmarEliminarAvance = () => {
    setDescripcion('');
    setArchivos([]);
    setAvanceGuardado(false);
    setFechaRegistro('');
    setEstado('Pendiente');
    setMostrarCarga(false);
    handleCloseConfirmDialog();
  };

  return (
    <Box sx={{ mb: 2, borderBottom: '1px solid #ccc', pb: 1 }}>
      <Typography variant="body1" gutterBottom>
        <strong>Objetivo {index + 1}:</strong> {objetivo}
      </Typography>

      <Button
        size="small"
        variant="outlined"
        sx={{ mt: 1, mb: 1 }}
        onClick={() => setMostrarCarga(!mostrarCarga)}
      >
        {mostrarCarga && !avanceGuardado ? 'Ocultar carga' : (avanceGuardado ? 'Ver/Editar Avance' : 'Subir avance')}
      </Button>

      <Collapse in={mostrarCarga}>
        <Box className="upload-box">
          {!avanceGuardado ? (
            <>
              <Box sx={{ mb: 2 }}>
                <label>Descripción del avance:</label>
                <textarea
                  rows="3"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <label>Archivos de evidencia:</label>
                <input className='boton-subir-archivos'
                  type="file"
                  multiple
                  onChange={manejarCambioArchivo}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </Box>

              {archivos.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2"><strong>Archivos seleccionados:</strong></Typography>
                  {archivos.map((archivo, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="body2">{archivo.name}</Typography>
                      <Button color="error" size="small" sx={{ ml: 1 }} onClick={() => eliminarArchivo(archivo.name)}>
                        Eliminar
                      </Button>
                    </Box>
                  ))}
                </Box>
              )}

              <Button variant="contained" onClick={guardarAvance}>
                Guardar avance
              </Button>
            </>
          ) : (
            <Box>
              <Typography variant="body2"><strong>Fecha registrada:</strong> {fechaRegistro}</Typography>
              <Typography variant="body2"><strong>Descripción:</strong> {descripcion}</Typography>
              <Typography variant="body2"><strong>Archivos:</strong></Typography>
              {archivos.map((archivo, idx) => (
                <Typography key={idx} variant="body2">• {archivo.name}</Typography>
              ))}
              <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                <strong>Estado:</strong> {estado}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Button onClick={iniciarEdicionAvance} color="warning" sx={{ mr: 1 }}>
                  Editar avance
                </Button>
                <Button onClick={handleOpenConfirmDialog} color="error">
                  Eliminar avance
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Collapse>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar este avance? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmarEliminarAvance} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const Estudiante = () => {
  const proyectos = [
    {
      id: 1,
      titulo: 'Estudio sobre reptiles en zonas rurales',
      descripcion: 'Este proyecto busca conocer el hábitat de reptiles en zonas rurales.',
      imagenUrl: 'https://www.ecestaticos.com/imagestatic/clipping/e38/18e/e3818e9acc05e7ee3c36ade8ad43fb79/descubre-el-reportaje-con-el-que-regresa-equipo-de-investigacion.jpg?mtime=1504620347',
      objetivos: [
        'Identificar especies comunes de reptiles en zonas rurales.',
        'Analizar condiciones climáticas de sus hábitats.',
        'Proponer estrategias de conservación.'
      ]
    },
    {
      id: 2,
      titulo: 'Uso de energías renovables en comunidades rurales',
      descripcion: 'Analizar la viabilidad de la energía solar y eólica en áreas apartadas.',
      imagenUrl: 'https://www.ecestaticos.com/imagestatic/clipping/e38/18e/e3818e9acc05e7ee3c36ade8ad43fb79/descubre-el-reportaje-con-el-que-regresa-equipo-de-investigacion.jpg?mtime=1504620347',
      objetivos: [
        'Estudiar recursos renovables disponibles.',
        'Evaluar impacto económico y social.',
        'Diseñar un plan piloto de implementación.'
      ]
    },
    {
      id: 3,
      titulo: 'Impacto del cambio climático en la agricultura local',
      descripcion: 'Investigar cómo afecta el clima a los cultivos en Florencia.',
      imagenUrl: 'https://www.ecestaticos.com/imagestatic/clipping/e38/18e/e3818e9acc05e7ee3c36ade8ad43fb79/descubre-el-reportaje-con-el-que-regresa-equipo-de-investigacion.jpg?mtime=1504620347',
      objetivos: [
        'Recolectar datos históricos del clima.',
        'Entrevistar a agricultores sobre sus experiencias.',
        'Proponer soluciones de adaptación.'
      ]
    }
  ];

  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  return (
    <Box className="cargaestudiante-container">
      <Typography variant="h4" gutterBottom>
        Proyectos de Investigación
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {proyectos.map((proyecto) => (
            <TableRow key={proyecto.id}>
              <TableCell>{proyecto.titulo}</TableCell>
              <TableCell>{proyecto.descripcion}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => setProyectoSeleccionado(proyecto)}>
                  Ver detalles
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        open={Boolean(proyectoSeleccionado)}
        onClose={() => setProyectoSeleccionado(null)}
        aria-labelledby="modal-proyecto"
        aria-describedby="modal-proyecto-descripcion"
      >
        <Box className="modal-box">
          {proyectoSeleccionado && (
            <>
              <Typography id="modal-proyecto" variant="h5" gutterBottom>
                {proyectoSeleccionado.titulo}
              </Typography>
              <Typography id="modal-proyecto-descripcion" gutterBottom>
                {proyectoSeleccionado.descripcion}
              </Typography>

              <Typography><strong>Área:</strong> Ciencias Naturales</Typography>

              <Typography variant="h6" sx={{ mt: 2 }}>Objetivos:</Typography>
              {proyectoSeleccionado.objetivos.map((obj, index) => (
                <ObjetivoItem key={index} objetivo={obj} index={index} />
              ))}

              <Typography sx={{ mt: 2 }}><strong>Cronograma:</strong> 01/05/2025 - 30/06/2025</Typography>
              <Typography><strong>Presupuesto:</strong> $2.000.000</Typography>
              <Typography><strong>Institución:</strong> Universidad de Florencia</Typography>

              <Button variant="outlined" sx={{ mt: 3 }} onClick={() => setProyectoSeleccionado(null)}>
                Cerrar
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Estudiante;