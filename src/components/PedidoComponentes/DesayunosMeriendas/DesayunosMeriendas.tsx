import React, { useEffect, useState } from "react";
import { Box, Modal, Typography, Button } from "@mui/material";
import "../Bebidas/Productos.css";
import { useResumen } from "../../../context/ResumenContext";
import { obtenerProductos, Producto } from "../../../service/productosService";

const DesayunosMeriendas: React.FC = () => {
  const [desayunos, setDesayunos] = useState<Producto[]>([]);
  const { agregarItem } = useResumen();
  const [notificacionAbierta, setNotificacionAbierta] = useState(false);
  const [productoAgregado, setProductoAgregado] = useState<Producto | null>(null);

  useEffect(() => {
    const fetchDesayunos = async () => {
      try {
        const categoriaId = 3; // ID de la categoría "Desayunos y Meriendas"
        const productos = await obtenerProductos(categoriaId);
        const productosDisponibles = productos.filter(producto => producto.disponible);
        setDesayunos(productosDisponibles);
      } catch (error) {
        console.error("Error al cargar los desayunos:", error);
      }
    };
    fetchDesayunos();
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
      <h2 className="productos-titulo">🥐 Desayunos y Meriendas ☕</h2>
      <div className="productos-lista">
        {desayunos.map((desayuno) => (
          <div key={desayuno.id} className="producto-item">
            <img
              src={desayuno.imagen}
              alt={desayuno.nombre}
              className="producto-imagen"
            />
            <div className="producto-detalles">
              <span className="producto-nombre">{desayuno.nombre}</span>
              <span className="producto-precio">${desayuno.precio.toFixed(2)}</span>
              <button
                className="producto-boton"
                onClick={() => handleAgregarAlCarrito(desayuno)}
              >
                Añadir al carrito 🛒
              </button>
              <div className="producto-descripcion">
                <p>{desayuno.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        className="ver-carrito-boton"
        variant="contained"
        color="secondary"
        href="/carrito"
        style={{ marginTop: "20px" }}
      >
        Ver Carrito 🛒
      </Button>

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
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DesayunosMeriendas;
