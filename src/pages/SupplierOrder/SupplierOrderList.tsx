import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/NavBar/NavBar';
import './SupplierOrderList.css';

const SupplierOrderList = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3000/supplier-orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    }
  };

  const markAsReceived = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/supplier-orders/${id}/received`, {
        method: 'PATCH',
      });
      fetchOrders(); // Refrescar la lista
    } catch (error) {
      console.error('Error al marcar como recibido:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreateOrder = () => {
    navigate('/supplier-orders-create'); // Redirige a la página de creación de productos
  };

  return (
    <>
      <Navbar />
      <div className="supplier-order-container">
        <h2 className="supplier-order-title">Pedidos al Proveedor</h2>
        <button onClick={handleCreateOrder} className="supplier-order-create-button">
          Crear Pedido
        </button>
        <ul className="supplier-order-list">
          {orders.map((order) => (
            <li key={order.id} className="supplier-order-item">
              <p className="supplier-order-description">{order.itemDescription}</p>
              <p className="supplier-order-total">Total: ${order.totalAmount}</p>
              <p className="supplier-order-status">
                Recibido: {order.isReceived ? 'Sí' : 'No'}
              </p>
              {!order.isReceived && (
                <button
                  onClick={() => markAsReceived(order.id)}
                  className="supplier-order-received-button"
                >
                  Marcar como recibido
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SupplierOrderList;
