import React, { useState } from "react";
import { IconButton, Badge, Box, Modal, Typography, Button } from "@mui/material";
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
  const { resumen, eliminarItem, agregarItem } = useResumen();
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [notificacionProductoAbierta, setNotificacionProductoAbierta] = useState(false); // Estado para la notificación de producto agregado
  const [notificacionPedidoAbierta, setNotificacionPedidoAbierta] = useState(false); // Estado para la notificación de pedido confirmado

  const toggleCarrito = () => setCarritoAbierto(!carritoAbierto);

  const calcularTotal = () => {
    return Object.values(resumen).reduce(
      (total, item) => total + item.cantidad * item.precio,
      0
    );
  };

  const handleAgregarProducto = (producto: any) => {
    agregarItem(producto);
    setNotificacionProductoAbierta(true); // Mostrar la notificación modal de producto agregado
  };

  const handleCerrarNotificacionProducto = () => {
    setNotificacionProductoAbierta(false);
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
      await axios.post("https://tesis-back-production-8e0c.up.railway.app/pedidos", pedido);
      onPedidoConfirmado(pedido); // Confirma el pedido
      setNotificacionPedidoAbierta(true); // Mostrar la notificación modal de pedido confirmado
    } catch (error) {
      console.error("Error al confirmar el pedido:", error);
      alert("No se pudo confirmar el pedido.");
    }
  };

  const handleCerrarNotificacionPedido = () => {
    setNotificacionPedidoAbierta(false);
  };

  return (
    <Box>
      {/* Botón flotante para abrir el carrito */}
      <IconButton className="carrito-icon-button" onClick={toggleCarrito}>
        <Badge badgeContent={Object.values(resumen).length} color="error">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </IconButton>

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
                          onClick={() => agregarItem({ ...item, cantidad: -1 })}
                          className="boton-cantidad"
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                        <span className="cantidad-valor">{item.cantidad}</span>
                        <IconButton
                          onClick={() => agregarItem({ ...item, cantidad: 1 })}
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

      {/* Modal de notificación de producto agregado */}
      <Modal
        open={notificacionProductoAbierta}
        onClose={handleCerrarNotificacionProducto}
        aria-labelledby="modal-notificacion-producto-title"
        aria-describedby="modal-notificacion-producto-description"
      >
        <Box className="carrito-modal">
          <Typography variant="h6" id="modal-notificacion-producto-title">
            ¡Producto agregado al carrito! 🎉
          </Typography>
          <Box display="flex" justifyContent="space-around" marginTop="20px">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setCarritoAbierto(true);
                handleCerrarNotificacionProducto();
              }}
            >
              Ver Carrito
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCerrarNotificacionProducto}>
              Seguir Comprando
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal de notificación de pedido confirmado */}
      <Modal
        open={notificacionPedidoAbierta}
        onClose={handleCerrarNotificacionPedido}
        aria-labelledby="modal-notificacion-pedido-title"
        aria-describedby="modal-notificacion-pedido-description"
      >
        <Box className="carrito-modal">
          <Typography variant="h5" id="modal-notificacion-pedido-title" gutterBottom>
            ¡Pedido Confirmado! 🎉
          </Typography>
          <Typography id="modal-notificacion-pedido-description" paragraph>
            Tu pedido se ha realizado correctamente. ¡Gracias por tu compra! 🛒
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCerrarNotificacionPedido}
            className="carrito-cerrar-button"
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Carrito;