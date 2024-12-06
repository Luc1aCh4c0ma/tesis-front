import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Log&Reg/LoginPage';
import RegisterPage from './pages/Log&Reg/RegisterPage';
import RecoverPasswordPage from './pages/RecoverPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardAdmin from './pages/Dashboard/Dashboard';
import DashboardUser from './pages/Dashboard/DashboardUser';
import AddSupplierOrder from './pages/SupplierOrder/AddSupplierOrder';  // Página para agregar pedidos
import SupplierOrderList from './pages/SupplierOrder/SupplierOrderList';  // Página de lista de pedidos
import ClienteForm from './pages/Clientes/ClienteForm';
import CargarProducto from './pages/Productos/CargarProducto';
import EditarProducto from './pages/Productos/EditarProductos';
import ListaProductos from './pages/Productos/ListaProductos';
import RealizarPedido from './pages/RealizarPedido/RealizarPedido';
import { ResumenProvider } from './context/ResumenContext';
import Carrito from './components/PedidoComponentes/Carrito/Carrito';
import ColaboraConNosotros from './components/SideBar/ColaboraConNosotros';
import Desarrolladoras from './components/SideBar/Desarrolladoras';
import QuienesSomos from './components/SideBar/QuienesSomos';
import HistorialPedidos from './pages/pedidos/pedidosHistorial';
import PedidosPendientes from './pages/pedidos/pedidosPendientes';
import DetallePedido from './pages/pedidos/pedidoDetalle';
import HelpPage from './components/SideBar/HelpPage';
import Ventas from './pages/ventas/Ventas';
import ActualizarMenu from './pages/menu/ActualizarMenu';
import GestionMozos from './components/mozos/GestionMozos';


const AppRoutes = () => {
  const handleMetodoPagoSeleccionado = (metodoPago: string) => {
    // Lógica para manejar el método de pago seleccionado
    console.log("Método de pago seleccionado:", metodoPago);
  };
  
  return (
    <ResumenProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recover" element={<RecoverPasswordPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/clients" element={<ClienteForm onMetodoPagoSeleccionado={handleMetodoPagoSeleccionado} />} />
        <Route path="/menu" element={<RealizarPedido />} />
        <Route path="/colabora" element={<ColaboraConNosotros />} />
        <Route path="/desarrolladoras" element={<Desarrolladoras />} />
        <Route path="/quienes-somos" element={<QuienesSomos/>} />



        



        <Route
          path="/dashboard-admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        


        {/* Rutas protegidas */}
        
        <Route
          path="/dashboard-user"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <DashboardUser />
            </ProtectedRoute>
          }
        />

        {/* Rutas de productos */}
        <Route
          path="/products"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user']}>
              <ListaProductos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products-create"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CargarProducto />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/products-edit/:id"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <EditarProducto />
            </ProtectedRoute>
          }
        />

        {/* Rutas de pedidos al proveedor */}
        <Route
          path="/supplier-orders"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <SupplierOrderList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier-orders-create"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AddSupplierOrder />
            </ProtectedRoute>
          }
        />

      

        <Route
          path="/update-menu"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user']}>
              <ActualizarMenu/>
            </ProtectedRoute>
          }
        />


        <Route
          path="/historial"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <HistorialPedidos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pendientes"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user']}>
              <PedidosPendientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pedidos/:pedidoId"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user']}>
              <DetallePedido />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gestion-mozos"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <GestionMozos />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>


    </Router>

    
    </ResumenProvider>
  );
};

export default AppRoutes;
