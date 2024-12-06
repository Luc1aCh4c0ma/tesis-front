import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ClienteFormStyles.css';

const API_URL_CLIENTES = 'https://tesis-back-production-8e0c.up.railway.app/clientes';
const API_URL_MESAS = 'https://tesis-back-production-8e0c.up.railway.app/mesas';

interface Cliente {
  nombre: string;
  apellido: string;
  telefono: string;
  metodoPago: string;
  mesaId: number;
}

interface Mesa {
  id: number;
  numero: string;
  estado: string;
}

interface ClienteFormProps {
  onMetodoPagoSeleccionado: (metodoPago: string) => void; // Nuevo prop para pasar el método de pago
}

const ClienteForm: React.FC<ClienteFormProps> = ({ onMetodoPagoSeleccionado }) => {
  const [cliente, setCliente] = useState<Cliente>({
    nombre: '',
    apellido: '',
    telefono: '',
    metodoPago: '',
    mesaId: 0,
  });
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const response = await axios.get(API_URL_MESAS);
        setMesas(response.data);
      } catch (error) {
        console.error('Error al obtener las mesas:', error);
        setError('No se pudieron cargar las mesas.');
      }
    };

    fetchMesas();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
    if (e.target.name === 'metodoPago') {
      onMetodoPagoSeleccionado(e.target.value);
    }
  };

  const handleRedirect = () => {
    navigate('/menu');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(API_URL_CLIENTES, cliente);
      alert('Cliente registrado con éxito');
      handleRedirect();
      setCliente({
        nombre: '',
        apellido: '',
        telefono: '',
        metodoPago: '',
        mesaId: 0,
      });
    } catch (error) {
      setError('Error al registrar el cliente. Intenta nuevamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div><h1>BIENVENIDO A SOSNEADO</h1>
    <form className="cliente-form" onSubmit={handleSubmit}>
      <h2>Ingrese sus datos para realizar el pedido</h2>
      {error && <p>{error}</p>}

      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        name="nombre"
        value={cliente.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />

      <label htmlFor="apellido">Apellido</label>
      <input
        type="text"
        name="apellido"
        value={cliente.apellido}
        onChange={handleChange}
        placeholder="Apellido"
        required
      />

      <label htmlFor="telefono">Número de Teléfono</label>
      <input
        type="text"
        name="telefono"
        value={cliente.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        required
      />

      <label htmlFor="metodoPago">¿Cómo desea pagar?</label>
      <select
        name="metodoPago"
        value={cliente.metodoPago}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione un método de pago</option>
        <option value="efectivo">Efectivo</option>
        <option value="transferencia">Transferencia</option>
        <option value="tarjetaCredito">Tarjeta de Crédito</option>
        <option value="tarjetaDebito">Tarjeta de Débito</option>
      </select>

      <label htmlFor="mesaId">Seleccione la mesa en la que se encuentra</label>
      <select
        name="mesaId"
        value={cliente.mesaId}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione una mesa</option>
        {mesas.map((mesa) => (
          <option key={mesa.id} value={mesa.id}>
            Mesa {mesa.numero} - {mesa.estado}
          </option>
        ))}
      </select>

      <button type="submit" disabled={loading}>
        {loading ? 'Cargando...' : 'Empezar Pedido'}
      </button>
    </form>
    </div>
  );
};

export default ClienteForm;
