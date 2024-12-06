// Ventas.tsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import axios from "axios";
import { format, startOfDay, startOfWeek, startOfMonth, isSameDay, isSameWeek, isSameMonth } from "date-fns";
import Navbar from "../../components/NavBar/NavBar";
import './Ventas.css';

const Ventas: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [ventasDia, setVentasDia] = useState<number>(0);
  const [ventasSemana, setVentasSemana] = useState<number>(0);
  const [ventasMes, setVentasMes] = useState<number>(0);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pedidos");
        setPedidos(response.data);
        calcularVentas(response.data);
      } catch (error) {
        console.error("Error al obtener historial de pedidos:", error);
      }
    };

    fetchPedidos();
  }, []);

  const calcularVentas = (pedidos: any[]) => {
    let totalDia = 0;
    let totalSemana = 0;
    let totalMes = 0;

    const hoy = new Date();

    pedidos.forEach((pedido) => {
      const fechaPedido = new Date(pedido.createdAt);
      const totalPedido = isNaN(Number(pedido.total)) ? 0 : Number(pedido.total);

      if (isSameDay(fechaPedido, hoy)) {
        totalDia += totalPedido;
      }

      if (isSameWeek(fechaPedido, hoy)) {
        totalSemana += totalPedido;
      }

      if (isSameMonth(fechaPedido, hoy)) {
        totalMes += totalPedido;
      }
    });

    setVentasDia(totalDia);
    setVentasSemana(totalSemana);
    setVentasMes(totalMes);
  };

  return (
    <>
      <Navbar />
      <Box className="ventas-container">
        <Typography variant="h4">Ventas</Typography>

        {/* Ventas del Día */}
        <Card className="ventas-card">
          <CardContent>
            <Typography variant="h6">Ventas del Día</Typography>
            <Typography>Total: ${ventasDia.toFixed(2)}</Typography>
          </CardContent>
        </Card>

        {/* Ventas de la Semana */}
        <Card className="ventas-card">
          <CardContent>
            <Typography variant="h6">Ventas de la Semana</Typography>
            <Typography>Total: ${ventasSemana.toFixed(2)}</Typography>
          </CardContent>
        </Card>

        {/* Ventas del Mes */}
        <Card className="ventas-card">
          <CardContent>
            <Typography variant="h6">Ventas del Mes</Typography>
            <Typography>Total: ${ventasMes.toFixed(2)}</Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Ventas;
