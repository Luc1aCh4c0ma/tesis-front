// MainComponent.tsx
import React, { useState } from 'react';
import ClienteForm from '../pages/Clientes/ClienteForm';
import Carrito from './PedidoComponentes/Carrito/Carrito';


const MainComponent: React.FC = () => {
  // Estado para almacenar el método de pago seleccionado
  const [metodoPago, setMetodoPago] = useState<string>('');

  // Estado para gestionar los pedidos confirmados o el carrito
  const [pedidoConfirmado, setPedidoConfirmado] = useState<any | null>(null);

  // Función para manejar el método de pago seleccionado en el formulario
  const manejarMetodoPago = (metodo: string) => {
    setMetodoPago(metodo);
  };

  // Función para manejar la confirmación del pedido desde el carrito
  const manejarConfirmarPedido = (pedido: { id: number; items: any; total: number }) => {
    setPedidoConfirmado(pedido);
    // Aquí podrías hacer algo más, como almacenar el pedido en una base de datos
  };

  return (
    <div>
      <h1>Bienvenido a SOSNEADO</h1>

      {/* Formulario para ingresar los datos del cliente y seleccionar el método de pago */}
      <ClienteForm onMetodoPagoSeleccionado={manejarMetodoPago} />

      {/* Carrito de compras, que también recibe el método de pago como prop */}
      <Carrito metodoPago={metodoPago} onPedidoConfirmado={manejarConfirmarPedido} />

      {/* Mostrar el pedido confirmado (si existe) */}
      {pedidoConfirmado && (
        <div>
          <h2>Pedido Confirmado</h2>
          <p>Id del pedido: {pedidoConfirmado.id}</p>
          <p>Total: ${pedidoConfirmado.total.toFixed(2)}</p>
          <p>Metodo de pago: {pedidoConfirmado.metodoPago}</p>
          {/* Aquí puedes agregar más detalles del pedido */}
        </div>
      )}
    </div>
  );
};

export default MainComponent;
