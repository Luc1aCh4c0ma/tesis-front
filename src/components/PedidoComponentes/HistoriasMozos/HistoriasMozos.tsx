import React, { useEffect, useState } from "react";
import { Box, Typography, Modal, Paper, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import './HistoriasMozos.css'; // Importar el archivo CSS

// Definimos el tipo para los mozos
interface Mozo {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

const HistoriasMozos: React.FC = () => {
  const [mozos, setMozos] = useState<Mozo[]>([]);
  const [mozoSeleccionado, setMozoSeleccionado] = useState<Mozo | null>(null); // Tipamos como Mozo o null
  const [loading, setLoading] = useState<boolean>(true); // Tipamos como booleano
  const [error, setError] = useState<string | null>(null); // Tipamos el error como string o null

  useEffect(() => {
    fetch("http://localhost:3000/mozos")
      .then((response) => response.json())
      .then((data: Mozo[]) => { // Ahora reconocemos que `data` es un array
        console.log("Respuesta del servidor:", data);
        setMozos(data); // Guardamos directamente el array en el estado
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

  return (
    <Box className="historias-mozos-container">
      <Typography variant="h5" className="historias-mozos-titulo">
        Conoce a nuestros mozos 🤩
      </Typography>

      <Typography variant="body1" className="historias-mozos-subtitulo">
        ¡Haz clic en las imágenes para conocer sus historias! 🎉
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

      {/* Contenedor para las historias */}
      <Box className="historias-mozos-galeria">
        {Array.isArray(mozos) && mozos.map((mozo) => (
          <Box
            key={mozo.id}
            onClick={() => setMozoSeleccionado(mozo)}
            className="historias-mozos-item"
          >
            <img
              src={`http://localhost:3000${mozo.imagen}`} // Ruta completa del backend
              alt={mozo.nombre}
              className="historias-mozos-imagen"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-image.png'; // Ruta de imagen de respaldo
              }}
            />
            <Typography className="historias-mozos-nombre">
              {mozo.nombre}
            </Typography>
            <Typography className="historias-mozos-descripcion">
              {mozo.descripcion.substring(0, 40)}...
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Modal con detalles del mozo seleccionado */}
      <Modal open={!!mozoSeleccionado} onClose={handleClose}>
        <Box className="historias-mozos-modal">
          {mozoSeleccionado && (
            <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
              <img
                src={`http://localhost:3000${mozoSeleccionado.imagen}`} // Ruta completa del backend
                alt={mozoSeleccionado.nombre}
                className="historias-mozos-modal-imagen"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-image.png'; // Imagen de respaldo
                }}
              />
              <Typography variant="h5">{mozoSeleccionado.nombre}</Typography>
              <Typography variant="body1" style={{ marginTop: "10px", fontStyle: "italic" }}>
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
