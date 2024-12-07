import React, { useEffect, useState } from "react";
import "./Productos.css";
import { useResumen } from "../../../context/ResumenContext";
import { obtenerProductos, Producto } from "../../../service/productosService";
import { Box, Modal, Typography, Button } from "@mui/material";

const Bebidas: React.FC = () => {
  const [bebidas, setBebidas] = useState<Producto[]>([]);
  const { agregarItem } = useResumen();
  const [notificacionAbierta, setNotificacionAbierta] = useState(false); // Estado para el modal
  const [productoAgregado, setProductoAgregado] = useState<Producto | null>(
    null
  ); // Producto que se acaba de agregar
  

  useEffect(() => {
    const fetchBebidas = async () => {
      try {
        const categoriaId = 1; // ID de la categoría de Bebidas
        const productos = await obtenerProductos(categoriaId);
        const bebidasDisponibles = productos.filter(
          (bebida) => bebida.disponible
        );
        setBebidas(bebidasDisponibles);
      } catch (error) {
        console.error("Error al cargar las bebidas:", error);
      }
    };
    fetchBebidas();
  }, []);

  const handleAgregarAlCarrito = (producto: Producto) => {
    agregarItem({ ...producto, cantidad: 1 });
    setProductoAgregado(producto); // Guardamos el producto agregado
    setNotificacionAbierta(true); // Mostramos el modal
  };

  const handleCerrarNotificacion = () => {
    setNotificacionAbierta(false);
    setProductoAgregado(null);
  };

  return (
    <div className="productos-container">
      <h2 className="productos-titulo">🥤 Bebidas para Todos 🍹</h2>
      <div className="productos-lista">
        {bebidas.map((bebida) => (
          <div key={bebida.id} className="producto-item">
            <img
              src={bebida.imagen}
              alt={bebida.nombre}
              className="producto-imagen"
            />
            <div className="producto-detalles">
              <span className="producto-nombre">{bebida.nombre}</span>
              <span className="producto-precio">
                ${bebida.precio.toFixed(2)}
              </span>
              <button
                className="producto-boton"
                onClick={() => handleAgregarAlCarrito(bebida)}
              >
                Añadir al carrito 🛒
              </button>
              <div className="producto-descripcion">
                <p>{bebida.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de notificación */}
      <Modal
        open={notificacionAbierta}
        onClose={handleCerrarNotificacion}
        aria-labelledby="modal-notificacion-producto-title"
        aria-describedby="modal-notificacion-producto-description"
      >
        <Box className="modal-contenedor">
          <Typography variant="h6" id="modal-notificacion-producto-title">
            ¡Producto agregado al carrito! 🎉
          </Typography>
          {productoAgregado && (
            <Typography id="modal-notificacion-producto-description">
              {productoAgregado.nombre} ha sido añadido al carrito.
            </Typography>
          )}
          <Box display="flex" justifyContent="space-around" marginTop="20px">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCerrarNotificacion}
            >
              Seguir Comprando
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setNotificacionAbierta(false); // Cierra el modal
                const carritoButton = document.querySelector(".carrito-icon-button") as HTMLButtonElement;
                  if (carritoButton) {
                    carritoButton.click(); // Simula un clic en el botón de carrito
                  }

              }}
            >
              Ver Carrito
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Bebidas;
