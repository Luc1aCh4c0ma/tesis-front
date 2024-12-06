import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
});

const RecoverPasswordPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      await axios.post('http://localhost:3000/auth/recover', data);
      alert('Si el correo está registrado, recibirás un enlace para recuperar tu contraseña.');
    } catch (error: any) {
      alert('Error al enviar el correo: ' + (error.response?.data?.message || 'Error desconocido'));
    }
  };

  return (
    <div>
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input {...register('email')} />
          <p>{errors.email?.message}</p>
        </div>
        <button type="submit">Enviar enlace</button>
      </form>
    </div>
  );
};

export default RecoverPasswordPage;
