import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import supabase from '../../supabase';

export default function AccordionObjetivos({ objetivos }) {
  const [expanded, setExpanded] = useState(false);
  const [hitosPorObjetivo, setHitosPorObjetivo] = useState({}); // { objetivoNombre: [hitos] }
  const [loadingHitos, setLoadingHitos] = useState(false);

  // URL base del bucket público en Supabase
  const SupabaseUrl = "https://rbpjrfdsspebeqetpdkh.supabase.co/storage/v1/object/public/avances/";

  const handleChange = (panel, objetivoNombre) => async (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);

    if (isExpanded && !hitosPorObjetivo[objetivoNombre]) {
      setLoadingHitos(true);

      try {
        const { data, error } = await supabase.rpc('hitos_objetivo', { pnombre: objetivoNombre });

        if (error) {
          console.error('Error al obtener hitos:', error.message);
          setHitosPorObjetivo((prev) => ({ ...prev, [objetivoNombre]: [] }));
        } else {
          setHitosPorObjetivo((prev) => ({ ...prev, [objetivoNombre]: data || [] }));
        }
      } catch (err) {
        console.error('Error inesperado:', err);
        setHitosPorObjetivo((prev) => ({ ...prev, [objetivoNombre]: [] }));
      } finally {
        setLoadingHitos(false);
      }
    }
  };

  return (
    <div>
      {objetivos.map((objetivo, index) => {
        const panelId = `panel-${index}`;
        const hitos = hitosPorObjetivo[objetivo.nombre] || [];

        return (
          <Accordion
            key={index}
            expanded={expanded === panelId}
            onChange={handleChange(panelId, objetivo.nombre)}
          >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls={`${panelId}-content`}
              id={`${panelId}-header`}
            >
              <Typography component="span">{objetivo.nombre}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {loadingHitos && expanded === panelId ? (
                <Typography>Cargando hitos...</Typography>
              ) : hitos.length === 0 ? (
                <Typography>Sin hitos</Typography>
              ) : (
                <ul>
                  {hitos.map((hito, i) => {
                    const archivoUrl = `${SupabaseUrl}${hito.archivo}`;

                    return (
                      <li key={i} style={{ marginBottom: '12px', listStyle: 'none' }}>
                        {/* Contenedor para nombre y fecha */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                            Observación:
                          </Typography>
                          <Typography variant="body1">{hito.nombrehito || 'Sin nombre'}</Typography>
                          <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                            Fecha:
                          </Typography>
                          <Typography variant="body2">{hito.fecha || 'Sin fecha'}</Typography>
                        </div>
                        {/* Contenedor para archivo o imagen */}
                        <div style={{ marginTop: '4px' }}>
                          {hito.archivo && (
                            hito.archivo.endsWith('.png') || hito.archivo.endsWith('.jpg') ? (
                              <img
                                src={archivoUrl}
                                alt="Hito"
                                style={{ maxWidth: '100px', marginTop: '4px', borderRadius: '4px' }}
                              />
                            ) : (
                              <a href={archivoUrl} target="_blank" rel="noopener noreferrer">
                                Ver archivo
                              </a>
                            )
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
