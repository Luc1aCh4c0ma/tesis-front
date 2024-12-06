import React, { useState } from "react";
import { IconButton, Badge, Box, Modal, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Carrito.css";
import { useResumen } from "../../../context/ResumenContext";
import axios from "axios";

interface CarritoProps {
  metodoPago: string;
  onPedidoConfirmado: (pedido: { id: number; items: any; total: number }) => void;
}

const Carrito: React.FC<CarritoProps> = ({ onPedidoConfirmado }) => {
  const { resumen, eliminarItem, resetearResumen } = useResumen(); // Agregamos resetearResumen
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [modalAbierto, setModalAbierto] = useState(false);

  const toggleCarrito = () => setCarritoAbierto(!carritoAbierto);

  const calcularTotal = () => {
    return Object.values(resumen).reduce(
      (total, item) => total + item.cantidad * item.precio,
      0
    );
  };

  const handleConfirmarPedido = async () => {
    const pedido = {
      items: Object.values(resumen).map((item) => ({
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio: item.precio,
      })),
      total: calcularTotal(),
      metodoPago,
      estado: "pendiente",
    };

    console.log("Datos enviados al backend:", pedido);

    try {
      const response = await axios.post(
        "https://tesis-back-production-8e0c.up.railway.app/pedidos",
        pedido
      );
      onPedidoConfirmado(response.data);
      setModalAbierto(true); // Abre el modal de confirmación
      setCarritoAbierto(false); // Minimiza el carrito
    } catch (error) {
      console.error("Error al confirmar el pedido:", error);
      alert("No se pudo confirmar el pedido.");
    }
  };

  const handleCloseModal = () => {
    setModalAbierto(false);
    resetearResumen(); // Resetea el contenido del carrito
    setCarritoAbierto(false); // Minimiza el carrito
  };

  return (
    <Box>
      {/* Botón para abrir el carrito */}
      <button
        className="carrito-toggle-button"
        onClick={toggleCarrito}
      >
        <Badge badgeContent={Object.values(resumen).length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </button>
  
      {/* Contenedor del carrito como barra inferior */}
      <Box className={`carrito-contenido ${carritoAbierto ? "abierto" : ""}`}>
        <Typography variant="h6" className="carrito-titulo">
          🛒 Carrito de Compras
        </Typography>
        {Object.values(resumen).length > 0 ? (
          <>
            <ul className="carrito-items-lista">
              {Object.values(resumen).map((item) => (
                <li key={item.id} className="carrito-item">
                  <div>
                    <strong>{item.nombre}</strong> x {item.cantidad}
                  </div>
                  <div className="carrito-item-precio">
                    ${(item.cantidad * item.precio).toFixed(2)}
                    <IconButton
                      onClick={() => eliminarItem(item.id)}
                      className="carrito-eliminar-button"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </li>
              ))}
            </ul>
  
            {/* Total y confirmación */}
            <Typography variant="h6" className="carrito-total">
              Total: ${calcularTotal().toFixed(2)}
            </Typography>
            <Button
              onClick={handleConfirmarPedido}
              className="carrito-confirmar-button"
            >
              Confirmar Pedido 🛍
            </Button>
          </>
        ) : (
          <Typography>Tu carrito está vacío. 😞</Typography>
        )}
      </Box>
    </Box>
  );
  
};

export default Carrito;