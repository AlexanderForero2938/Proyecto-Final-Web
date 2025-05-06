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
        sx={{ 
            backgroundColor: 'transparent'
        }}
        >
            <Table sx={{ minWidth: 650 }} aria-label="tabla dinámica">
                <TableHead >
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align="center" 
                                sx={{
                                    color: 'black',
                                    textAlign: 'center', 
                                    fontWeight: 'bold'  
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
                                        textAlign: 'center', 
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
