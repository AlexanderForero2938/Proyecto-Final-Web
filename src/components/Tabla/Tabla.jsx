import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Tabla = ({ columns, rows }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: 'transparent',
        maxWidth: '95%',
        boxShadow: 'none'
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="tabla dinámica">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align="center"
                sx={{
                  color: 'black',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  padding: '4px 8px', // Reducido solo en el título
                  fontSize: '0.75rem', // Texto más pequeño solo en el encabezado
                  whiteSpace: 'nowrap'
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.id || index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  sx={{
                    textAlign: 'center'
                    // Aquí no se modifican padding ni fontSize
                  }}
                >
                  {row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tabla;
