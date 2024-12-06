import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
});

const ResetPasswordPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = async (data: { newPassword: string }) => {
    try {
      await axios.post('http://localhost:3000/auth/reset', {
        token,
        newPassword: data.newPassword,
      });
      alert('Contraseña actualizada exitosamente.');
    } catch (error: any) {
      alert('Error al restablecer la contraseña: ' + (error.response?.data?.message || 'Error desconocido'));
    }
  };

  if (!token) {
    return <p>El enlace de recuperación es inválido o ha expirado.</p>;
  }

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nueva Contraseña:</label>
          <input type="password" {...register('newPassword')} />
          <p>{errors.newPassword?.message}</p>
        </div>
        <button type="submit">Restablecer</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
