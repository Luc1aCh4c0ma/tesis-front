import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import axios from "axios";
import Navbar from "../../components/NavBar/NavBar";
import "../pedidos/HistorialPedidos.css"; // Asegúrate de importar los estilos

const PedidosPendientes: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedidosPendientes = async () => {
      try {
        const response = await axios.get("https://tesis-back-production-8e0c.up.railway.app/pedidos/pendiente");
        setPedidos(response.data);
      } catch (error) {
        console.error("Error al obtener pedidos pendientes:", error);
      }
    };

    fetchPedidosPendientes();
  }, []);

  const verDetalle = (pedidoId: number) => {
    navigate(`/pedidos/${pedidoId}`);
  };

  const marcarComoEntregado = async (pedidoId: number) => {
    try {
      await axios.put(`https://tesis-back-production-8e0c.up.railway.app/pedidos/${pedidoId}/entregado`);
      setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido.id !== pedidoId));
    } catch (error) {
      console.error("Error al marcar pedido como entregado:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Box className="container">
        <Typography variant="h4" className="pedidos-pendientes-title">
          Pedidos Pendientes
        </Typography>
        {pedidos.length === 0 ? (
          <Typography className="empty-state">
            No hay pedidos pendientes en este momento. 🛍️
          </Typography>
        ) : (
          pedidos.map((pedido) => (
            <Card key={pedido.id} className="card">
              <CardContent className="card-content">
                <Typography variant="h6">Pedido ID: {pedido.id}</Typography>
                <Typography>Total: ${(Number(pedido.total) || 0).toFixed(2)}</Typography>
                <Typography>Estado: {pedido.estado}</Typography>
                <Box className="mt-2">
                  <Button
                    variant="outlined"
                    onClick={() => verDetalle(pedido.id)}
                  >
                    Ver Detalles
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => marcarComoEntregado(pedido.id)}
                  >
                    Marcar como Entregado
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </>
  );
};

export default PedidosPendientes;
