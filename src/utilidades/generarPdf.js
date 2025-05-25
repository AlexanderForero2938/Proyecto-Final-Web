// generarPdf.js
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Asigna correctamente el VFS (font files)
pdfMake.vfs = (pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) || pdfFonts.vfs;

/**
 * Genera y descarga un PDF con la información de un proyecto.
 * @param {Object} proyecto
 * @param {Array} estudiantes
 * @param {Array} objetivos
 * @param {string} estado
 * @param {Array} historialEstados
 */
export function generateProjectPDF({ proyecto, estudiantes, objetivos, estado, historialEstados }) {
  if (!proyecto) return;

  const docDefinition = {
    content: [
      { text: proyecto.titulo, style: 'header' },
      { text: `ID: ${proyecto.id}`, margin: [0, 5] },
      { text: `Área: ${proyecto.area}`, margin: [0, 2] },
      { text: `Presupuesto: ${proyecto.presupuesto}`, margin: [0, 2] },
      { text: `Institución: ${proyecto.institucion}`, margin: [0, 2] },
      { text: `Docente: ${proyecto.docente}`, margin: [0, 2] },
      { text: `Observaciones: ${proyecto.observacion}`, margin: [0, 2] },
      { text: `Estado Actual: ${estado}`, margin: [0, 10] },

      { text: 'Integrantes', style: 'subheader', margin: [0, 10, 0, 4] },
      {
        table: {
          widths: ['*'],
          body: [
            ['Nombre del Estudiante'],
            ...estudiantes.map(e => [e.nombre])
          ]
        }
      },

      { text: 'Objetivos', style: 'subheader', margin: [0, 10, 0, 4] },
      ...objetivos.map((o, i) => ({ text: `${i + 1}. ${o.nombre}`, margin: [0, 2] })),

      { text: 'Histórico de Estados', style: 'subheader', margin: [0, 10, 0, 4] },
      {
        table: {
          widths: ['*', '*', '*'],
          body: [
            ['Estado', 'Observación', 'Fecha'],
            ...historialEstados.map(h => [
              h.estado,
              h.observacion || '',
              new Date(h.fecha_cambio).toLocaleString()
            ])
          ]
        }
      }
    ],
    styles: {
      header: { fontSize: 18, bold: true, alignment: 'center' },
      subheader: { fontSize: 14, bold: true }
    },
    defaultStyle: { fontSize: 11 }
  };

  pdfMake.createPdf(docDefinition).download(`${proyecto.titulo}.pdf`);
}
