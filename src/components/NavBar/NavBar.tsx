import React, { useState } from 'react';
import logo from '../../assets/logososneado.png';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { IoHome } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBook } from "react-icons/fa";



const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false); // Controlar opciones de Manual de Usuario
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleInicio = () => {
    navigate('/dashboard-admin');
  };

  const toggleManualOptions = () => {
    setIsManualOpen(!isManualOpen);
  };

  return (
    <header className="dashboard-header">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <button className="menu-button" onClick={toggleMenu}>
        <GiHamburgerMenu />
      </button>
      {/* Barra lateral */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <img src={logo} alt="Logo" className="logo-img2" />
        <button onClick={handleInicio}>
          <IoHome style={{ fontSize: '24px' }} /> Inicio
        </button>
        <div className="manual-container">
          <button onClick={toggleManualOptions}>
            <FaBook style={{ fontSize: '24px' }} /> Manual de Usuario
          </button>
          {isManualOpen && (
            <div className="manual-options">
              <button
                onClick={() =>
                  window.open(
                    'https://docs.google.com/document/d/1-12pFX_cfJaed_MJuLxrIbdIq4ccUkLkVa_YE1BrrsY/export?format=pdf',
                    '_blank'
                  )
                }
              >
                  Descargar PDF
              </button>
              <button
                onClick={() =>
                  window.open(
                    'https://drive.google.com/file/d/1nMrZKnV7L2RVZCxEIyIDbtdiOR1nyYPl/view?usp=sharing',
                    '_blank'
                  )
                }
              >
                  Ver Online
              </button>
            </div>
          )}
        </div>
        <button onClick={handleLogout}>
          <ImExit style={{ fontSize: '24px' }} /> Cerrar sesión
        </button>
      </div>
      {/* Fondo oscuro */}
      <div
        className={`overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      ></div>
    </header>
  );
};

export default Navbar;
