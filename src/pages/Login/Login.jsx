import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';
import supabase from '../../supabase';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Llamar a la función PostgreSQL iniciar_sesion
        const { data, error } = await supabase.rpc('iniciar_sesion', {
            pemail: correo,
            pcontrasena: contraseña
        });

        if (error) {
            console.error('Error al iniciar sesión:', error.message);
            alert('Error al conectar con el servidor. Intenta nuevamente.');
            return;
        }

        if (data && data.length > 0) {
            const rol = data[0].rolusuario;
            const id = data[0].idusuario;

            // Guardar en sessionStorage (o localStorage si prefieres persistencia más larga)
            sessionStorage.setItem('rol', rol);
            sessionStorage.setItem('idUsuario', id);

            // Redireccionar según el rol
            if (rol === 'coordinador') {
                navigate('/VistaCoordinador');
            } else if (rol === 'estudiante') {
                navigate('/VistaEstudiante');
            } else if (rol === 'docente') {
                navigate('/VistaDocente');
            } else {
                alert('Rol no reconocido');
            }
        } else {
            alert('Correo o contraseña incorrectos');
        }
    };

    return (
        <div className="container">
            <div className="login">
                <h2>Iniciar Sesión</h2>
                <form className='datos' onSubmit={handleSubmit}>
                    <div className="correo">
                        <label>Correo electrónico</label>
                        <input 
                            type="email" 
                            placeholder="Ingresa aqui tu correo" 
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="contraseña">
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            placeholder="Ingresa aqui tu contraseña" 
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)} 
                            required
                        />
                    </div>
                    <ul>
                        <a href=''>Olvidé mi contraseña</a>
                    </ul>
                    <button type="submit" className='botonlogin'>Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
