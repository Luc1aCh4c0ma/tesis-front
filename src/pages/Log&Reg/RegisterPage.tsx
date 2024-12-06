import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import './AuthForm.css';
import logo from '../../assets/logososneado.png';
 // Asegúrate de usar la ruta correcta a tu logo  
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa6";


const schema = yup.object().shape({
    name: yup.string().required('El nombre es obligatorio'),
    email: yup.string().email('Email inválido').required('El email es obligatorio'),
    password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
    acceptedTerms: yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones'),
  });

const RegisterPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    });
  
    const onSubmit = async (data: any) => {
      try {
        await axios.post('http://localhost:3000/auth/register', data);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
      } catch (error: any) {
        alert('Error en el registro: ' + error.response?.data?.message || 'Error desconocido');
      }
    };
    
    return (
        <div className="auth-container">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <h2>Registro</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div>
              <label htmlFor="name"><FaUserSecret />
              Nombre:</label>
              <input type="text" id="name" {...register('name')} required />
              <p className="error-message">{errors.name?.message}</p>
            </div>
      
            <div>
              <label htmlFor="email"><MdEmail /> Email:</label>
              <input type="email" id="email" {...register('email')} required />
              <p className="error-message">{errors.email?.message}</p>
            </div>
      
            <div>
              <label htmlFor="password"><RiLockPasswordFill /> Contraseña:</label>
              <input type="password" id="password" {...register('password')} required />
              <p className="error-message">{errors.password?.message}</p>
            </div>
      
            <div>
              <label>
                <input type="checkbox" {...register('acceptedTerms')} required />
                Acepto los términos y condiciones
              </label>
              <p className="error-message">{errors.acceptedTerms?.message}</p>
            </div>
      
            <button type="submit">Registrarse</button>
            <div className="auth-links">
              <a href="/login">¿Ya tienes una cuenta? Inicia sesión</a>
            </div>
          </form>
        </div>
      );
    }
      

export default RegisterPage;
