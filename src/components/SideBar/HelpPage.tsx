
import React from "react";
import { Container, Typography, Grid, Card, CardContent, Box } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import "./HelpPage.css";
import Navbar from "../NavBar/NavBar";
import NavbarClient from "../NavBarClient/NavBarClient";

const HelpPage: React.FC = () => {
  return (
    <>
      <NavbarClient /> 
    <Container className="help-page">
      <Typography variant="h4" className="help-title">
        🆘 ¡Explora nuestro Manual de Usuario!
      </Typography>

      <Typography variant="body1" className="help-intro">
        Descubre cómo usar nuestra aplicación con facilidad. Aquí encontrarás
        respuestas rápidas, tips útiles y pasos detallados para dominarla como
        un profesional.
      </Typography>

      {/* Sección de Preguntas Frecuentes */}
      <Box className="help-faq-section">
        <Typography variant="h5" className="section-title">
          🌟 Preguntas Frecuentes 🌟
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card className="faq-card">
              <CardContent>
                <HelpOutlineIcon className="faq-icon bounce" />
                <Typography variant="h6" className="faq-question">
                  ¿Cómo accedo al sistema?
                </Typography>
                <Typography variant="body2">
                  Escanea el código QR proporcionado por el establecimiento y
                  listo, ¡ya estás dentro!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="faq-card">
              <CardContent>
                <TableRestaurantIcon className="faq-icon rotate" />
                <Typography variant="h6" className="faq-question">
                  ¿Cómo selecciono mi mesa?
                </Typography>
                <Typography variant="body2">
                  Escoge tu mesa desde la lista que aparece al escanear el QR.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="faq-card">
              <CardContent>
                <MenuBookIcon className="faq-icon zoom" />
                <Typography variant="h6" className="faq-question">
                  ¿Cómo veo el menú?
                </Typography>
                <Typography variant="body2">
                  Explora nuestras categorías de productos y deléitate.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="faq-card">
              <CardContent>
                <ShoppingCartIcon className="faq-icon shake" />
                <Typography variant="h6" className="faq-question">
                  ¿Cómo realizo un pedido?
                </Typography>
                <Typography variant="body2">
                  Selecciona productos, ajústalos en el carrito y confirma.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="faq-card">
              <CardContent>
                <SupportAgentIcon className="faq-icon pulse" />
                <Typography variant="h6" className="faq-question">
                  ¿Qué hago si necesito ayuda?
                </Typography>
                <Typography variant="body2">
                  Contacta al personal o consulta esta guía interactiva.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Sección de Tips Detallados */}
      <Box className="help-tips-section">
        <Typography variant="h5" className="section-title">
          🎯 Consejos para Usuarios
        </Typography>
        <Box className="help-tips">
          <Typography variant="body1" className="help-tip">
            ✅ <strong>Selecciona tu mesa correctamente:</strong> Esto asegura que
            tu pedido llegue al lugar correcto.
          </Typography>
          <Typography variant="body1" className="help-tip">
            ✅ <strong>Revisa tu carrito antes de confirmar:</strong> No olvides
            verificar cantidades y productos.
          </Typography>
          <Typography variant="body1" className="help-tip">
            ✅ <strong>¡Explora el menú completo!</strong> Hay sorpresas deliciosas
            en cada categoría.
          </Typography>
          <Typography variant="body1" className="help-tip">
            ✅ <strong>Pide ayuda si es necesario:</strong> Estamos aquí para
            garantizar tu experiencia.
          </Typography>
        </Box>
      </Box>
    </Container>
    </>
  );
};

export default HelpPage;