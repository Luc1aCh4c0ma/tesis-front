import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';
import logo from '../../assets/logososneado.png'; // Asegúrate de usar la ruta correcta a tu logo  
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa";


const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
  role: yup.string().required('El rol es obligatorio')  // Nuevo campo para rol
});

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      // Enviar los datos del login y el rol seleccionado
      const response = await axios.post('https://tesis-back-production-8e0c.up.railway.app/auth/login', {
        email: data.email,
        password: data.password
      });

      // Almacenar el token y el rol (podrías enviar el rol desde el servidor)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', data.role); // Guardar el rol seleccionado
      alert('Login exitoso');

      // Redirigir dependiendo del rol
      if (data.role === 'admin') {
        navigate('/dashboard-admin');
      } else if (data.role === 'user') {
        navigate('/dashboard-user');
      }
    } catch (error: any) {
      alert('Error al iniciar sesión: ' + error.response?.data?.message || 'Error desconocido');
    }
  };

  const handleSoyCliente = () => {
    navigate('/clients'); // Redirige a la página de productos
  };

  return (
    <div className="auth-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <div>
          <label htmlFor="email"><MdEmail />
          Email:</label>
          <input type="email" id="email" {...register('email')} required />
          <p className="error-message">{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="password"><RiLockPasswordFill />
          Contraseña:</label>
          <input type="password" id="password" {...register('password')} required />
          <p className="error-message">{errors.password?.message}</p>
        </div>

        <div>
          <label htmlFor="role"><FaUserAstronaut />
          Rol:</label>
          <select id="role" {...register('role')} required>
            <option value="">Selecciona tu rol</option>
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>
          <p className="error-message">{errors.role?.message}</p>
        </div>

        <button type="submit">Ingresar</button>
        <div className="auth-links">
    
          <a href="/register">¿No tienes una cuenta? Regístrate</a>
        </div>
      </form>
      <button className='cliente-button' onClick={handleSoyCliente}>Soy Cliente</button>
    </div>
  );
};

export default LoginPage;
