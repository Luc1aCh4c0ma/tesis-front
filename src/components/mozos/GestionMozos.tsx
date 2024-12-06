import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import axios from 'axios';
import Navbar from '../NavBar/NavBar';
import './GestionMozos.css';

interface Mozo {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

const GestionMozos: React.FC = () => {
  const [mozos, setMozos] = useState<Mozo[]>([]);
  const [nuevoMozo, setNuevoMozo] = useState<Partial<Mozo>>({
    nombre: '',
    descripcion: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [mozoEditable, setMozoEditable] = useState<Mozo | null>(null);

  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchMozos();
  }, []);

  const fetchMozos = async () => {
    try {
      const response = await axios.get('https://tesis-back-production-8e0c.up.railway.app/mozos');
      setMozos(response.data);
    } catch (error) {
      console.error('Error al obtener mozos:', error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    if (mozoEditable) {
      setMozoEditable((prev) => ({ ...prev!, [field]: e.target.value }));
    } else {
      setNuevoMozo((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const addMozo = async () => {
    if (!file) {
      alert('Por favor, selecciona una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nuevoMozo.nombre || '');
    formData.append('descripcion', nuevoMozo.descripcion || '');
    formData.append('imagen', file);

    try {
      const response = await axios.post('https://tesis-back-production-8e0c.up.railway.app/mozos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMozos((prev) => [...prev, response.data]);
      setNuevoMozo({ nombre: '', descripcion: '' });
      setFile(null);
    } catch (error) {
      console.error('Error al agregar mozo:', error);
    }
  };

  const deleteMozo = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este mozo?')) {
      try {
        await axios.delete(`https://tesis-back-production-8e0c.up.railway.app/mozos/${id}`);
        setMozos((prev) => prev.filter((mozo) => mozo.id !== id));
      } catch (error) {
        console.error('Error al eliminar mozo:', error);
      }
    }
  };

  const handleEditClick = (mozo: Mozo) => {
    setMozoEditable(mozo);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUpdateMozo = async () => {
    if (!mozoEditable) return;

    const formData = new FormData();
    formData.append('nombre', mozoEditable.nombre);
    formData.append('descripcion', mozoEditable.descripcion);
    if (file) formData.append('imagen', file);

    try {
      const response = await axios.patch(
        `https://tesis-back-production-8e0c.up.railway.app/mozos/${mozoEditable.id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setMozos((prev) =>
        prev.map((mozo) =>
          mozo.id === mozoEditable.id ? response.data : mozo
        )
      );
      setMozoEditable(null);
      setFile(null);
    } catch (error) {
      console.error('Error al actualizar mozo:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Box className="gestion-mozos-container">
        <Typography variant="h4" className="gestion-mozos-header">
          Gestión de Mozos
        </Typography>

        <Box mt={4}>
          {mozos.map((mozo) => (
            <Card key={mozo.id} className="mozo-card">
              <CardContent>
                <Typography variant="h6">{mozo.nombre}</Typography>
                <Typography>{mozo.descripcion}</Typography>
                <img
                  src={`https://tesis-back-production-8e0c.up.railway.app${mozo.imagen}`}
                  alt={mozo.nombre}
                />

                <Box className="mozo-actions">
                  <Button
                    variant="outlined"
                    onClick={() => handleEditClick(mozo)}
                    color="primary"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => deleteMozo(mozo.id)}
                    color="error"
                  >
                    Eliminar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box mt={4} ref={formRef} className="mozo-form-container">
          <Typography variant="h5" className="mozo-form-title">
            {mozoEditable ? 'Editar Mozo' : 'Agregar Nuevo Mozo'}
          </Typography>
          <TextField
            label="Nombre"
            value={mozoEditable?.nombre || nuevoMozo.nombre}
            onChange={(e) => handleInputChange(e, 'nombre')}
            fullWidth
            className="mozo-form-field"
          />
          <TextField
            label="Descripción"
            value={mozoEditable?.descripcion || nuevoMozo.descripcion}
            onChange={(e) => handleInputChange(e, 'descripcion')}
            fullWidth
            multiline
            rows={3}
            className="mozo-form-field"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="mozo-form-field"
          />
          <Button
            variant="contained"
            onClick={mozoEditable ? handleUpdateMozo : addMozo}
            className="mozo-form-button"
          >
            {mozoEditable ? 'Guardar Cambios' : 'Agregar'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default GestionMozos;
