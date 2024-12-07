import React, { useState } from "react";
import { IconButton, Badge, Box, Modal, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "./Carrito.css"; // Archivo CSS para los estilos
import { useResumen } from "../../../context/ResumenContext";
import axios from "axios";

interface CarritoProps {
  metodoPago: string;
  onPedidoConfirmado: (pedido: { id: number; items: any; total: number }) => void;
}

const Carrito: React.FC<CarritoProps> = ({ onPedidoConfirmado }) => {
  const { resumen, eliminarItem, agregarItem } = useResumen();
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [notificacionAbierta, setNotificacionAbierta] = useState(false); // Estado para la notificación

  const toggleCarrito = () => setCarritoAbierto(!carritoAbierto);

  const calcularTotal = () => {
    return Object.values(resumen).reduce(
      (total, item) => total + item.cantidad * item.precio,
      0
    );
  };

  const handleAgregarProducto = (producto: any) => {
    agregarItem(producto);
    setNotificacionAbierta(true); // Abre la notificación
  };

  const handleCerrarNotificacion = () => {
    setNotificacionAbierta(false); // Cierra la notificación
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
      setModalAbierto(true); // Abre el modal de confirmación
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
      {/* Botón flotante con el ícono del carrito */}
      <div>
        <IconButton className="carrito-icon-button" onClick={toggleCarrito}>
          <Badge badgeContent={Object.values(resumen).length} color="error">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </IconButton>
      </div>

      {/* Contenido del carrito */}
      {carritoAbierto && (
        <Box className="carrito-contenido">
          <Typography variant="h6" className="carrito-titulo">
            🛒 Carrito de Compras
          </Typography>
          {Object.values(resumen).length > 0 ? (
            <>
              <ul className="carrito-items-lista">
                {Object.values(resumen).map((item) => (
                  <li key={item.id} className="carrito-item">
                    <div className="carrito-item-detalles">
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
              <Button onClick={handleConfirmarPedido} className="carrito-confirmar-button">
                Confirmar Pedido 🛍
              </Button>
            </>
          ) : (
            <Typography>Tu carrito está vacío. 😞</Typography>
          )}
        </Box>
      )}

      {/* Modal de notificación */}
      <Modal
        open={notificacionAbierta}
        onClose={handleCerrarNotificacion}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="carrito-modal">
          <Typography variant="h6" id="modal-title">
            ¡Producto agregado al carrito! 🎉
          </Typography>
          <Box display="flex" justifyContent="space-around" marginTop="20px">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setCarritoAbierto(true);
                handleCerrarNotificacion();
              }}
            >
              Ver Carrito
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCerrarNotificacion}>
              Seguir Comprando
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Carrito;