import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import Navbar from '../NavBar/NavBar';
import NavbarClient from '../NavBarClient/NavBarClient';

// Modal content style
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: 24,
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center' as 'center',
};

const ColaboraConNosotros: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  // Function to handle modal open/close
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <>
      <NavbarClient /> 
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        ¡Colabora con Nosotros! 🤝✨
      </Typography>
      <Typography variant="h6" paragraph>
        ¿Te gustaría ser parte de la historia de <Typography component="span" sx={{ fontWeight: 'bold' }}>Sosneado</Typography>? ¡Es fácil! 💡
        Puedes ayudarnos a promocionar nuestro bar subiendo tus historias 📸 y
        contando tu experiencia 🗣️. 
      </Typography>
      <Typography variant="body1" paragraph>
        Solo tienes que usar el hashtag <Typography component="span" sx={{ fontWeight: 'bold' }}>#Sosneado</Typography> y etiquetarnos en tus
        publicaciones. ¡Nos encantaría saber lo que piensas y cómo te has
        sentido en nuestro espacio inclusivo! 🥰
      </Typography>

      <Typography variant="h6" paragraph>
        También aceptamos donaciones para continuar brindando nuestro servicio
        inclusivo para todos 💙. Si deseas colaborar, ¡aquí tienes los detalles!
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginTop: '20px' }}
      >
        Haz tu Donación 💸
      </Button>

      {/* Modal for donations */}
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="donation-modal-title"
        aria-describedby="donation-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" id="donation-modal-title" gutterBottom>
            ¡Gracias por tu apoyo! 💙
          </Typography>
          <Typography id="donation-modal-description" paragraph>
            Puedes hacer tu donación a través de la siguiente cuenta:
          </Typography>
          <Typography variant="body1" paragraph>
            <Typography component="span" sx={{ fontWeight: 'bold' }}>Cuenta de Donaciones:</Typography> <strong>123-456-789</strong>
            <br />
            <Typography component="span" sx={{ fontWeight: 'bold' }}>Banco:</Typography> Banco Inclusivo
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </Box>
    </>
  );
};

export default ColaboraConNosotros;
