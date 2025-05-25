import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuEstudiante from '../../components/MenuEstudiante/MenuEstudiante';
import Tabla from '../../components/Tabla/Tabla';
import supabase from '../../supabase';
import BotonVerMas from '../../components/BotonVerMas/BotonVerMas';
import InputFiltro from '../../components/InputFiltro/InputFiltro';
import './VistaGestionarProyectoEstudiante.css';

const VistaGestionarProyectoEstudiante = () => {
    const [proyectos, setProyectos] = useState([]);
    const [filtro, setFiltro] = useState('');
    const navigate = useNavigate();

    const idEstudiante = parseInt(sessionStorage.getItem('idUsuario'));

    const columns = [
        { id: 'idpro', label: 'N°' },
        { id: 'titulo', label: 'TÍTULO' },
        { id: 'area', label: 'ÁREA' },
        { id: 'institucion', label: 'INSTITUCIÓN' },
        { id: 'docente', label: 'DOCENTE' },
        { id: 'mas', label: 'VER MÁS' },
    ];

    useEffect(() => {
        const fetchProyectos = async () => {
            const { data, error } = await supabase.rpc('proyecto_estudiante', {
                pid: idEstudiante,
            });

            if (error) {
                console.error('Error obteniendo proyectos:', error.message);
            } else {
                setProyectos(data);
            }
        };

        if (idEstudiante) {
            fetchProyectos();
        }
    }, [idEstudiante]);

    const handleChange = (event) => {
        setFiltro(event.target.value.toLowerCase());
    };

    const filteredProyectos = proyectos.filter((proyecto) =>
        proyecto.titulo.toLowerCase().includes(filtro) ||
        proyecto.area.toLowerCase().includes(filtro) ||
        proyecto.institucion.toLowerCase().includes(filtro) ||
        proyecto.docente.toLowerCase().includes(filtro)
    );

    const rows = filteredProyectos.map((item) => ({
        ...item,
        mas: <BotonVerMas ruta={`/VistaProyectoSeleccionadoEstudiante/${item.idpro}`} />,
    }));

    return (
        <div id="gestionar-proyecto-estudiante">
            <MenuEstudiante />
            <div id='contenedor-filtro-estudiante'>
                <InputFiltro
                    onChange={handleChange}
                    placeholder="Buscar proyecto..."
                    value={filtro}
                />
            </div>
            <div id="contenedor-tabla-proyecto-estudiante">
                <Tabla columns={columns} rows={rows} />
            </div>
        </div>
    );
};

export default VistaGestionarProyectoEstudiante;
