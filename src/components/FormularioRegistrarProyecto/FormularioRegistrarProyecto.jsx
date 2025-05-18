import React, { useState, useEffect } from 'react';
import InputFormulario from '../InputFormulario/InputFormulario';
import BotonVerde from '../BotonVerde/BotonVerde';
import BotonRojo from '../BotonRojo/BotonRojo';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ComboBox from '../../components/ComboBox/ComboBox';
import './FormularioRegistrarProyecto.css';
import supabase from '../../supabase';

const FormularioRegistrarProyecto = ({ onClose }) => {
  const [tituloProyecto, setTituloProyecto] = useState('');
  const [areaProyecto, setAreaProyecto] = useState('');
  const [cronogramaProyecto, setCronogramaProyecto] = useState('');
  const [presupuestoProyecto, setPresupuestoProyecto] = useState('');
  const [institucionProyecto, setInstitucionProyecto] = useState('');
  const [observacionesAdicionalesProyecto, setObservacionesAdicionalesProyecto] = useState('');

  const [integrantesExtras, setIntegrantesExtras] = useState([]);
  const [objetivosExtras, setObjetivosExtras] = useState([]);

  const [instituciones, setInstituciones] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);

  const idDocente = parseInt(sessionStorage.getItem('idUsuario'));

  useEffect(() => {
    const fetchInstituciones = async () => {
      const { data, error } = await supabase.rpc('listar_institucion');
      if (error) {
        console.error('Error cargando instituciones:', error);
      } else {
        setInstituciones(data.map((item) => ({ label: item.nombre, value: item.nombre })));
      }
    };
    fetchInstituciones();
  }, []);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      const { data, error } = await supabase.rpc('listar_estudiante');
      if (error) {
        console.error('Error cargando estudiantes:', error);
      } else {
        const estudiantesFormateados = data.map((est) => ({
          label: `${est.identificacion} - ${est.estudiante_completo}`,
          value: est.identificacion
        }));
        setEstudiantes(estudiantesFormateados);
      }
    };
    fetchEstudiantes();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Validar solo números reales en presupuesto
    if (name === 'presupuestoProyecto') {
      if (/^\d*\.?\d*$/.test(value)) {
        setPresupuestoProyecto(value);
      }
      return;
    }

    switch (name) {
      case 'tituloProyecto': setTituloProyecto(value); break;
      case 'areaProyecto': setAreaProyecto(value); break;
      case 'cronogramaProyecto': setCronogramaProyecto(value); break;
      case 'institucionProyecto': setInstitucionProyecto(value); break;
      case 'observacionesAdicionalesProyecto': setObservacionesAdicionalesProyecto(value); break;
      default: break;
    }
  };

  const agregarIntegranteExtra = () => {
    setIntegrantesExtras([...integrantesExtras, { id: Date.now(), identificacion: '' }]);
  };

  const eliminarIntegranteExtra = (id) => {
    setIntegrantesExtras((prev) => prev.filter((campo) => campo.id !== id));
  };

  const handleChangeIntegrante = (id, newValue) => {
    setIntegrantesExtras((prev) =>
      prev.map((campo) => (campo.id === id ? { ...campo, identificacion: newValue?.value || '' } : campo))
    );
  };

  const agregarObjetivoExtra = () => {
    setObjetivosExtras([...objetivosExtras, { id: Date.now(), texto: '' }]);
  };

  const eliminarObjetivoExtra = (id) => {
    setObjetivosExtras((prev) => prev.filter((obj) => obj.id !== id));
  };

  const handleChangeObjetivo = (id, e) => {
    const { value } = e.target;
    setObjetivosExtras((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, texto: value } : obj))
    );
  };

  const handleRegistrarProyecto = async () => {
    try {
      const objetivos = objetivosExtras.map((obj) => obj.texto).filter((txt) => txt.trim() !== '');
      const estudiantesSeleccionados = integrantesExtras.map((i) => i.identificacion);

      const { error } = await supabase.rpc('registrar_proyecto', {
        ptitulo: tituloProyecto,
        parea: areaProyecto,
        pcronograma: cronogramaProyecto,
        ppresupuesto: parseFloat(presupuestoProyecto),
        pinstitucion: institucionProyecto,
        piddocente: idDocente,
        pobservacion: observacionesAdicionalesProyecto,
        pobjetivos: objetivos,
        pestudiante: estudiantesSeleccionados,
      });

      if (error) {
        console.error('Error registrando proyecto:', error);
        alert('Error al registrar el proyecto.');
      } else {
        alert('Proyecto registrado exitosamente.');
        onClose();
      }
    } catch (err) {
      console.error('Excepción al registrar proyecto:', err);
      alert('Ocurrió un error inesperado.');
    }
  };

  return (
    <div id="contenedor-formulario">
      <form>
        <div id="contenedor-superior">
          <InputFormulario name="tituloProyecto" value={tituloProyecto} onChange={handleChange} placeholder="Título Proyecto" />
          <InputFormulario name="areaProyecto" value={areaProyecto} onChange={handleChange} placeholder="Área Proyecto" />
          <InputFormulario name="cronogramaProyecto" value={cronogramaProyecto} onChange={handleChange} placeholder="Cronograma Proyecto" />
          <InputFormulario name="presupuestoProyecto" value={presupuestoProyecto} onChange={handleChange} placeholder="Presupuesto Proyecto" type="text" />

          <ComboBox label="Seleccionar institución" options={instituciones} value={institucionProyecto} onChange={(newValue) => setInstitucionProyecto(newValue?.value || '')} />

          <textarea name="observacionesAdicionalesProyecto" value={observacionesAdicionalesProyecto} onChange={handleChange} placeholder="Observaciones Adicionales Proyecto" rows={5} className="textarea-objetivos" />
        </div>

        <div id="campos-extras">
          {integrantesExtras.map((campo) => (
            <div key={campo.id} className="campo-extra-contenedor">
              <ComboBox label="Seleccionar estudiante" options={estudiantes} value={campo.identificacion} onChange={(newValue) => handleChangeIntegrante(campo.id, newValue)} />
              <button type="button" className="boton-eliminar-campo" onClick={() => eliminarIntegranteExtra(campo.id)}>Eliminar</button>
            </div>
          ))}
          <button type="button" onClick={agregarIntegranteExtra} className="boton-agregar-campo">Agregar Integrantes</button>
        </div>

        <div id="objetivos-extras">
          {objetivosExtras.map((obj) => (
            <div key={obj.id} className="campo-extra-contenedor">
              <InputFormulario className="textarea-objetivos" value={obj.texto} onChange={(e) => handleChangeObjetivo(obj.id, e)} placeholder="Escribe un objetivo" rows={3} />
              <button type="button" className="boton-eliminar-campo" onClick={() => eliminarObjetivoExtra(obj.id)}>Eliminar</button>
            </div>
          ))}
          <button type="button" onClick={agregarObjetivoExtra} className="boton-agregar-campo">Agregar Objetivo</button>
        </div>

        <div id="contenedor-boton">
          <BotonVerde onClick={handleRegistrarProyecto} label="ACEPTAR" icono={<CheckIcon />} />
          <BotonRojo onClick={onClose} label="CANCELAR" icono={<ClearIcon />} />
        </div>
      </form>
    </div>
  );
};

export default FormularioRegistrarProyecto;
