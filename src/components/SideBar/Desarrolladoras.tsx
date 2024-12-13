import React, { useState } from 'react';
import { Box, Container, Typography, Grid, IconButton, Modal } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code'; // Ícono para React
import StorageIcon from '@mui/icons-material/Storage'; // Ícono para MySQL
import DataUsageIcon from '@mui/icons-material/DataUsage'; // Ícono para Prisma
import MemoryIcon from '@mui/icons-material/Memory'; // Ícono para NestJS
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; // Ícono para TypeScript
import Navbar from '../NavBar/NavBar';
import NavbarClient from '../NavBarClient/NavBarClient';

const Desarrolladoras: React.FC = () => {
  // Estado para manejar la apertura y cierre del modal de la imagen
  const [open, setOpen] = useState(false);

  // Función para abrir el modal
  const handleOpen = () => setOpen(true);

  // Función para cerrar el modal
  const handleClose = () => setOpen(false);

  return (
    <>
      <NavbarClient /> 
    <Container sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Conoce a las Desarrolladoras y desarrolladores 💻✨
      </Typography>

      <Typography variant="body1" paragraph>
        Somos un equipo de 5 estudiantes de 3er año de la carrera de Software en el Instituto Superior Arturo Umberto Illía. Decidimos embarcarnos en este proyecto porque queríamos hacer algo más que un simple trabajo de tesis. Queríamos crear una <Typography component="span" sx={{ fontWeight: 'bold' }}>herramienta real</Typography> que tuviera un impacto positivo, especialmente en una cafetería que se esfuerza por ofrecer un servicio accesible y eficiente.
      </Typography>

      <Typography variant="body1" paragraph>
        Durante nuestras conversaciones con el equipo de la cafetería, nos dimos cuenta de lo importante que es para ellos el trabajo y lo desafiantes que pueden ser algunos de los procesos. Nos inspiró mucho su motivación y su deseo de superación. Por eso, decidimos utilizar nuestras habilidades tecnológicas para simplificar esos procesos, mejorar la eficiencia y hacerles la vida un poco más fácil. <Typography component="span" sx={{ fontWeight: 'bold' }}>Sosneado</Typography> nació con la misión de ser una herramienta para facilitar la gestión del servicio y optimizar la experiencia de todos.
      </Typography>

      <Typography variant="body1" paragraph>
        Este proyecto forma parte de nuestro <Typography component="span" sx={{ fontWeight: 'bold' }}>proyecto de tesis</Typography>, y más allá de ser una simple tarea académica, se convirtió en una <Typography component="span" sx={{ fontWeight: 'bold' }}>causa que nos apasionó profundamente</Typography>. Queremos crear herramientas tecnológicas inclusivas que no solo faciliten las tareas diarias en la cafetería, sino que también mejoren la experiencia laboral de todos los que allí trabajan, creando un ambiente más eficiente y organizado.
      </Typography>

      <Typography variant="h5" paragraph>
        Tecnologías utilizadas 🛠️:
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <IconButton>
            <CodeIcon fontSize="large" /> {/* Ícono de React */}
          </IconButton>
          <Typography>React</Typography>
        </Grid>
        <Grid item>
          <IconButton>
            <StorageIcon fontSize="large" /> {/* Ícono de MySQL */}
          </IconButton>
          <Typography>MySQL</Typography>
        </Grid>
        <Grid item>
          <IconButton>
            <DataUsageIcon fontSize="large" /> {/* Ícono de Prisma */}
          </IconButton>
          <Typography>Prisma</Typography>
        </Grid>
        <Grid item>
          <IconButton>
            <MemoryIcon fontSize="large" /> {/* Ícono de NestJS */}
          </IconButton>
          <Typography>NestJS</Typography>
        </Grid>
        <Grid item>
          <IconButton>
            <AutoAwesomeIcon fontSize="large" /> {/* Ícono de TypeScript */}
          </IconButton>
          <Typography>TypeScript</Typography>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: '40px' }}>
        {/* Imagen pequeña que se puede expandir */}
        <img
          src="/todassosneado.jpg"  // Asegúrate de tener la foto en la carpeta public
          alt="Nuestro equipo"
          style={{ width: '60%', cursor: 'pointer', borderRadius: '8px' }}
          onClick={handleOpen} // Al hacer clic, abrir el modal
        />
      </Box>

      {/* Modal para imagen expandible */}
      <Modal
        open={open}
        onClose={handleClose} // Cierra el modal al hacer clic fuera de la imagen
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: 24,
          maxWidth: '90%', maxHeight: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <img
            src="/todassosneado.jpg"  // La misma imagen, pero mostrada en tamaño grande
            alt="Nuestro equipo"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Box>
      </Modal>
    </Container>
    </>
  );
};

export default Desarrolladoras;
