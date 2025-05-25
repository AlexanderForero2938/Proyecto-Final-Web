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

  // Validaciones
  const hayIntegrantes = integrantesExtras.length > 0;
  const hayIntegranteSinSeleccionar = integrantesExtras.some(
    (integrante) => !integrante.identificacion || integrante.identificacion.trim() === ''
  );

  const hayObjetivos = objetivosExtras.length > 0;
  const hayObjetivoVacio = objetivosExtras.some(
    (objetivo) => !objetivo.texto || objetivo.texto.trim() === ''
  );

  const formInvalido =
    tituloProyecto.trim() === '' ||
    areaProyecto.trim() === '' ||
    cronogramaProyecto.trim() === '' ||
    presupuestoProyecto.trim() === '' ||
    institucionProyecto.trim() === '' ||
    !hayIntegrantes ||
    hayIntegranteSinSeleccionar ||
    !hayObjetivos ||
    hayObjetivoVacio;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!hayIntegrantes) {
      alert('Por favor, agrega al menos un integrante.');
      return;
    }

    if (hayIntegranteSinSeleccionar) {
      alert('Por favor, selecciona todos los estudiantes en los integrantes extras.');
      return;
    }

    if (!hayObjetivos) {
      alert('Por favor, agrega al menos un objetivo.');
      return;
    }

    if (hayObjetivoVacio) {
      alert('Por favor, completa todos los objetivos.');
      return;
    }

    handleRegistrarProyecto();
  };

  return (
    <div id="contenedor-formulario">
      <form onSubmit={handleSubmit}>
        <div id="contenedor-superior">
          <InputFormulario
            name="tituloProyecto"
            value={tituloProyecto}
            onChange={handleChange}
            placeholder="Título Proyecto"
            required={true}
          />
          <InputFormulario
            name="areaProyecto"
            value={areaProyecto}
            onChange={handleChange}
            placeholder="Área Proyecto"
            required={true}
          />
          <InputFormulario
            name="cronogramaProyecto"
            value={cronogramaProyecto}
            onChange={handleChange}
            placeholder="Cronograma Proyecto"
            required={true}
          />
          <InputFormulario
            name="presupuestoProyecto"
            value={presupuestoProyecto}
            onChange={handleChange}
            placeholder="Presupuesto Proyecto"
            type="text"
            required={true}
          />

          <ComboBox
            label="Seleccionar institución"
            options={instituciones}
            value={institucionProyecto}
            onChange={(newValue) => setInstitucionProyecto(newValue?.value || '')}
          />

          <textarea
            name="observacionesAdicionalesProyecto"
            value={observacionesAdicionalesProyecto}
            onChange={handleChange}
            placeholder="Observaciones Adicionales Proyecto"
            rows={5}
            className="textarea-objetivos"
            required
          />
        </div>

        <div className="campos-extras">
          {integrantesExtras.map((campo) => (
            <div key={campo.id} className="campo-extra-contenedor">
              <ComboBox
                label="Seleccionar estudiante"
                options={estudiantes}
                value={campo.identificacion}
                onChange={(newValue) => handleChangeIntegrante(campo.id, newValue)}
              />
              <button
                type="button"
                className="boton-eliminar-campo"
                onClick={() => eliminarIntegranteExtra(campo.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" onClick={agregarIntegranteExtra} className="boton-agregar-campo">
            Agregar Integrantes
          </button>
        </div>

        <div className="campos-extras">
          {objetivosExtras.map((obj) => (
            <div key={obj.id} className="campo-extra-contenedor">
              <InputFormulario
                className="textarea-objetivos"
                value={obj.texto}
                onChange={(e) => handleChangeObjetivo(obj.id, e)}
                placeholder="Escribe un objetivo"
                rows={3}
              />
              <button
                type="button"
                className="boton-eliminar-campo"
                onClick={() => eliminarObjetivoExtra(obj.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" onClick={agregarObjetivoExtra} className="boton-agregar-campo">
            Agregar Objetivo
          </button>
        </div>

        <div id="contenedor-boton-formulario-proyecto">
          <BotonVerde
            label="ACEPTAR"
            icono={<CheckIcon />}
            type="submit"
            disabled={formInvalido}
          />
          <BotonRojo
            label="CANCELAR"
            icono={<ClearIcon />}
            onClick={onClose}
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioRegistrarProyecto;
