import React, { useEffect, useState } from "react";
import { Box, Typography, Modal, Paper, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Slider from "react-slick"; // Importamos react-slick
import './HistoriasMozos.css';

interface Mozo {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

const HistoriasMozos: React.FC = () => {
  const [mozos, setMozos] = useState<Mozo[]>([]);
  const [mozoSeleccionado, setMozoSeleccionado] = useState<Mozo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://tesis-back-production-8e0c.up.railway.app/mozos")
      .then((response) => response.json())
      .then((data: Mozo[]) => {
        setMozos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar mozos:", err);
        setError("Error al cargar los mozos.");
        setLoading(false);
      });
  }, []);

  const handleClose = () => {
    setMozoSeleccionado(null);
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
    <Box className="historias-mozos-container">
      <Typography variant="h5" className="historias-mozos-titulo">
        Conoce a nuestros mozos 🤩
      </Typography>

      {loading && (
        <Typography variant="body1" className="historias-mozos-loading">
          Cargando mozos...
        </Typography>
      )}

      {error && (
        <Typography variant="body1" className="historias-mozos-error">
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <Slider {...sliderSettings} className="historias-mozos-carrusel">
          {mozos.map((mozo) => (
            <Box
              key={mozo.id}
              className="historias-mozos-item"
              onClick={() => setMozoSeleccionado(mozo)}
            >
              <img
                src={`https://tesis-back-production-8e0c.up.railway.app${mozo.imagen}`}
                alt={mozo.nombre}
                className="historias-mozos-imagen"
              />
              <Typography className="historias-mozos-nombre">{mozo.nombre}</Typography>
              <Typography className="historias-mozos-descripcion">
                {mozo.descripcion.substring(0, 40)}...
              </Typography>
            </Box>
          ))}
        </Slider>
      )}

      <Modal open={!!mozoSeleccionado} onClose={handleClose}>
        <Box className="historias-mozos-modal">
          {mozoSeleccionado && (
            <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
              <img
                src={`https://tesis-back-production-8e0c.up.railway.app${mozoSeleccionado.imagen}`}
                alt={mozoSeleccionado.nombre}
                className="historias-mozos-modal-imagen"
              />
              <Typography variant="h5">{mozoSeleccionado.nombre}</Typography>
              <Typography
                variant="body1"
                style={{ marginTop: "10px", fontStyle: "italic" }}
              >
                {mozoSeleccionado.descripcion}
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

export default HistoriasMozos;