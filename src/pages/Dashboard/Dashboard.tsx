import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import tableIconAvailable from '../../assets/mesa.png';
import tableIconOccupied from '../../assets/mesa_ocupada2.png';
import iconUser from '../../assets/user.png';
import './DashboardAdmin.css';
import Navbar from '../../components/NavBar/NavBar';

const DashboardAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [mesas, setMesas] = useState([]); // Estado para almacenar las mesas

  useEffect(() => {
    fetchMesas(); // Cargar mesas al renderizar
  }, []);

  // Función para obtener las mesas del backend
  const fetchMesas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/mesas'); // Cambia la URL según tu backend
      setMesas(response.data);
    } catch (error) {
      console.error('Error al cargar las mesas:', error);
    }
  };

  // Función para alternar disponibilidad de una mesa
  const toggleAvailability = async (id: number, isAvailable: boolean) => {
    try {
      await axios.patch(`http://localhost:3000/mesas/${id}`, {
        isAvailable: !isAvailable,
      });
      fetchMesas(); // Refresca las mesas después de cambiar el estado
    } catch (error) {
      console.error('Error al actualizar la mesa:', error);
    }
  };

  const handleSupplierOrder = () => {
    navigate('/supplier-orders'); // Redirige a la página de productos
  };


  const handleLoadProducts = () => {
    navigate('/products'); // Redirige a la página de productos
  };

  const handleLoadClientes = () => {
    navigate('/clients'); // Redirige a la página de productos
  };

  const handleHistorial = () => {
    navigate('/historial'); // Redirige a la página de productos
  };

  const handleVentas = () => {
    navigate('/ventas'); // Redirige a la página de productos
  };

  const handleUpdate = () => {
    navigate('/update-menu'); // Redirige a la página de productos
  };

  const handleMozos = () => {
    navigate('/gestion-mozos'); // Redirige a la página de productos
  };

  return (
    
    <>
      <Navbar /> {/* Agrega el Navbar aquí */}
    <div className="dashboard-container">
      <main className="dashboard-main">
      
        {/* Sección de mesas */}
        <section className="tables-section">
          <h2>Mesas:</h2>
          <div className="tables-container">
            {mesas.map((mesa: any) => (
              <div key={mesa.id} className="table">
                <img
                  src={mesa.isAvailable ? tableIconAvailable : tableIconOccupied}
                  alt={mesa.isAvailable ? 'Mesa Disponible' : 'Mesa Ocupada'}
                  className="table-icon"
                />
                <span>Mesa {mesa.numero}</span>
                <button
                  className={
                    mesa.isAvailable
                      ? 'toggle-button occupied'
                      : 'toggle-button available'
                  }
                  onClick={() => toggleAvailability(mesa.id, mesa.isAvailable)}
                >
                  {mesa.isAvailable ? 'deshabilitar' : 'habilitar'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de acciones */}
        <section className="actions-section">
        <button className="action-button" onClick={handleVentas}>Ventas</button>

          <button className="action-button" onClick={handleHistorial}>Historial de Pedidos</button>
          <button className="action-button" onClick={handleLoadProducts}>
            Cargar productos
          </button>
          <button className="action-button" onClick={handleUpdate}>Actualizar Menú</button>
          <button className="action-button" onClick={handleSupplierOrder}>Pagos a proveedores</button>
          <button className="action-button"onClick={handleLoadClientes}>Modulo Clientes</button>
          <div className="modify-section">
            <h3>Modificar información Socios</h3>
            <div className="modify-icons">
              <img src={iconUser} alt="Icono 1" onClick={handleMozos} />
              <img src={iconUser} alt="Icono 2" onClick={handleMozos} />
              <img src={iconUser} alt="Icono 3" onClick={handleMozos} />
              <img src={iconUser} alt="Icono 4" onClick={handleMozos} />
            </div>
          </div>
        </section>
      </main>
    </div>
    </>

  );
};

export default DashboardAdmin;
