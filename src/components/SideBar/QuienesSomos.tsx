import React from "react";
import { Box, Container, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css"; // Estilos del carousel
import "slick-carousel/slick/slick-theme.css"; // Tema del carousel
import Slider from "react-slick";
import Navbar from "../NavBar/NavBar";
import NavbarClient from "../NavBarClient/NavBarClient";


const QuienesSomos: React.FC = () => {
  const settings = {
    dots: false, // Ocultar los puntos de navegación
    infinite: true, // Hace que el carousel sea infinito
    speed: 500, // Velocidad de transición
    slidesToShow: 3, // Número de imágenes a mostrar en pantallas grandes
    slidesToScroll: 1, // Cuántas imágenes se desplazan por vez
    autoplay: true, // Activa el auto-play
    autoplaySpeed: 3000, // Velocidad de auto-play
    arrows: true, // Solo mostrar las flechas de navegación
    centerMode: true, // Habilita el modo de centrado
    responsive: [
      {
        breakpoint: 600, // Para pantallas pequeñas
        settings: {
          slidesToShow: 1, // Muestra una sola imagen en pantallas pequeñas
        },
      },
    ],
  };

  return (

    <>
      <NavbarClient /> 
    <Container maxWidth="lg" sx={{ padding: "20px" }}>
      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="h3" align="center" gutterBottom>
          ¿Quiénes Somos? 🤔✨
        </Typography>
        <Typography variant="h6" align="center" paragraph>
          En{" "}
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            Sosneado
          </Typography>
          , nuestro objetivo es brindarte una experiencia única de integración
          y convivencia, donde cada uno de nuestros clientes pueda disfrutar de
          un espacio inclusivo, accesible y lleno de buenos momentos. 😄🎉
        </Typography>
      </Box>

      {/* Carousel con react-slick */}
      <Box sx={{ marginBottom: "40px" }}>
        <Slider {...settings}>
          <div>
            <img
              src="/carusel1.png"
              alt="Imagen 1"
              style={{
                width: "100%",
                borderRadius: "10px",
                maxHeight: "400px", // Limita la altura de las imágenes
                objectFit: "cover", // Mantiene las proporciones sin distorsionar
              }}
            />
            <p className="legend"></p>
          </div>
          <div>
            <img
              src="/carusel2.png"
              alt="Imagen 2"
              style={{
                width: "100%",
                borderRadius: "10px",
                maxHeight: "400px", // Limita la altura de las imágenes
                objectFit: "cover", // Mantiene las proporciones sin distorsionar
              }}
            />
            <p className="legend"></p>
          </div>
          <div>
            <img
              src="/carusel3.png"
              alt="Imagen 3"
              style={{
                width: "100%",
                borderRadius: "10px",
                maxHeight: "400px", // Limita la altura de las imágenes
                objectFit: "cover", // Mantiene las proporciones sin distorsionar
              }}
            />
            <p className="legend"></p>
          </div>
        </Slider>
      </Box>

      {/* Sección de texto adicional */}
      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Un bar para soñar 🌟
        </Typography>
        <Typography variant="body1" paragraph>
          El bar{" "}
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            Sosneado
          </Typography>{" "}
          es un espacio creado con la visión de integrar a todas las personas,
          brindando un ambiente único y accesible para disfrutar de buenos
          momentos. Desde nuestra apertura, nos hemos enfocado en crear un
          lugar cómodo y adaptado para todos, donde cada persona, independientemente
          de sus capacidades, pueda sentirse parte de esta gran familia. 🏠💖
        </Typography>
        <Typography variant="body1" paragraph>
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            Sosneado
          </Typography>{" "}
          es más que un bar. Es un sueño hecho realidad para muchas personas
          que creen en la inclusión, la diversidad y el buen vivir. Aquí nos
          importa el bienestar de cada visitante y trabajamos día a día para
          ofrecer un lugar acogedor con un menú que se adapta a todos. 🍴🌍
        </Typography>
      </Box>

      {/* Información adicional */}
      <Box sx={{ textAlign: "center", marginBottom: "40px" }}>
        <Typography variant="h5" gutterBottom>
          ¡Te invitamos a ser parte de nuestro sueño! 💭
        </Typography>
        <Typography variant="body1" paragraph>
          Ven a{" "}
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            Sosneado
          </Typography>{" "}
          y vive la experiencia de un bar inclusivo donde todos pueden
          disfrutar. Te esperamos con los brazos abiertos. 🤗❤️
        </Typography>
      </Box>
    </Container>
    </>
  );
};

export default QuienesSomos;
