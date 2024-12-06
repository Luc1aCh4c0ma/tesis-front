import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";


interface PedidoItem {
  nombre: string;
  cantidad: number;
  precio: number | string; // Puede ser número o cadena de texto
}

interface Pedido {
  id: string;
  estado: string;
  total: number;
  items: PedidoItem[];
}

const DetallePedido: React.FC = () => {
  const { pedidoId } = useParams<{ pedidoId: string }>();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetallePedido = async () => {
      try {
        setError(null);
        const response = await axios.get(`https://tesis-back-production-8e0c.up.railway.app/pedidos/detalle/${pedidoId}`);
        console.log("Datos del pedido:", response.data); // Depuración
        setPedido(response.data);
      } catch (error) {
        console.error("Error al obtener detalles del pedido:", error);
        setError("No se pudo cargar el detalle del pedido. Por favor, inténtelo más tarde.");
      }
    };

    if (pedidoId) {
      fetchDetallePedido();
    }
  }, [pedidoId]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  if (!pedido) {
    return <Typography>Cargando...</Typography>;
  }

  // Calcular el total de la orden con validación
  const calcularTotal = () => {
    if (Array.isArray(pedido.items)) {
      return pedido.items
        .reduce((acc, item) => {
          const precioNumerico = parseFloat(item.precio as unknown as string) || 0;
          return acc + precioNumerico * item.cantidad;
        }, 0)
        .toFixed(2);
    } else {
      return "0.00"; // En caso de que items no sea un array
    }
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Detalle del Pedido
      </Typography>
      <Typography>ID: {pedido.id}</Typography>
      <Typography>Estado: {pedido.estado}</Typography>
      <Typography>Total: ${calcularTotal()}</Typography>
      <Typography variant="h6" gutterBottom>
        Items:
      </Typography>
      {pedido.items && pedido.items.length > 0 ? (
        <ul>
          {pedido.items.map((item, index) => {
            // Validar que el precio sea un número
            const precioNumerico = parseFloat(item.precio as unknown as string) || 0;
            return (
              <li key={index}>
                {item.nombre} x {item.cantidad} - ${precioNumerico.toFixed(2)}
              </li>
            );
          })}
        </ul>
      ) : (
        <Typography>No hay items en este pedido.</Typography>
      )}
      <Box marginTop={2}>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </Box>
    </Box>
  );
};

export default DetallePedido;
