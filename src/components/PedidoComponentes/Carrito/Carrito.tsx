import React, { useState } from "react";
import { IconButton, Badge, Box, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "./Carrito.css";
import { useResumen } from "../../../context/ResumenContext";
import axios from "axios";

interface CarritoProps {
  metodoPago: string;
  onPedidoConfirmado: (pedido: { id: number; items: any; total: number }) => void;
}

const Carrito: React.FC<CarritoProps> = ({ onPedidoConfirmado }) => {
  const { resumen, eliminarItem, agregarItem } = useResumen(); // Incluimos agregarItem para actualizar la cantidad
  const [pedidoAbierto, setPedidoAbierto] = useState(false); // Estado para mostrar/ocultar el carrito

  const togglePedido = () => setPedidoAbierto(!pedidoAbierto);

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
      metodoPago: "efectivo",
      estado: "pendiente",
    };

    try {
      const response = await axios.post(
        "https://tesis-back-production-8e0c.up.railway.app/pedidos",
        pedido
      );
      onPedidoConfirmado(response.data); // Confirma el pedido
      togglePedido(); // Minimiza el carrito
    } catch (error) {
      console.error("Error al confirmar el pedido:", error);
      alert("No se pudo confirmar el pedido.");
    }
  };

  const handleActualizarCantidad = (id: number, delta: number) => {
    const item = resumen[id];
    const nuevaCantidad = item.cantidad + delta;

    if (nuevaCantidad > 0) {
      agregarItem({ ...item, cantidad: delta });
    }
  };

  return (
    <Box>
      {/* Botón fijo en la parte inferior */}
      <div className="pedido-boton" onClick={togglePedido}>
        <Badge badgeContent={Object.values(resumen).length} color="error">
          <Typography variant="button" className="pedido-texto">
            Tu Pedido 🛒 - ${calcularTotal().toFixed(2)}
          </Typography>
        </Badge>
      </div>

      {/* Contenido del pedido desplegable */}
      {pedidoAbierto && (
        <Box className="pedido-contenido">
          <Typography variant="h6" className="pedido-titulo">
            🛒 Resumen del Pedido
          </Typography>
          {Object.values(resumen).length > 0 ? (
            <>
              <ul className="pedido-items-lista">
                {Object.values(resumen).map((item) => (
                  <li key={item.id} className="pedido-item">
                    <div className="pedido-item-detalles">
                      <strong>{item.nombre}</strong>
                      <div className="cantidad-control">
                        <IconButton
                          onClick={() => handleActualizarCantidad(item.id, -1)}
                          className="boton-cantidad"
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                        <span className="cantidad-valor">{item.cantidad}</span>
                        <IconButton
                          onClick={() => handleActualizarCantidad(item.id, 1)}
                          className="boton-cantidad"
                        >
                          <AddCircleOutlineIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div className="pedido-item-precio">
                      ${(item.cantidad * item.precio).toFixed(2)}
                      <IconButton
                        onClick={() => eliminarItem(item.id)}
                        className="pedido-eliminar-button"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </li>
                ))}
              </ul>
              <Button onClick={handleConfirmarPedido} className="pedido-confirmar-button">
                Confirmar Pedido 🛍
              </Button>
            </>
          ) : (
            <Typography>Tu carrito está vacío. 😞</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Carrito;