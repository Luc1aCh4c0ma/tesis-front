import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, TextField } from "@mui/material";
import { AiOutlineDownload, AiOutlineMail } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import axios from "axios";
import './HistorialPedidos.css';
import Navbar from "../../components/NavBar/NavBar";

const PedidosHistorial: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [filteredPedidos, setFilteredPedidos] = useState<any[]>([]);
  const [fechaFiltro, setFechaFiltro] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistorialPedidos = async () => {
      try {
        const response = await axios.get("https://tesis-back-production-8e0c.up.railway.app/pedidos");
        setPedidos(response.data);
        setFilteredPedidos(response.data); // Inicialmente, muestra todos los pedidos
      } catch (error) {
        console.error("Error al obtener historial de pedidos:", error);
      }
    };

    fetchHistorialPedidos();
  }, []);

  const verDetalle = (pedidoId: number) => {
    navigate(`/pedidos/${pedidoId}`);
  };

  const descargarTicket = (pedidoId: number) => {
    window.open(`https://tesis-back-production-8e0c.up.railway.app/tickets/${pedidoId}`, '_blank');
  };

  const enviarWhatsApp = (pedidoId: number) => {
    const url = `https://tesis-back-production-8e0c.up.railway.app/tickets/${pedidoId}`;
    const message = `Hola, aquí tienes tu ticket del Pedido ID: ${pedidoId} - ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const enviarEmail = (pedidoId: number) => {
    const url = `https://tesis-back-production-8e0c.up.railway.app/tickets/${pedidoId}`;
    const subject = `Ticket del Pedido ID: ${pedidoId}`;
    const body = `Hola, aquí tienes el enlace para descargar tu ticket del Pedido ID: ${pedidoId}\n\n${url}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  const handleFechaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fechaSeleccionada = event.target.value;
    setFechaFiltro(fechaSeleccionada);

    if (fechaSeleccionada) {
      const pedidosFiltrados = pedidos.filter((pedido) => {
        const fechaPedido = new Date(pedido.createdAt).toISOString().split('T')[0];
        return fechaPedido === fechaSeleccionada;
      });
      setFilteredPedidos(pedidosFiltrados);
    } else {
      setFilteredPedidos(pedidos);
    }
  };

  return (
    <>
      <Navbar />
      <Box className="container">
        <Typography variant="h4">Historial de Pedidos</Typography>

        {/* Filtro de fecha */}
        <Box className="filter-container">
          <TextField
            label="Filtrar por fecha"
            type="date"
            value={fechaFiltro}
            onChange={handleFechaChange}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        {/* Pedidos filtrados */}
        {filteredPedidos.length === 0 ? (
          <Typography className="empty-state">No hay pedidos para esta fecha. 🛒</Typography>
        ) : (
          filteredPedidos.map((pedido) => (
            <Card className="card" key={pedido.id}>
              <CardContent className="card-content">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6">Pedido ID: {pedido.id}</Typography>
                    <Typography>
                      Total: ${isNaN(Number(pedido.total)) ? "N/A" : Number(pedido.total).toFixed(2)}
                    </Typography>
                    <Typography>Estado: {pedido.estado}</Typography>
                    <Typography>Fecha: {new Date(pedido.createdAt).toLocaleDateString()}</Typography>
                  </Box>

                  {/* Acción de botones */}
                  <Box display="flex" alignItems="center">
                    <BsEye className="action-icons" onClick={() => verDetalle(pedido.id)} />
                    <AiOutlineDownload className="action-icons download-icon" onClick={() => descargarTicket(pedido.id)} />
                    <FaWhatsapp className="action-icons whatsapp-icon" onClick={() => enviarWhatsApp(pedido.id)} />
                    <AiOutlineMail className="action-icons email-icon" onClick={() => enviarEmail(pedido.id)} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </>
  );
};

export default PedidosHistorial;
