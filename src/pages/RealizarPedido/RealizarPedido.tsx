import React, { useState } from 'react';
// Importando HistoriasMozos
import '../RealizarPedido/RealizarPedido.css';
import HistoriasMozos from '../../components/PedidoComponentes/HistoriasMozos/HistoriasMozos';
import Bebidas from '../../components/PedidoComponentes/Bebidas/Bebidas';
import Comidas from '../../components/PedidoComponentes/Comidas/Comidas';
import DesayunosMeriendas from '../../components/PedidoComponentes/DesayunosMeriendas/DesayunosMeriendas';
import NavbarClient from '../../components/NavBarClient/NavBarClient';
import Carrito from '../../components/PedidoComponentes/Carrito/Carrito';


const RealizarPedido: React.FC = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [metodoPago, setMetodoPago] = useState<string>('');  // Aquí definimos el estado para el método de pago

  const handlePedidoConfirmado = (pedido: { id: number; items: any; total: number }) => {
    console.log("Pedido confirmado:", pedido);
    // Aquí podrías enviar el pedido al backend para su procesamiento
  };

  // Función para manejar la selección de una categoría
  const manejarSeleccionCategoria = (categoria: string) => {
    setCategoriaSeleccionada(categoria);
  };

  // Función para manejar la selección del método de pago
  const manejarMetodoPago = (metodo: string) => {
    setMetodoPago(metodo);
  };

  return (
    <>
      <NavbarClient />
      <div className="realizar-pedido-page">
        {/* Historias de Mozos */}
        <HistoriasMozos />

        {/* Contenido principal de realizar pedido */}
        <div className="realizar-pedido-container">
          <h2>Realizar Pedido</h2>
          <p>Seleccione la categoría de su preferencia</p>

          {/* Botones para seleccionar la categoría */}
          <div className="categoria-botones">
            <button
              className="categoria-boton"
              onClick={() => manejarSeleccionCategoria('desayuno-merienda')}
            >
              Desayunos y Meriendas
            </button>
            <button
              className="categoria-boton"
              onClick={() => manejarSeleccionCategoria('comida')}
            >
              Comida
            </button>
            <button
              className="categoria-boton"
              onClick={() => manejarSeleccionCategoria('bebidas')}
            >
              Bebidas
            </button>
          </div>
        </div>

        {/* Renderizado del contenido según la categoría seleccionada */}
        <div className="categoria-contenido">
          {categoriaSeleccionada === 'bebidas' && <Bebidas />}
          {categoriaSeleccionada === 'comida' && <Comidas />}
          {categoriaSeleccionada === 'desayuno-merienda' && <DesayunosMeriendas />}
        </div>
        
      </div>
      
      <Carrito metodoPago={metodoPago} onPedidoConfirmado={handlePedidoConfirmado} />

      
      
    </>
  );
};

export default RealizarPedido;
