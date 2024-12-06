import React, { useEffect, useState } from 'react';
import { Producto, ProductoService } from '../../service/ProductoService';
import Navbar from '../../components/NavBar/NavBar';
import './ActualizarMenuStyles.css'; // Asegúrate de incluir estilos adecuados
import axios from 'axios';
import { Categoria, CategoriaService } from '../../service/CategoriaService'; // Importar el servicio de categorías

const ActualizarMenu: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosData = await ProductoService.obtenerProductos();
        setProductos(productosData);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const categoriasData = await CategoriaService.obtenerCategorias();
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
    };

    fetchProductos();
    fetchCategorias();
  }, []);

  // Filtrar productos por nombre y categoría
  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      filtroCategoria === '' || (producto.categoria && producto.categoria.nombre === filtroCategoria);
    return coincideNombre && coincideCategoria;
  });

  const cambiarDisponibilidad = async (productoId: number, disponible: boolean) => {
    try {
      const response = await axios.patch<Producto>(`http://localhost:3000/productos/${productoId}/disponibilidad`, {
        disponible: !disponible, // Cambiamos el valor enviado
      });

      // Actualizamos el estado local
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.id === productoId ? { ...producto, disponible: response.data.disponible } : producto
        )
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error al cambiar la disponibilidad del producto:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
      } else {
        console.error("Error inesperado:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="actualizar-menu-container">
        <h2>Actualizar Menú</h2>

        {/* Filtros */}
        <div className="productos-controls">
          <input
            type="text"
            className="productos-search"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select
            className="productos-filter"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.nombre}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Tabla de productos */}
        <table className="productos-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Disponibilidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>${producto.precio.toFixed(2)}</td>
                <td>{producto.disponible ? 'Disponible' : 'No disponible'}</td>
                <td>
                  <button
                    className="productos-toggle-btn"
                    onClick={() => cambiarDisponibilidad(producto.id, producto.disponible)}
                  >
                    {producto.disponible ? 'Deshabilitar' : 'Habilitar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ActualizarMenu;
