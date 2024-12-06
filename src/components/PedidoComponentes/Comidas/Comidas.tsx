import React, { useEffect, useState } from "react";
import { Box, Typography, Modal, Paper, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Slider from "react-slick"; // Importamos react-slick
import "./Comidas.css"; // Archivo CSS específico

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  disponible:boolean;
}

const Comidas: React.FC = () => {
  const [comidas, setComidas] = useState<Producto[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://tu-backend-url.com/comidas") // Cambia por tu URL del backend
      .then((response) => response.json())
      .then((data: Producto[]) => {
        setComidas(data.filter((comida) => comida.disponible)); // Filtrar solo productos disponibles
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar las comidas:", err);
        setError("Error al cargar las comidas.");
        setLoading(false);
      });
  }, []);

  const handleClose = () => {
    setProductoSeleccionado(null);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: true, // Habilita el deslizamiento táctil
  };

  return (
    <Box className="comidas-container">
      <Typography variant="h5" className="comidas-titulo">
        🍕 Comidas Disponibles 🍔
      </Typography>

      {loading && (
        <Typography variant="body1" className="comidas-loading">
          Cargando comidas...
        </Typography>
      )}

      {error && (
        <Typography variant="body1" className="comidas-error">
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <Slider {...sliderSettings} className="comidas-carrusel">
          {comidas.map((comida) => (
            <Box
              key={comida.id}
              className="comidas-item"
              onClick={() => setProductoSeleccionado(comida)}
            >
              <img
                src={comida.imagen}
                alt={comida.nombre}
                className="comidas-imagen"
              />
              <Typography className="comidas-nombre">{comida.nombre}</Typography>
              <Typography className="comidas-precio">
                ${comida.precio.toFixed(2)}
              </Typography>
              <Typography className="comidas-descripcion">
                {comida.descripcion.substring(0, 40)}...
              </Typography>
            </Box>
          ))}
        </Slider>
      )}

      <Modal open={!!productoSeleccionado} onClose={handleClose}>
        <Box className="comidas-modal">
          {productoSeleccionado && (
            <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
              <img
                src={productoSeleccionado.imagen}
                alt={productoSeleccionado.nombre}
                className="comidas-modal-imagen"
              />
              <Typography variant="h5">{productoSeleccionado.nombre}</Typography>
              <Typography variant="body1">
                ${productoSeleccionado.precio.toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                style={{ marginTop: "10px", fontStyle: "italic" }}
              >
                {productoSeleccionado.descripcion}
              </Typography>
              <IconButton
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "#ff4d4f",
                  color: "#fff",
                  borderRadius: "50%",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Paper>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Comidas;