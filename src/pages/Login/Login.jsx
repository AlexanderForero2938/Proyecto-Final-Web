// Importa React y useState para manejar estados locales
import React, { useState } from 'react';
// Importa useNavigate para redireccionar después del login
import { useNavigate } from 'react-router-dom'; 
// Importa los estilos del componente Login
import './Login.css';
// Importa la instancia de Supabase configurada
import supabase from '../../supabase';

const Login = () => {
    // Estados para guardar el correo y la contraseña ingresados
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigate = useNavigate(); // Hook para redirección

    // Función que se ejecuta cuando se envía el formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el recargado automático del formulario

        // Llama la función RPC "iniciar_sesion" en Supabase
        const { data, error } = await supabase.rpc('iniciar_sesion', {
            pemail: correo,           // Parámetro de entrada: correo electrónico
            pcontrasena: contraseña   // Parámetro de entrada: contraseña
        });

        // Manejamos errores si ocurren durante la llamada
        if (error) {
            console.error('Error al iniciar sesión:', error.message);
            alert('Error al conectar con el servidor. Intenta nuevamente.');
            return;
        }

        // Si hay datos y al menos un resultado...
        if (data && data.length > 0) {
            const rol = data[0].rolusuario;  // Extrae el rol del usuario
            const id = data[0].idusuario;    // Extrae el ID del usuario

            // Guarda rol e ID en sessionStorage para usarlos después
            sessionStorage.setItem('rol', rol);
            sessionStorage.setItem('idUsuario', id);

            // Redirecciona a la vista correspondiente según el rol
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
            // Si no se encuentra el usuario o las credenciales son incorrectas
            alert('Correo o contraseña incorrectos');
        }
    };

    // JSX que renderiza el formulario de login
    return (
        <div className="container">
            <div className="login">
                <h2 id='iniciar-sesion'>Iniciar Sesión</h2>
                <form className='datos' onSubmit={handleSubmit}>
                    {/* Campo para el correo electrónico */}
                    <div className="correo">
                        <label>Correo electrónico</label>
                        <input 
                            className='informacion' 
                            type="email" 
                            placeholder="Ingresa aqui tu correo" 
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)} 
                            required
                        />
                    </div>
                    {/* Campo para la contraseña */}
                    <div className="contraseña">
                        <label>Contraseña</label>
                        <input 
                            className='informacion'
                            type="password" 
                            placeholder="Ingresa aqui tu contraseña" 
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)} 
                            required
                        />
                    </div>
                    {/* Botón de envío */}
                    <button type="submit" className='botonlogin'>Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

// Exporta el componente para ser usado en otras partes del proyecto
export default Login;
