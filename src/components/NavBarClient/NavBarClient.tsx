import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillInstagram } from "react-icons/ai";
import logo from "../../assets/logososneado.png";
import "../NavBar/Navbar.css";

const NavbarClient: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInicio = () => {
    navigate("/menu");
  };

  const handleColabora = () => {
    navigate("/colabora");
  };

  const handleQuienes = () => {
    navigate("/quienes-somos");
  };

  const handleDesarrolladoras = () => {
    navigate("/desarrolladoras");
  };

  const handleInstagram = () => {
    window.open(
      "https://www.instagram.com/coopdetrabajogenerandosonrisas/",
      "_blank"
    );
  };

  const handleHelp = () => {
    navigate("/help");
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
      <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <img src={logo} alt="Logo" className="logo-img2" />
        <button onClick={handleInicio}>🏠 Menu</button>
        <button onClick={handleQuienes}>👥 ¿Quiénes Somos?</button>
        <button onClick={handleColabora}>🤝 Colabora Con Nosotros</button>
        <button onClick={handleDesarrolladoras}>💻 Desarrolladores</button>
        <button onClick={handleHelp}>🆘 Ayuda</button>
        <button onClick={handleInstagram}>
          <AiFillInstagram style={{ marginRight: "8px" }} />
          Instagram
        </button>
      </div>
      {/* Fondo oscuro */}
      <div
        className={`overlay ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      ></div>
    </header>
  );
};

export default NavbarClient;
