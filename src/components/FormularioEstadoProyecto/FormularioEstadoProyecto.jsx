import React, { useState } from 'react';
import BotonVerde from '../BotonVerde/BotonVerde';
import BotonRojo from '../BotonRojo/BotonRojo';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import supabase from '../../supabase';
import './FormularioEstadoProyecto.css';
import ComboBox from '../ComboBox/ComboBox';

const FormularioEstadoProyecto = ({ onClose, nombreUsuario, onSuccess }) => {
  // Estado para el campo "estado"
  const [estado, setEstado] = useState('');
  const [observacionEstado, setObservacionEstado] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const idusuario = parseInt(sessionStorage.getItem('idUsuario'));

  // No usar "rolUsuario", usar "estado" que es el campo que quieres guardar
  // El ComboBox debe cambiar "estado"
  // handleChange sólo para textarea (observacion)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (!estado) {
      setErrorMsg('El campo estado es obligatorio');
      setLoading(false);
      return;
    }

    try {
      // Usar nombreUsuario como id del proyecto (prid)
      const { error } = await supabase.rpc('estado', {
        prid: nombreUsuario,
        coid: idusuario,
        pestado_text: estado,
        pobservacion: observacionEstado || null,
      });

      if (error) {
        setErrorMsg('Error al guardar el estado: ' + error.message);
      } else {
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      setErrorMsg('Error inesperado: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <div id='contenedor-formulario-estado-proyecto'>
      <form onSubmit={handleSubmit}>
        <ComboBox
          label="Seleccionar estado"
          options={['Formulación', 'Evaluación', 'Activo', 'Inactivo', 'Finalizado']}
          value={estado}
          onChange={(newValue) => setEstado(newValue)}
          placeholder="Selecciona un estado"
        />
        <textarea
          name="observacionEstado"
          value={observacionEstado}
          onChange={(e) => setObservacionEstado(e.target.value)}
          placeholder="Observaciones Estado"
          rows={5}
          className="textarea-objetivos"
        />

        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

        <div className="botones-formulario">
          <BotonVerde label={loading ? "Guardando..." : "ACEPTAR"} icono={<CheckIcon />} type="submit" disabled={loading} />
          <BotonRojo onClick={onClose} label="CANCELAR" icono={<ClearIcon />} disabled={loading} />
        </div>
      </form>
    </div>
  );
};

export default FormularioEstadoProyecto;
