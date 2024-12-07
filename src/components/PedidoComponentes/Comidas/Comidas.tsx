import React, { useEffect, useState } from "react";
import { Box, Modal, Typography, Button } from "@mui/material";
import { useResumen } from "../../../context/ResumenContext";
import { obtenerProductos, Producto } from "../../../service/productosService";
import "../Bebidas/Productos.css";

const Comidas: React.FC = () => {
  const [comidas, setComidas] = useState<Producto[]>([]);
  const { agregarItem } = useResumen();
  const [notificacionAbierta, setNotificacionAbierta] = useState(false);
  const [productoAgregado, setProductoAgregado] = useState<Producto | null>(null);

  useEffect(() => {
    const fetchComidas = async () => {
      try {
        const categoriaId = 2; // ID para la categoría "Comidas"
        const productos = await obtenerProductos(categoriaId);
        const comidasDisponibles = productos.filter(comida => comida.disponible);
        setComidas(comidasDisponibles);
      } catch (error) {
        console.error("Error al cargar las comidas:", error);
      }
    };
    fetchComidas();
  }, []);

  const handleAgregarAlCarrito = (producto: Producto) => {
    agregarItem({ ...producto, cantidad: 1 });
    setProductoAgregado(producto);
    setNotificacionAbierta(true);
  };

  const handleCerrarNotificacion = () => {
    setNotificacionAbierta(false);
    setProductoAgregado(null);
  };

  return (
    <div className="productos-container">
      <h2 className="productos-titulo">🍕 Comidas 🍔</h2>
      <div className="productos-lista">
        {comidas.map((comida) => (
          <div key={comida.id} className="producto-item">
            <img
              src={comida.imagen}
              alt={comida.nombre}
              className="producto-imagen"
            />
            <div className="producto-detalles">
              <span className="producto-nombre">{comida.nombre}</span>
              <span className="producto-precio">${comida.precio.toFixed(2)}</span>
              <button
                className="producto-boton"
                onClick={() => handleAgregarAlCarrito(comida)}
              >
                Añadir al carrito 🛒
              </button>
              <div className="producto-descripcion">
                <p>{comida.descripcion}</p>
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
      >
        <Box className="modal-contenedor">
          <Typography variant="h6">
            ¡Producto agregado al carrito! 🎉
          </Typography>
          {productoAgregado && (
            <Typography>
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

export default Comidas;
