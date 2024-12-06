import React, { useState } from 'react';
import './AddSupplierOrder.css';
import Navbar from '../../components/NavBar/NavBar';

const AddSupplierOrder = () => {
  const [formData, setFormData] = useState({
    sellerName: '',
    sellerAddress: '',
    buyerName: '',
    buyerAddress: '',
    orderDate: '',
    orderNumber: '',
    itemDescription: '',
    totalAmount: 0,
    quantity: 0,
    expectedDeliveryDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://tesis-back-production-8e0c.up.railway.app/supplier-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Pedido agregado exitosamente');
        setFormData({
          sellerName: '',
          sellerAddress: '',
          buyerName: '',
          buyerAddress: '',
          orderDate: '',
          orderNumber: '',
          itemDescription: '',
          totalAmount: 0,
          quantity: 0,
          expectedDeliveryDate: '',
        });
      }
    } catch (error) {
      console.error('Error al agregar pedido:', error);
    }
  };

  return (
    <>
      <Navbar /> 
    <div className="form-container">
      <h2 className="form-title">Formulario de Pedido al Proveedor</h2>
      <form className="supplier-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="sellerName">Nombre del Vendedor</label>
          <input
            id="sellerName"
            type="text"
            name="sellerName"
            placeholder="Nombre del vendedor"
            onChange={handleChange}
            value={formData.sellerName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sellerAddress">Dirección del Vendedor</label>
          <input
            id="sellerAddress"
            type="text"
            name="sellerAddress"
            placeholder="Dirección del vendedor"
            onChange={handleChange}
            value={formData.sellerAddress}
          />
        </div>
        <div className="form-group">
          <label htmlFor="buyerName">Nombre del Comprador</label>
          <input
            id="buyerName"
            type="text"
            name="buyerName"
            placeholder="Nombre del comprador"
            onChange={handleChange}
            value={formData.buyerName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="buyerAddress">Dirección del Comprador</label>
          <input
            id="buyerAddress"
            type="text"
            name="buyerAddress"
            placeholder="Dirección del comprador"
            onChange={handleChange}
            value={formData.buyerAddress}
          />
        </div>
        <div className="form-group">
          <label htmlFor="orderDate">Fecha del Pedido</label>
          <input
            id="orderDate"
            type="date"
            name="orderDate"
            onChange={handleChange}
            value={formData.orderDate}
          />
        </div>
        <div className="form-group">
          <label htmlFor="orderNumber">Número de Pedido</label>
          <input
            id="orderNumber"
            type="text"
            name="orderNumber"
            placeholder="Número de pedido"
            onChange={handleChange}
            value={formData.orderNumber}
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemDescription">Descripción de los Artículos</label>
          <textarea
            id="itemDescription"
            name="itemDescription"
            placeholder="Descripción de los artículos"
            onChange={handleChange}
            value={formData.itemDescription}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="totalAmount">Importe Total</label>
          <input
            id="totalAmount"
            type="number"
            name="totalAmount"
            placeholder="Importe total"
            onChange={handleChange}
            value={formData.totalAmount}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Cantidad</label>
          <input
            id="quantity"
            type="number"
            name="quantity"
            placeholder="Cantidad"
            onChange={handleChange}
            value={formData.quantity}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expectedDeliveryDate">Fecha Estimada de Entrega</label>
          <input
            id="expectedDeliveryDate"
            type="date"
            name="expectedDeliveryDate"
            onChange={handleChange}
            value={formData.expectedDeliveryDate}
          />
        </div>
        <button className="form-buttonn" type="submit">Guardar Pedido</button>
      </form>
    </div>
    </>
  );
};

export default AddSupplierOrder;
